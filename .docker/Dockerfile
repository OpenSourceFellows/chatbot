FROM node:20-alpine AS chatbot

# This will install pnpm (https://nodejs.org/api/corepack.html)
RUN corepack enable
RUN corepack use pnpm@*

ARG WORKDIR=/chatbot_server
WORKDIR ${WORKDIR}
ADD scripts/ ${WORKDIR}/scripts/

# Adding package.json first will cache our dependencies so
# that they do not have to be re-installed when the image rebuilds
ADD package.json   ${WORKDIR}
ADD pnpm-lock.yaml ${WORKDIR}

# Install dependencies (with fallback)
RUN pnpm install

COPY . .

RUN chmod +x ./scripts/*.sh || true
# Set up git
RUN apk add git
ADD git-config.txt ${WORKDIR}

EXPOSE 7000