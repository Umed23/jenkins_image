// Jenkinsfile
pipeline {
    agent any // Run on any available Jenkins agent

    environment {
        // IMPORTANT: Change this to your Docker Hub username!
        DOCKERHUB_USERNAME = 'umed22'
    }

    stages {
        stage('Build Services') {
            parallel { // Build both services at the same time
                stage('Build User Service') {
                    steps {
                        echo "Building User Service..."
                        docker.build("${umed22}/user-service:latest", './user-service')
                    }
                }
                stage('Build Order Service') {
                    steps {
                        echo "Building Order Service..."
                        docker.build("${umed22}/order-service:latest", './order-service')
                    }
                }
            }
        }

        stage('Push Images to Docker Hub') {
            steps {
                echo "Logging in and pushing images..."
                // Use the credentials you stored in Jenkins
                docker.withRegistry('https://registry.hub.docker.com', 'dockerhub-credentials') {
                    docker.image("${umed22}/user-service:latest").push()
                    docker.image("${umed22}/order-service:latest").push()
                }
            }
        }

        stage('Deploy Services') {
            steps {
                script {
                    echo "Stopping and removing old containers..."
                    // '|| true' prevents the pipeline from failing if the containers don't exist yet
                    sh "docker stop user-service order-service || true"
                    sh "docker rm user-service order-service || true"

                    echo "Deploying new containers..."
                    sh "docker run -d --name user-service -p 8080:3000 ${umed22}/user-service:latest"
                    sh "docker run -d --name order-service -p 8081:3001 ${umed22}/order-service:latest"
                }
            }
        }
    }
}
