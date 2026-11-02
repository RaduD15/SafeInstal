# Stage 6: AI log

## Tools
- Gemini

## Conversations
- [https://share.gemini.google/BMAGtBCgs9js] (Setting up json-server, fetching API data with useEffect, handling loading and error states)

## Key requests

### 1. Setting up mock API with json-server
- **Asked**: I asked how to install and configure json-server on port 3001 using custom resource name `interventii` in `db.json`.
- **Got**: Instructions to install `json-server@0.17.4`, create `db.json` with 5 sample items, and add the `"api"` script to `package.json`.
- **Changed or rejected**: Used exact version `0.17.4` as instructed to prevent random string IDs.

### 2. Extracting fetch calls and implementing useEffect
- **Asked**: I asked how to build `api.js` using environment variables, and how to update `App.jsx` with `useEffect` to handle loading, success, and error states.
- **Got**: Implementation of `api.js` using `import.meta.env` and `App.jsx` using `useEffect` with an `ignore` flag for cleanup.
- **Changed or rejected**: Preserved the dark mode toggle state (`tema` / `handleTema`) from Stage 5 while integrating the new asynchronous load state.

## What I learned / what did not work
I learned how to set up a mock REST API using `json-server`, how to isolate data fetching functions inside an `api.js` module using environment variables, how to run asynchronous side effects in React using `useEffect`, how to clean up effects using a boolean flag (`ignore`), and how to properly present loading and error UI states to the user.