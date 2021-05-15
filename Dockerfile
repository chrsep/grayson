FROM node:16-alpine

WORKDIR /usr/src

COPY build build
COPY node_modules node_modules
COPY package.json .

ENTRYPOINT ["node", "build"]
