
# Downloads MongoDB's image and creates the container exposing the 27017 port.
downloadAndCreateMongoContainer() {
    docker pull mongo
    docker run --name mongodb -d -p 27017:27017 mongo
}

# Creates a Docker network and adds the Airflow and MongoDB containers.
setupDockerNetwork() {
    docker network create flowviz-docker-network

    docker network connect flowviz-docker-network mongodb && \
    for airflowContainer in $(docker ps --format {{.Names}} | grep "airflow-"); \
    do \
        docker network connect flowviz-docker-network $airflowContainer; \
    done

    docker inspect -f '{{with index .NetworkSettings.Networks "flowviz-network-docker"}}{{.IPAddress}}{{end}}' mongodb
}

setupFlowviz() {
    npm run setup

    # Copying a default .env files, if user-defined .env files do not exist in server and client folders.
    if [ ! -f ./.env ]; then
        cp .defaults/server/.env .
    fi

    if [ ! -f ./client/.env ]; then
        cp .defaults/client/.env client/
    fi
}

downloadAndCreateMongoContainer
setupDockerNetwork
setupFlowviz
