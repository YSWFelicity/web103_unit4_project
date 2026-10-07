# Milk Tea Customizer

A WEB103 project for creating, viewing, editing, and deleting custom milk teas.

Planned options include Thai tea, black tea, green tea, and taro; medium or large
cups; whole, oat, or coconut milk; sweetness, ice, and toppings. Hot drinks cannot
include pudding (an app customization rule).

## Step 1: Database setup

1. Create a PostgreSQL database on Render.
2. Copy the environment template from the project root:

   ```sh
   cp server/.env.example server/.env
   ```

3. Fill in `server/.env` with your database's connection values. Local development
   requires the full external hostname, not the internal hostname. Keep this file
   private; `.gitignore` excludes it.
4. Create the table:

   ```sh
   npm run db:init
   ```

   This command creates the `drinks` table if needed and preserves existing data.

## Development

```sh
npm run dev
```
