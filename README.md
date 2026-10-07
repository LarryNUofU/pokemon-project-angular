# Pokemon Adventures

Allows users to catch pokemon, view their collection, and search for other pokemon using a search bar.
Can switch between different users with a specific username.

Uses only https://pokeapi.co/ for information and images.


This repository contains the Pokemon Project frontend and its `pokemon-db` backend.

## Getting started

Run the following commands from the repository root. You need Node.js and npm installed.

http://localhost:3000 is required to be open (backend). Backend creates a database file in the pokemon-db folder.

http://localhost:4200 is required to be open (frontend)

Choose the command that matches what you want to do:

### Install dependencies only

Use this when you want to set up the project now and start it later:

```bash
npm run devInstall
```

This installs dependencies for both the frontend and backend (folder located in `pokemon-db`).

### Install dependencies and start the app

```bash
npm run devInstallAndStart
```

This installs dependencies for both projects, then starts the frontend and backend.

### Start the app after setup

Use this when dependencies are already installed:

```bash
npm run dev
```

This starts the frontend and backend together. Stop both services with `Ctrl+C`.



The Angular development server is available at [http://localhost:4200](http://localhost:4200).

Diagram of overall architure (some things have changed/updated from the diagram, but mostly intact):
<img width="2492" height="1452" alt="Pokemon Project drawio (1)" src="https://github.com/user-attachments/assets/24214d48-8f6a-48b8-9281-a8c2af8a8c50" />

