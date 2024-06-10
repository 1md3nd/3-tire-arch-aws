/* groovylint-disable VariableTypeRequired */
pipeline {
    environment {
        backendImageName = "1md3nd/todo-backend-test"
        backendImage = ""
    }

    agent any

    stages {
        stage('Backend Build Image') {
            steps {
                script {
                    try{
                        backendImage = docker.build("${backendImageName}:${env.BUILD_ID}",'./backend')
                        backendImage.inside{
                            sh 'node --version'
                        }
                    } catch (Exception e) {
                        currentBuild.result = 'FAILURE'
                        echo "Failed to build : ${e.message}"
                    } finally {
                        echo "done building backend image"
                        }
                    }
                }
            }
        stage('Backend Deploy Image') {
            steps {
                script {
                    docker.withRegistry('https://hub.docker.com/','dockerhub'){
                        backendImage.push()
                    }
                }
            }
        }

    }
}