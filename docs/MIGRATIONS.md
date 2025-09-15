# Database Migrations

Our Chatbot db uses [Sequelize CLI](https://sequelize.org/docs/v6/other-topics/migrations/) to manage database migrations.

## Creating a Migration

To create a database migration skeleton, use the following command found in `package.json`.

``` bash
pnpm db:generate-migration --name <some_informative_name_about_your_model>
```

In `src/migrations`, you should now find a new migration file with an auto-generated timestamp.

Change the new migration's file extension to `.cjs`.

``` bash
202405121234-test.js ==> 202405121234-test.cjs
```

`*.js` files are set up to have a linting error if we use CommonJS style imports and exports, so `*.cjs` is used to be explicit about the fact that we are using a different workflow from the rest of the project.

## Adding Schema Changes

Below is the body of a sample migration to use as an example. Note that
the underlying Postgresql table should have **snake_cased** column names,
but that the table attributes should be **camelCase**.

See the [Sequelize Docs](https://sequelize.org/) for more examples and info on adding indexes, etc.

``` javascript
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('tests', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false
      },
      name: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      is_active: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
      },
      difficulty_level: {
        type: Sequelize.ENUM('easy', 'medium', 'hard'),
        defaultValue: 'medium'
      },
      max_score: {
        type: Sequelize.INTEGER
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      deleted_at: {
        type: Sequelize.DATE,
        allowNull: true
      }
    });

  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('tests');
  }
};
```

## Undoing a Migration

**These commands should be used very carefully!**
**Rolling back a migration may cause data loss!**

You can undo the most recent migration with

```bash
pnpm db:undo-migration
```

or undo the last n migrations with

```bash
pnpm db:rollback-migrations --to <first_migration_of_the_ones_to_rollback>
```

**Note:** The migration specified in the `--to` argument is included in the rollback!

Finally, undo every migration with

```bash
pnpm db:rollback-migrations
```