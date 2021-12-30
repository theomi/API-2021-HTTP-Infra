#!/bin/bash

docker-compose up -d --scale web=4 --scale express=4 --scale whoami=4
