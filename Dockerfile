FROM node:14 as builder
RUN npm i -g pnpm

WORKDIR /usr/src

# Install dependencies
COPY .npmrc .
COPY pnpm-lock.yaml .
COPY package.json .
RUN pnpm i --prod

# Copy config files
COPY postcss.config.cjs .
COPY tailwind.config.cjs .
COPY svelte.config.js .
COPY tsconfig.json .

# Build prisma
COPY prisma prisma
RUN pnpm run prisma:generate

# Build sveltekit
COPY src src
COPY static static
RUN pnpm run build

FROM gcr.io/distroless/nodejs:14
WORKDIR /usr/src
COPY --from=builder /usr/src/build build
COPY --from=builder /usr/src/node_modules node_modules
COPY --from=builder /usr/src/package.json .

ENTRYPOINT ["node", "build"]
