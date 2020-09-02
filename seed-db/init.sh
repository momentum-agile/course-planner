#!/bin/sh

mongoimport --collection courses --drop --file fakeCourses.json --jsonArray --uri "mongodb://mongo:27017"
mongoimport --collection regulations --drop --file fakeRegulations.json --jsonArray --uri "mongodb://mongo:27017"


