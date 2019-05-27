#!/bin/bash
cd ~/lerna-project && git reset --hard origin/master && docker-compose build && docker-compose up -d