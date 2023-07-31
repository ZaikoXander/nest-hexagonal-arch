FROM node:18.17.0-slim

RUN apt-get update -y && apt-get install -y openssl

USER node

WORKDIR /home/node/app

CMD [ "tail", "-f", "/dev/null" ]