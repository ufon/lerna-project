FROM node:9

RUN npm i -g typescript ts-node nodemon

WORKDIR /var/www/lerna-be
ADD . /var/www/lerna-be
COPY /env/.env.production /var/www/lerna-be/.env
RUN rm -rf node_modules && npm install

EXPOSE 3000

CMD ["docker/start.sh"]