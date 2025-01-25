pipeline {
    agent any
    environment {
        DATABASE_URL = credentials('PRODUCTION_DB_URL') // Secure credentials
    }
    stages {
        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }
        stage('Run Migrations') {
            steps {
                sh 'npx knex migrate:latest --knexfile knexfile.js'
            }
        }
        stage('Run Seeds') {
            steps {
                sh 'npx knex seed:run --knexfile knexfile.js'
            }
        }
        stage('Deploy Application') {
            steps {
                sh 'npm start'
            }
        }
    }
}
