pipeline {
    agent any
    environment {
        KUBECONFIG = "C:/Users/e039325/.kube/config" 
        DOCKER_REGISTRY = "docker.io" 
        IMAGE_NAME = "mrudulaa94/billing_system_frontend"
    }
    stages {
        stage('Clone') {
            steps {
                checkout([
                    $class: 'GitSCM',
                    branches: [[name: '*/FrontendUpdated']],
                    userRemoteConfigs: [[url: 'https://github.com/NandanVasistaBH/telecom-billing-system-front-end']]
                ])
            }
        }
        stage('Pull Docker Image') {
            steps {
                bat "docker pull alpine"
            }
        }
        stage('Install Dependencies') {
            steps {
                bat '''
                node -v
                npm -v
                dir
                dir node_modules/.bin
                npm install
                '''
            }
        }
        stage('Build Docker Image') {
            steps {
                script {
                    try{
                        bat "docker rm -f ${IMAGE_NAME}"
                        bat "docker rmi -f ${IMAGE_NAME}"
                    }   
                     catch(Exception e) {
                        echo "Exception occurred: " + e.toString()
                    }
                    bat "docker build  -t ${IMAGE_NAME} ."
                }
            }
        }
        stage('Push Docker Image') {
            steps {
                script {
                    bat "docker login -u mrudulaa94 -p Tela@39628"
                    bat "docker push  ${IMAGE_NAME}"                    
                }
            }
        }
        stage('Deploy') {
            steps {
                script {
                    bat '''
                    kubectl config use-context docker-desktop
                    kubectl apply -f react-app-deployment.yaml
                    kubectl apply -f hpa-react.yaml
                    '''
                }
            }
        }
        stage('Verify') {
            steps {
                script {
                    // Verify deployments, services, and HPA
                    bat '''
                    kubectl get pv
                    kubectl get pvc
                    kubectl get deployments
                    kubectl get services
                    kubectl get hpa
                    '''
                }
            }
        }
    }
}
