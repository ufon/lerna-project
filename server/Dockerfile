FROM node:9

RUN npm i -g typescript ts-node nodemon

WORKDIR /var/www/lerna-be
ADD . /var/www/lerna-be

# TODO: create conditional COPY
COPY ormconfig.prod.json ormconfig.json
RUN rm -rf node_modules && npm install

EXPOSE 3000

RUN if [ "$NODE_ENV" = "development" ]; \
    then npm run start:dev;  \
    else npm run start; \
    fi