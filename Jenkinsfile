pipeline {
    agent any
    environment {
        BACKEND_VM = '52.146.20.251'
        FRONTEND_VM = '52.224.243.124'
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

        stage('Deploy Frontend') {
            steps {
                sshagent (credentials: ['frontend']) {
                    sh """
                        ssh -o StrictHostKeyChecking=no ${SSH_USER}@${FRONTEND_VM} \\
                        'cd /var/www/html && git config --global --add safe.directory /var/www/html && sudo chown -R barnabas:barnabas /var/www/html && sudo chmod -R 775 /var/www/html && sudo git reset --hard HEAD && sudo git clean -fd && sudo git pull && sudo systemctl restart apache2'
                    """
                }
            }
        }
    }
}
