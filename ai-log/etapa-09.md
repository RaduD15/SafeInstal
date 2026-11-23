# Stage 9: AI log

## Tools
- Gemini

## Conversations
- https://gemini.google.com/share/885179394648?social_preview=true&skid=36abc40d-6eb1-4c84-b7fe-05fb1535fc82
## Key requests

### 1. Building the Node.js and Express backend
- **Asked**: I asked Gemini for step-by-step instructions to implement Stage 9 and replace `json-server` with a custom Express API for the SafeInstal project.
- **Got**: I received the complete structure for the `backend/` folder, including `package.json` with ES modules, `validation.js` with a field whitelist and `parseId`, `routes/interventii.js` implementing all five REST endpoints (`GET`, `POST`, `PATCH`, `DELETE`), and the middleware setup in `app.js` and `server.js`.
- **Changed or rejected**: I adapted the resource path (`/interventii`), priority values (`mica`, `medie`, `mare`), and error messages to match my project's data model and `tw.json` configuration.

### 2. Connecting the frontend and removing json-server
- **Asked**: I needed instructions on how to connect the React frontend to the new Express server and clean up old dependencies.
- **Got**: Gemini showed how to update `request()` in `frontend/src/api.js` to parse `{ error }` payloads from the server, delete `db.json`, remove `json-server` from `frontend/package.json`, and run `npm install` to sync `package-lock.json`.
- **Changed or rejected**: I tested all routes with `curl` first to verify the HTTP status codes (`200`, `201`, `204`, `400`, `404`) before testing in the browser.

## What I learned / what did not work
I learned how to structure a RESTful API using Express Router, why `app.js` should be separated from `server.js`, and how CORS policies work when the frontend (`:5173`) and backend (`:3001`) run on different ports. I also understood why server-side validation and field whitelisting are essential even when the frontend already validates form inputs.