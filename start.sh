#!/bin/bash

# This scripts assumes that you have: tmux installed and a mongodb container called 'mongodb'

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

session=flowviz

# Starting mongdb container
echo Starting mongodb...
docker start mongodb

# Creating session
echo Creating session...
tmux new -d -s $session

# Starting server
tmux send-keys -t $session "npm run server" ENTER

# Spliting terminal window, creating a new pane for client
tmux split-window -h

# Starting client
tmux send-keys -t $session "npm run client" ENTER

# Attaching session
echo Attaching session...
tmux a -t $session
