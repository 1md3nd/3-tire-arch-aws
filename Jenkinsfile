pipeline {
    agent {
        dockerfile true
    }
    stages {
        stage('Test') {
            steps {
                def backendImage = docker.build("backend-test:${env.BUILD_ID}","./backend")
                backendImage.inside{
                    sh "node --version"
                }
            }
        }
    }
    
    
}