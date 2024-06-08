pipeline {
    agent {
        dockerfile true
    }
    stages {
        stage('Test') {
            node {
            checkout scm
            def backendImage = docker.build("backend-test:${env.BUILD_ID}","./backend")
            backendImage.inside{
                sh "node --version"
            }
            }
        }
    }
    
    
}