pipeline {
    agent any 
    stages {
        stage('Clone the repo') {
            steps {
                echo 'cloning the repo'
                sh 'rm -fr iMessengerBE'
                sh 'git clone https://github.com/Seyi23nova/iMessengerBE.git'
            }
        }
        stage('Move into repo') {
            steps {
                echo 'moving to iMessengerBE directory'
                sh 'cd iMessengerBE'
            }
        }
        stage('Done') {
            steps {
                echo 'Done'
            }
        }
    }
}
