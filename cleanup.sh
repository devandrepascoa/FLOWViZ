#!/bin/bash

# Check if Docker is running, if not exit the script
checkDocker() {
    if ! docker info >/dev/null 2>&1; then
        echo "Error: Docker is not running. Please start Docker first."
        exit 1
    fi
    echo "Docker is running!"
}

echo "Checking Docker..."
checkDocker

# Stops and removes Airflow containers and cleans up volumes
cleanupAirflow() {
    cd airflow/ && docker compose down -v
    rm -f .env
    cd ..
}

echo "Cleaning up Airflow..."
cleanupAirflow

echo "Cleaning up Flowviz..."
docker compose down

echo "Cleanup completed!"