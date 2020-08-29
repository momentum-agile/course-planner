# Course Planner

<details><summary>  Setting up the development environment for MacOS and Linux </summary>
<p>

Prerequisities: Docker

1. Install [Docker Desktop](https://docs.docker.com/docker-for-mac/install/)
2. Start Docker desktop
3. Navigate to base repository `course-planner`
4. Open up terminal/command-line and run `docker-compose up --build`. Note that if the images have already been built then you can run `docker-compose up`
5. Wait until everything starts up
6. To test the api is running, go to [localhost:8080/heartbeat](localhost:8080/heartbeat)
7. To test the frontend is running, go to [localhost:3000](localhost:3000)

Once you are done CTRL+C and then run the command: `docker-compose down` to stop containers.

</p>
</details>

<details><summary>  Setting up the development environment for Windows </summary>
<p>

Prerequisities: Docker, Windows 10 Education or Professional, dos2unix.exe

1. Install [Docker Desktop](https://www.docker.com/products/docker-desktop)
2. Download [dos2unix.exe](https://sourceforge.net/projects/dos2unix/)
3. Drag init.sh from (course-planner/seed-db) INTO dos2unix.exe (This will automatically convert all line endings from CRLF TO LF)
4. Start Docker Desktop
5. Navigate to base repository (course-planner)
6. Open up terminal/command-line and run `docker-compose up --build`
7. Wait until everything starts up
8. To test the api is running, go to [localhost:8080/heartbeat](localhost:8080/heartbeat)
9. To test the frontend is running, go to [localhost:3000](localhost:3000)

Once you are done CTRL+C and then run the command: `docker-compose down` to stop containers.

</p>
</details>
