/* groovylint-disable CatchException, CompileStatic, DuplicateStringLiteral, VariableTypeRequired */
pipeline {
    environment {
        backendImageName = '1md3nd/todo-backend-test'
        frontendImageName = '1md3nd/todo-frontend-test'
        backendImage = ''
        frontendImage = ''
    }

    agent any

    stages {
        stage('Backend Build Image') {
            steps {
                script {
                    try {
                        backendImage = docker.build("${backendImageName}:${env.BUILD_ID}", './backend')
                        backendImage.inside {
                            sh 'node --version'
                        }
                    } catch (Exception e) {
                        currentBuild.result = 'FAILURE'
                        echo "Failed to build : ${e.message}"
                    } finally {
                        echo 'done building backend image'
                    }
                }
            }
        }
        stage('Backend Deploy Image') {
            steps {
                script {
                    docker.withRegistry('https://registry.hub.docker.com/', 'dockerhub') {
                        backendImage.push()
                    }
                }
            }
        }
        stage('Frontend Build Image') {
            steps {
                script {
                    try {
                        frontendImage = docker.build("${frontendImageName}:${env.BUILD_ID}", './frontend')
                        frontendImage.inside {
                            sh 'node --version'
                        }
                    } catch (Exception e) {
                        currentBuild.result = 'FAILURE'
                        echo "Failed to build : ${e.message}"
                    } finally {
                        echo 'done building frontend image'
                    }
                }
            }
        }
        stage('Frontend Deploy Image') {
            steps {
                script {
                    docker.withRegistry('https://registry.hub.docker.com/', 'dockerhub') {
                        frontendImage.push()
                    }
                }
            }
        }
    }
}
