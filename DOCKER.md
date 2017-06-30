# Using docker and docker-compose for local development

First, make sure you have the State-TalentMAP-API repository cloned within the
same parent directory as this repository.

Then build the containers with:

```sh
docker-compose build
```

You'll likely need to run migrations and load data for the `api`, so follow the
instructions in the State-TalentMAP-API README, but prefix all the commands with
`docker-compse run api <THE COMMAND>`.

Once that's done, you can spin up your local docker-compose environment with:

```sh
docker-compose up
```

This project's web server will be accessible at `http://localhost:3000`
and the API server will be at `http://localhost:8000`.

You will need to `docker-compose build` whenever `package.json` changes since the
dependencies are installed in the docker image (see `Dockerfile`).

Note that in `docker-compose.yml`, `web` is the name of the service for this application,
`api` is the name for the State-TalentMAP-API application, and `db` is the name of the Postgres database service.
You can run any command within those service containers using `docker-compose run <SERVICE NAME> <COMMAND>`.

For example:

- `docker-compose run web yarn test` will run the test suite for this project.
- `docker-compose run api bash` will get you a shell in the `api` container.
