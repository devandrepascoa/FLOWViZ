#!/bin/bash

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