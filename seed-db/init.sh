#!/bin/sh

mongoimport --collection courses --drop --file fakeCourses.json --jsonArray --uri "mongodb://mongo:27017"
mongoimport --collection programmedegrees --drop --file fakeProgrammeDegrees.json --jsonArray --uri "mongodb://mongo:27017"
