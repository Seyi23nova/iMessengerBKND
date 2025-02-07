pipeline {
    agent any

    stages {
        stage('Checkout Code') {
            steps {
                echo 'cloning the repo'
                sh 'rm -fr iMessengerBE'
                sh 'git clone https://github.com/Seyi23nova/iMessengerBE.git'
                echo 'repo successfully cloned'
            }
        }

        stage('Install Code Dependencies') {
            steps {
                sh 'cd iMessengerBE'
                sh 'npm install'
                echo 'installed node modules'
            }
        }

        stage('Done') {
            steps {
                echo 'pipeline ended'
            }
        }
    }
}
