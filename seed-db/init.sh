#!/bin/sh

mongoimport --collection courses --drop --file courses.json --jsonArray --uri "mongodb://mongo:27017"
mongoimport --collection programmedegrees --drop --file fakeProgrammeDegrees.json --jsonArray --uri "mongodb://mongo:27017"
mongoimport --collection students --drop --file fakeStudents.json --jsonArray --uri "mongodb://mongo:27017"
mongoimport --collection plans --drop --file fakePlans.json --jsonArray --uri "mongodb://mongo:27017"
