@Library('shared-library') _

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
        stage('Set Branch Config') {
            steps {
                script {
                    branchConfig()
                }
            }
        }
        stage('Backend Build And Deploy Image') {
            when {
                expression { !params.SKIP_DOCKER_BUILD }
            }
            steps {
                script {
                    buildAndDeployImage('backend', env.backendImageName, './backend')
                }
            }
        }
        stage('Frontend Build And Deploy Image') {
            when {
                expression { !params.SKIP_DOCKER_BUILD }
            }
            steps {
                script {
                    buildAndDeployImage('frontend', env.frontendImageName, './frontend')
                }
            }
        }
        stage('Deploy to Kubernetes') {
            steps {
                echo 'Deploying to Kubernetes...'
                sh 'kubectl apply -f k8s/'
            }
        }
    }
}