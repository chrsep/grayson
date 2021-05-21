FROM node:16 as builder

WORKDIR /usr/src

# Install dependencies
COPY yarn.lock .
COPY package.json .
RUN yarn

# Copy config files
COPY postcss.config.cjs .
COPY tailwind.config.cjs .
COPY tsconfig.json .

# Build prisma
COPY prisma prisma
RUN yarn run prisma:generate

# Build next
COPY . .
RUN yarn run build

FROM node:16
WORKDIR /usr/src

COPY --from=builder /usr/src/build build
COPY --from=builder /usr/src/node_modules node_modules
COPY --from=builder /usr/src/package.json .
COPY --from=builder /usr/src/prisma prisma

ENTRYPOINT ["npm", "run", "start"]
