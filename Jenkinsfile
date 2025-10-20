// Jenkinsfile (Corrected Version)
pipeline {
    agent any

    environment {
        // Change this to your Docker Hub username
        DOCKERHUB_USERNAME = 'umed22'
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/Umed23/jenkins_image.git'
            }
        }

        stage('Build Services') {
            parallel {
                stage('Build User Service') {
                    steps {
                        // WRAP THE COMMANDS IN A 'script' BLOCK
                        script {
                            echo "Building User Service..."
                            docker.build("${DOCKERHUB_USERNAME}/user-service:latest", './user-service')
                        }
                    }
                }
                stage('Build Order Service') {
                    steps {
                        // WRAP THE COMMANDS IN A 'script' BLOCK
                        script {
                            echo "Building Order Service..."
                            docker.build("${DOCKERHUB_USERNAME}/order-service:latest", './order-service')
                        }
                    }
                }
            }
        }

        stage('Push Images to Docker Hub') {
            steps {
                // WRAP THE ENTIRE LOGIC IN A 'script' BLOCK
                script {
                    echo "Logging in and pushing images..."
                    docker.withRegistry('https://registry.hub.docker.com', 'dockerhub-credentials') {
                        docker.image("${DOCKERHUB_USERNAME}/user-service:latest").push()
                        docker.image("${DOCKERHUB_USERNAME}/order-service:latest").push()
                    }
                }
            }
        }

  stage('Deploy Services') {
            steps {
                script {
                    echo "Attempting to clean up old containers..."
                    // Use a try-catch block to handle errors gracefully
                    try {
                        bat "docker stop user-service order-service"
                        bat "docker rm user-service order-service"
                    } catch (e) {
                        // This block will run if the stop/rm commands fail
                        echo "Containers did not exist. This is normal on the first run."
                    }

                    echo "Deploying new containers..."
                    bat "docker run -d --name user-service -p 8080:3000 umed22/user-service:latest"
                    bat "docker run -d --name order-service -p 8081:3001 umed22/order-service:latest"
                }
            }
        }
    }
}
