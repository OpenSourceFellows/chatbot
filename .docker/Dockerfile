FROM node:20-alpine AS chatbot

# This will install pnpm (https://nodejs.org/api/corepack.html)
RUN corepack enable
RUN corepack use pnpm@*

ARG WORKDIR=/chatbot_server
WORKDIR ${WORKDIR}

# Add only package files for caching dependencies
ADD package.json   ${WORKDIR}
ADD pnpm-lock.yaml ${WORKDIR}
ADD scripts/ /chatbot_server/scripts/

# Install dependencies
RUN pnpm install

# Now copy the rest of the source files (including scripts/)
COPY . .

# Now chmod scripts - scripts/ exists now
RUN chmod +x ./scripts/*.sh || true

# Set up git
RUN apk add git
ADD git-config.txt ${WORKDIR}

EXPOSE 7000
