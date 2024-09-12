pipeline {
    agent any
    
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
                    def imageName = 'my-react-app'
                    try{
                        bat "docker rm -f ${imageName}"
                        bat "docker rmi -f ${imageName}"
                    }   
                     catch(Exception e) {
                        echo "Exception occurred: " + e.toString()
                    }
                    bat "docker build  -t ${imageName} ."
                }
            }
        }
        stage("Run React Container") {
            steps {
                bat '''
                docker run -d --name my-react-app --network my-network -p 3002:3000 my-react-app
                '''
            }
        }
    }
}
