FROM node:14 as builder

WORKDIR /usr/src

COPY .npmrc .
COPY pnpm-lock.yaml .
COPY package.json .
COPY prisma prisma

RUN ls -al
RUN npm i -g pnpm
RUN pnpm i --prod

COPY postcss.config.cjs .
COPY tailwind.config.cjs .
COPY svelte.config.js .
COPY tsconfig.json .
COPY src src
COPY static static

RUN pnpm run build

FROM gcr.io/distroless/nodejs:14
WORKDIR /usr/src
COPY --from=builder /usr/src/build build
COPY --from=builder /usr/src/node_modules node_modules
COPY --from=builder /usr/src/package.json .

ENTRYPOINT ["node", "build"]
