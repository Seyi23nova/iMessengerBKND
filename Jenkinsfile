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
                        'rm -rf iMessengerBKND'
                    """
                }
            }
        }
    }
}
