FROM node:16-alpine

WORKDIR /usr/src

COPY .yarn .yarn
COPY .npmrc .
COPY .yarnrc.yml .
COPY yarn.lock .
COPY package.json .
COPY prisma prisma

RUN ls -al
RUN yarn

COPY svelte.config.js .
COPY tsconfig.json .
COPY src src
COPY static static

RUN yarn build

ENTRYPOINT ["node", "build"]
