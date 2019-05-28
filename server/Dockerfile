FROM node:9

# Create app directory
RUN mkdir -p /var/www/lerna-be
WORKDIR /var/www/lerna-be

# Bundle app source
ADD . /var/www/lerna-be

# Install dependencies
RUN npm install --quiet

EXPOSE 3000

RUN chmod +x ./docker/start.sh
CMD ./docker/start.sh;