# FLOWViZ

FLOWViZ is an integration framework that allows you to seamlessly
integrate other phylogenetic tools and frameworks,
while providing workflow scheduling and execution,
through the Apache Airflow workflow system.

It is composed by two components: an **HTTP Express server**
and a **React client**,
both written in JavaScript.

**It is still a work under development!**
If you find a bug, please report [here](https://github.com/mig07/FLOWViZ/issues)

With this framework, you can integrate your own phylogenetic tools, by filling a
contract where you specify the tool's access, rules and guidelines.

The integrated tools can then be used to build your own customized workflows.

![flowviz-whiteboard](./docs/pictures/flowviz-whiteboard.png)

You can also customize each task inside the workflow.

![flowviz-task-setup](./docs/pictures/individualTaskSetup.png)

# Setup requirements

- Docker
- Node.JS
- Tmux (optional)

Before going into the project's setup, follow this [guide](requirements.md), in order to fulfill all setup's
requirements.

# Manual setup

1. npm install server and client dependencies:

   ```bash
   npm install
   cd client
   npm install
   ```

2. Execute `setupAirflow.sh`. Make sure Airflow has all its services running, including the Web server (access it first,
   before going to step 2);

3. Execute `docker compose up -d`. This will start the server, client and MongoDB containers;

4. Go inside the **Apache Airflow web client** in [http://localhost:8080](http://localhost:8080) (The default
   credentials
   are username: `airflow` and password: `airflow`).

   Using the **NavBar** go to **Admin** and then **Connections**.
   Click **add a new record** (plus icon) and fill the displayed fields with the following information:

    ```
    Connection Id: mongodb_flowviz
    Connection Type: mongo
    Host: 172.17.0.1
    Port: 27017
    ```

   **Save the connection.**

5. Go inside the `airflow` folder (e.g. `cd airflow`).

   Inside, you should have a `dags` folder and an `include` folder.

    * Copy the dag_generator.py script into the `dags` folder.
       ```bash
       sudo cp dag_generator.py dags/
       ```
    * Copy the dag_template.py script into the `include` folder.
      ```bash
      sudo cp dag_template.py include/
      ```

   *Applying the copy with `sudo` might be necessary, depending on the permissions of the `dags` and `include` folders.*
   <br><br>

6. Inside Airflow's dashboard (http://localhost:8080/home), ensure the `dag_generator` DAG is toggled (switch on the
   left of the DAG's name).

7. **Register a new** flowviz account at http://localhost:4000/flowviz with username `admin` and password `admin`

If everything went well, no errors should be displayed by the client (aka it must not appear that `mongodb_flowviz`
connection, used by the dag_generator DAG, is not recognized).

# Contacts

Source code repository - [https://github.com/mig07/FLOWViZ](https://github.com/mig07/FLOWViZ)

- Miguel Luís - A43504@alunos.isel.pt
- Cátia Vaz - cvaz@cc.isel.ipl.pt

# Acknowledgements

This project was developed under the context of a [Lisbon School of Engineering (ISEL)](https://www.isel.pt/) Master's
degree final project, which was also funded by student grants, as follows:

- NGPHYLO PTDC/CCI-BIO/29676/2017, an [INESC-ID](https://www.inesc-id.pt/) project, funded
  by [Science and Technology Foundation (FCT)](https://www.fct.pt/);
- IPL/ISEL/DIVA_ISEL, funded by [Polytechnic Institute of Lisbon (IPL)](https://www.ipl.pt/).

The following articles were also submitted under the context of this project:

- [https://inforum.org.pt/sites/default/files/2022-09/Actas_INForum.pdf#page=224](https://inforum.org.pt/sites/default/files/2022-09/Actas_INForum.pdf#page=224),
  single-column format, submitted and publicly presented at the [INForum 2022 conference](https://inforum.org.pt/),
  which took place at the [Polytechnic Institute of Guarda (IPG)](http://politecnicoguarda.pt/);
- [https://arxiv.org/abs/2211.15282](https://arxiv.org/abs/2211.15282), two-column format.
