# Creates Airflow user and composes services.
setupAirflow() {
    cd airflow/ && printf "AIRFLOW_UID=\"%s\"\n" "$(id -u)" > .env && docker compose up
}

setupAirflow
