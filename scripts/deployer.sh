#!/bin/bash
cd ~/lerna-project && git pull && docker-compose -f docker-compose.prod.yml up --build -d