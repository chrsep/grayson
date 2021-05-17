#!/usr/bin/bash

npm run prisma:migrate-prod
node build
