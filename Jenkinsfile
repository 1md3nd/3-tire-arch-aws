/* groovylint-disable CatchException, CompileStatic, DuplicateStringLiteral, VariableTypeRequired */
pipeline {
    environment {
        backendImageName = ''
        frontendImageName = ''
    }

    agent any

    stages {
        stage('Check main branch') {
            when {
                branch 'main'
            }
            steps {
                script {
                    backendImageName = '1md3nd/todo-backend-prod'
                    frontendImageName = '1md3nd/todo-frontend-prod'
                }
            }
        }
        stage('Check dev branch') {
            when {
                branch 'dev-*'
            }
            steps {
                script {
                    backendImageName = '1md3nd/todo-backend-dev'
                    frontendImageName = '1md3nd/todo-frontend-dev'
                }
            }
        }

        stage('Backend Build And Deploy Image') {
            steps {
                script {
                    buildAndDeployImage('backend', backendImageName, 'backend')
                }
            }
        }
        stage('Frontend Build And Deploy Image') {
            steps {
                script {
                    buildAndDeployImage('frontend', backendImageName, 'frontend')
                }
            }
        }
    }
}

def buildAndDeployImage(imageType, imageName, path){
    image = ''

    try {
        image = docker.build("${imageName}:${env.BUILD_ID}", "./${path}")
        image.inside { sh 'node --version' }
    } catch (Exception e) {
        currentBuild.result = 'FAILURE'
        echo "Failed to build ${imageType} image: ${e.message}"
    } finally {
        echo "Done building ${imageType} image"
    }

    try {
        docker.withRegistry('', 'dockerhub') {
            frontendImage.push()
            frontendImage.push('latest')
        }
    } catch (Exception e) {
        currentBuild.result = 'FAILURE'
        echo "Failed to deploy ${imageType} image: ${e.message}"
    } finally {
        echo "Done deploying ${imageType} image"
    }
}
