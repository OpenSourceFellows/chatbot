# Setting up a database

## Docker Dev Environment

### Creating a database

Once your dev containers are running and you are inside the chatbot_server container, it is easy to create a development database.

First, install dependencies.

```bash
pnpm install
```

Then, create the database.

```bash
pnpm db:create
```

Finally, run the migrations to build the most current schema.

```bash
pnpm db:migrate
```

### Dropping a database

You can also delete the whole database, which is sometimes useful. Simply run

```bash
pnpm db:drop
```

**Note:** Any data that was saved will be lost and unrecoverable!