#!/bin/bash

# Check if Docker is running, if not exit the script
checkDocker() {
    if ! docker info >/dev/null 2>&1; then
        echo "Error: Docker is not running. Please start Docker first."
        exit 1
    fi
    echo "Docker is running!"
}

# Create Airflow user and compose services.
setupAirflow() {
    cd airflow/ && printf "AIRFLOW_UID=\"%s\"\n" "$(id -u)" > .env && docker compose up -d
}

echo "Checking Docker..."
checkDocker

echo "Setting up Airflow..."
setupAirflow

echo "Airflow setup completed!"