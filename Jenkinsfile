/* groovylint-disable VariableTypeRequired */
pipeline {
    environment {
        backendImageName = "1md3nd/todo-backend-test"
        backendImage = ""
    }

    agent any

    stages {
        stage('Backend Test') {
            script {
                try{
                    def backendImage = docker.build("${backendImageName}:${env.BUILD_ID}",'./backend')
                    backendImage.inside{
                        sh 'node --version'
                    }
                } catch (Exception e) {
                    currentBuild.result = 'FAILURE'
                    echo "Failed to build : ${e.message}"
                } finally {
                    if (backendImage) {
                        echo "done building backend image"
                        backendImage.remove()
                    }
                }
            }
        }
    }
}