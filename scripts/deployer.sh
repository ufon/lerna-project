#!/bin/bash
cd ~/lerna-project && git reset --hard HEAD && git pull && docker-compose up --build -d
