#! /bin/bash

set_git_info() {
  username=$(git config --global user.name)
  email=$(git config --global user.email)

  echo "username=$username" > git-config.txt
  echo "email=$email" >> git-config.txt
}

echo "Setting up container..."
# First, get Git info from local machine config.
set_git_info

echo "1/2: Spinning up container..."
docker compose -f .docker/docker-compose.yml up -d

echo "2/2: Entering container..."
docker exec -it chatbot_server /bin/sh
