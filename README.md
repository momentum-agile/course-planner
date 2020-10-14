# Course Planner
Course Planner is a project created by students at the University of Auckland for the `SOFTENG761` course. The function of this application is to allow a user to create a customized degree 'plan' for students. This plan shows which courses the student would take per semester for their entire degree.

#  Setting up the development environment

### MacOS and Linux
> Prerequisities: `Docker`

1. Install [Docker Desktop](https://docs.docker.com/docker-for-mac/install/)
2. Start Docker desktop
3. Navigate to base repository `course-planner`
4. Open up terminal/command-line and run `docker-compose up --build`. Note that if the images have already been built then you can run `docker-compose up`
5. Wait until everything starts up
6. To test the api is running, go to [localhost:8080/heartbeat](http://localhost:8080/heartbeat)
7. To test the frontend is running, go to [localhost:3000](http://localhost:3000)

### Windows
> Prerequisities: `Docker`, `Windows 10 Education or Professional`, `dos2unix.exe`

1. Install [Docker Desktop](https://www.docker.com/products/docker-desktop)
2. Download [dos2unix.exe](https://sourceforge.net/projects/dos2unix/)
3. Drag init.sh from (course-planner/seed-db) INTO dos2unix.exe (This will automatically convert all line endings from CRLF TO LF)
4. Start Docker Desktop
5. Navigate to base repository (course-planner)
6. Open up terminal/command-line and run `docker-compose up --build`
7. Wait until everything starts up
8. To test the api is running, go to [localhost:8080/heartbeat](http://localhost:8080/heartbeat)
9. To test the frontend is running, go to [localhost:3000](http://localhost:3000)

###  Stopping the development environment
If you are done running the application, run `ctrl + c` and then run the command: `docker-compose down` to stop containers.


#  Running the application as the product owner

1. `chmod +x start.sh`
2. `chmod +x stop.sh`
3. To run the application: `./start.sh`
4. To stop the application: `ctrl+c` and then `./stop.sh`
5. Note that a folder `course-planner-database` folder is made. If this folder is accidentally deleted then all your data will be lost :(

---

## Viewing the Application
Once you have run the client/frontend, go to [localhost:3000](http://localhost:3000) in a browser of your choice.

## Viewing the API Documentation
Once you have run the API/backend, go to [localhost:8080/swagger](http://localhost:8080/swagger)
