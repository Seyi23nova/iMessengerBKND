pipeline {
    agent any

    tools {
        nodejs "NodeJS 23"
    }

    stages {
        stage('Checkout Code') {
            steps {
                git 'https://github.com/Seyi23nova/iMessengerBE.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Run Tests') {
            steps {
                sh 'npm test'
            }
        }
    }
}