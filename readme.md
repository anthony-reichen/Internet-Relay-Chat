# Init the Dashboard Project

## Note: the following commands must be executed at the root of the application

<br />

### Docket init

When using docker for the first time, execute the following command:

```
docker compose up --build
```

If the build has already been done before, execute this command:

```
docker compose up
```

<br />

### Stop docker's containers

In the terminal where docker is running, simply use this :

```
CTRL + C
```

If you want to remove the containers run this command:

```
docker compose down
```

Note: you will have to use the rebuild the container using the very first command of this readme.

<br />

### Using the application

Just go to http://localhost:3000 to start using the application once the docker containers are running.

### Extra chat command

To rename a channel, use the following command: 

/rename old_name new_name

