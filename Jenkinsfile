pipeline {
    agent any

    parameters {
        booleanParam(name: 'SKIP_DOCKER_BUILD', defaultValue: false, description: 'Skip Docker build steps')
    }

    environment {
        backendImageName = ''
        frontendImageName = ''
    }

    stages {
        stage('Determine Image Names') {
            steps {
                script {
                    if (env.BRANCH_NAME == 'main') {
                        env.backendImageName = '1md3nd/todo-backend-prod'
                        env.frontendImageName = '1md3nd/todo-frontend-prod'
                    } else if (env.BRANCH_NAME.startsWith('dev-')) {
                        env.backendImageName = '1md3nd/todo-backend-dev'
                        env.frontendImageName = '1md3nd/todo-frontend-dev'
                    }
                }
            }
        }

        stage('Build And Deploy Images') {
            when {
                expression { !params.SKIP_DOCKER_BUILD }
            }
            steps {
                script {
                    buildAndDeployImage('backend', env.backendImageName, './backend')
                    buildAndDeployImage('frontend', env.frontendImageName, './frontend')
                }
            }
        }

        stage('Deploy on Kubernetes') {
            steps {
                withKubeConfig([credentialsId: 'k8s']) {
                    script {
                        if (!fileExists('~/.local/bin/kubectl')) {
                            sh '''
                                curl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl"
                                chmod +x kubectl
                                mkdir -p ~/.local/bin
                                mv ./kubectl ~/.local/bin/kubectl
                            '''
                        }

                        sh "~/.local/bin/kubectl apply -f k8s"
                    }
                }
            }
        }
    }
}

def buildAndDeployImage(imageType, imageName, path) {
    def image = ''
    try {
        image = docker.build("${imageName}:${env.BUILD_ID}", "${path}")
    } catch (Exception e) {
        currentBuild.result = 'FAILURE'
        error "Failed to build ${imageType} image: ${e.message}"
    } finally {
        echo "Done building ${imageType} image"
    }

    try {
        docker.withRegistry('', 'dockerhub') {
            image.push()
            image.push('latest')
        }
    } catch (Exception e) {
        currentBuild.result = 'FAILURE'
        error "Failed to deploy ${imageType} image: ${e.message}"
    } finally {
        echo "Done deploying ${imageType} image"
    }
}
