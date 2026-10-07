# Milk Tea Customizer

A WEB103 project for creating, viewing, editing, and deleting custom milk teas.

Live app: https://tea-studio.onrender.com

Planned options include Thai tea, black tea, green tea, and taro; medium or large
cups; whole, oat, or coconut milk; sweetness, ice, and toppings. Hot drinks cannot
include pudding (an app customization rule).

## Video Walkthrough

[Watch the video walkthrough on Google Drive](https://drive.google.com/file/d/19itkxXqjaNE8ZtfXk3ngSC0Tdw4QnMHy/view?usp=sharing)

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
are disabled while hot is selected.

## Step 4: Manage saved teas

Use **My teas** in the navigation to view `/drinks`. Each saved tea has a visual
preview and links to details and editing. The detail page shows the full recipe.
Editing reuses the customizer with the saved selections and recalculates price.
Delete is available from both the list and detail pages, with confirmation.
Loading states, retry actions, an empty collection, and missing-drink errors are
handled in the interface.

## Assignment checklist

- [x] React displays data from an Express API backed by Render PostgreSQL.
- [x] A `drinks` table stores the customization displayed in the app.
- [x] Multiple features each provide multiple options, including Thai milk tea.
- [x] Prices update when the recipe changes and are recalculated on the server.
- [x] Tea color, cup size, ice, and toppings change the visual preview.
- [x] Users can create and save drinks, view all drinks, and open drink details.
- [x] Users can edit and delete drinks from the collection or details page.
- [x] Invalid combinations produce an error before saving and in the API.
- [x] Stretch: hot drinks disable new pudding selections before submission.

## Verification

The production build passes with `npm run build`. API checks against Render
covered CRUD, pricing, invalid IDs/options, duplicate toppings, and invalid
combinations. Safari checks covered saving a Thai milk tea with boba ($6.25),
opening details, editing it to add grass jelly ($7.00), seeing it in the list,
and cancelling the delete confirmation. The test record was then deleted via
the API, and refreshing the collection showed the empty state.

## Deployment

The app is deployed as a free Node web service on Render in Oregon. Render runs
`npm install --include=dev && npm run build`, then `npm start` with
`NODE_ENV=production`. Express serves the built React app and API from the same
origin. The service connects to the existing Render Postgres database through
its internal hostname; database credentials are stored in Render environment
variables. `server/.env` remains private and excluded from Git.

Deployments run automatically when `main` is updated on GitHub. The initial
deployment reached `live`, and the public `/api/drinks` endpoint successfully
queried the database.

Post-deployment checks also passed for creating, reading, updating, and deleting
a Thai milk tea through the public API, server-side pricing, invalid combinations,
invalid IDs, option retrieval, and direct loading of a detail URL. The temporary
deployment test drink was removed after verification.
