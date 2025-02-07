pipeline {
    agent any 
    stages {
        stage('Clone the repo') {
            steps {
                echo 'clone the repo'
                sh 'rm -fr webapp1'
                sh 'git clone https://github.com/Seyi23nova/webapp1.git'
            }
        }
        stage('Done') {
            steps {
                echo 'Pipeline completed'
            }
        } 
    }
}
