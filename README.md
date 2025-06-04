# Chatbot Server

This repository houses the source code for the Chatbot backend. It uses NodeJS.

## Recommended IDE Setup

We **highly** recommend [VS Code](https://code.visualstudio.com/) for its great plugins. 

## Running the App

Using Docker is the best way to run the app for development. **Please use only pnpm to run the project or handle dependencies!** Different tools like `yarn` and `npm` are not interoperable with `pnpm` (or each other) and will cause problems when intermingled.

Ensure you have wsl environment installed for those using windows pc, if not install from [here](https://learn.microsoft.com/en-us/windows/wsl/install).

Ensure you have Docker Desktop installed and running on your machine, if not install from [here](https://docs.docker.com/desktop/).

At the project here on github, click on the code button and copy the link from the https tab.

Navigate to the where you want to clone your project in the wsl environment on the terminal and enter the command `git clone https://github.com/OpenSourceFellows/chatbot.git`.

cd into project ``` cd chatbot_server ```

Open the project from your terminal using command ` code .`

At the root of your project you would find a `.env.example` file. Copy the creds in that file into a `.env` file.
Still at the root of your project, locate the `.docker` folder and copy the creds in its .env.example file into another .env file within the .docker folder.

Starting this project for the first time, at the root of the project ```/chatbot_server```, run the following commands in the terminal in the following order:
```
pnpm install
```
```
./scripts/rebuild.sh
``` 

to build the docker containers for our project.

```
./scripts/start.sh
``` 

to run our container and allow us to enter into the project.

Once inside, run
```
pnpm install
```
to install node packages and then run

```
pnpm dev
```
to start the development server. The app will run on port 7000 so make sure that is available on your local machine or you probably won't be able to access the app in your browser.

To exit the conainer, shut down the dev server with `ctrl + c` and you can just type `exit`.

To shut down the container, use
```
./scripts/stop.sh
```
You may need to rebuild the container from time to time and can do that with
```
./scripts/rebuild.sh
```

## Testing
We use jest for testing. You can start this with
```
pnpm test
```

## Linting
We use eslint for strong linting practices for this project and you can check if your code meets the standard by running
```

pnpm lint
```
and run

```

pnpm lint:fix
```
to auto fix common errors.