#!/bin/sh

mongoimport --collection courses --drop --file fake-courses.json --jsonArray --uri "mongodb://mongo:27017"


