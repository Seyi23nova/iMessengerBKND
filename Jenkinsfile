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
                        'cd iMessengerBKND && git pull && npm install -y && nohup node index.js > output.log 2>&1 &'
                    """
                }
            }
        }
    }
}
