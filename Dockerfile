#build on CI not on docker to speed up deployment.
#FROM node:16-alpine as builder
#
#WORKDIR /usr/src
#
#COPY .npmrc .
#COPY pnpm-lock.yaml .
#COPY package.json .
#COPY prisma prisma
#
#RUN ls -al
#RUN npm i -g pnpm
#RUN pnpm i
#
#COPY postcss.config.cjs .
#COPY tailwind.config.cjs .
#COPY svelte.config.js .
#COPY tsconfig.json .
#COPY src src
#COPY static static
#
#RUN yarn build
#
#FROM node:16-alpine
#WORKDIR /usr/src
#COPY --from=builder /usr/src/build build
#COPY --from=builder /usr/src/node_modules node_modules
#COPY --from=builder /usr/src/package.json .
#
#ENTRYPOINT ["node", "build"]

FROM node:16-alpine

WORKDIR /usr/src

COPY build build
COPY node_modules node_modules
COPY package.json .

ENTRYPOINT ["node", "build"]
