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
        stage('Build React App') {
            steps {
                script {
                    def binPath = "${env.WORKSPACE}/node_modules/.bin"
                    bat "set PATH=%PATH%;${binPath}"
                    bat 'npm run build'
                }
            }
        }
        stage('Build Docker Image') {
            steps {
                script {
                    def imageName = 'my-react-app'
                    bat "docker build -t ${imageName} ."
                }
            }
        }
    }
}
