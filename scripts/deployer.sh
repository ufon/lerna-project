#!/bin/bash
cd ~/lerna-project && git pull && docker-compose build && docker-compose up -d