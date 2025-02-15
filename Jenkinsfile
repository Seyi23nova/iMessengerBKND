pipeline {
    agent any
    environment {
        BACKEND_VM = '52.146.20.251'
        SSH_USER   = 'barnabas'
    }
    stages {
        stage('Deploy Backend') {
            steps {
                sshagent (credentials: ['backend']) {
                    sh """
                        ssh -o StrictHostKeyChecking=no ${SSH_USER}@${BACKEND_VM} \\
                        'pkill -f "node index.js" || true && git clone https://github.com/Seyi23nova/iMessengerBKND && cd iMessengerBKND && npm install && nohup node index.js > output.log 2>&1 &'
                    """
                }
            }
        }
    }
}
