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

## Step 2: Drinks API

Run `npm run dev`, then access these endpoints on `http://localhost:3000`:

| Method | Path | Purpose |
| --- | --- | --- |
| GET | `/api/drinks` | List saved drinks |
| GET | `/api/drinks/options` | Available options and prices in cents |
| GET | `/api/drinks/:id` | View a drink |
| POST | `/api/drinks` | Create a drink |
| PUT | `/api/drinks/:id` | Replace a drink's customization |
| DELETE | `/api/drinks/:id` | Delete a drink |

POST and PUT accept all customization fields:

```json
{
  "name": "My Thai Milk Tea",
  "tea_base": "thai",
  "size": "large",
  "milk": "oat",
  "sweetness": 50,
  "ice": "less",
  "toppings": ["boba"]
}
```

The server calculates the price (this example is $8.00); client-supplied prices
are ignored. Invalid options, duplicate toppings, and hot drinks with pudding
return HTTP 400 with an `error` message. Missing drinks return 404.

## Step 3: Create your milk tea

Open the Vite URL printed by `npm run dev`. Tea Studio loads option prices from
the API, previews tea colors, cup sizes, ice, and toppings, and saves your creation
to Render Postgres. Thai milk tea is selected by default.

Select hot with pudding to see the combination warning; new pudding selections
are disabled while hot is selected. The saved-drink list and editing pages will
be implemented in the next stage.
