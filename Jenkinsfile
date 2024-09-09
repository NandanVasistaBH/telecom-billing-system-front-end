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
                npm cache clean --force
                rmdir /s /q node_modules
                npm install
                npm run build
                '''
            }
        }
        stage('Build React App') {
            steps {
                bat 'npm run build'
            }
        }
    }
}
