#! /bin/bash

# Set up git info
filename="git-config.txt"

while IFS="=" read -r key value; do
  key=$(echo "$key" | xargs)
  value="$(echo "$value" | xargs)"

  case "$key" in
    username) username="$value" ;;
    email) email="$value" ;;
  esac
done < "$filename"

git config --global user.name "$username"
git config --global user.email "$email"

# sleep infinity so the container doesn't shut down
sleep infinity
