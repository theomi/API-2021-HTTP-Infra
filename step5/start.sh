#!/bin/bash

docker run -d --rm --name rproxy -p 8080:80 api/rproxy
