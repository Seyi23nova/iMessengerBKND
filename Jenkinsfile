pipeline {
    agent any 
    stages {
        stage('Clone the repo') {
            steps {
                echo 'cloning the repo'
                sh 'rm -fr iMessengerBKND'
                sh 'git clone https://github.com/Seyi23nova/iMessengerBKND.git'
            }
        }
        stage('Move into repo') {
            steps {
                echo 'moving to iMessengerBKND directory'
                sh 'cd iMessengerBKND'
            }
        }
        stage('Done') {
            steps {
                echo 'Done'
            }
        }
    }
}
