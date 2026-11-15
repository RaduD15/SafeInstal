# Stage 7: AI log

## Tools
- Gemini

## Conversations
- [https://share.gemini.google/kBTQgyFlLVDx]

## Key requests

### 1. Implementing CRUD operations and form validation
- **Asked**: I asked Gemini for step-by-step instructions and explanations to implement Stage 7 for the SafeInstal project.
- **Got**: I received the updated `api.js` with a centralized `request` helper for `POST`, `PATCH`, and `DELETE` requests, the controlled `InterventieForm` component with validation, and the updated `App.jsx` connecting all operations to the mock server.
- **Changed or rejected**: I ensured that the resource endpoints (`/interventii`), field names (`titlu`, `rezolvata`, `prioritate`), and layout styles matched my existing project structure.

### 2. Setting up automated testing markers
- **Asked**: I needed guidance on how to configure the repository for the automated verification requirements in Stage 7.
- **Got**: Gemini provided the exact structure for the `tw.json` configuration file in the root directory and showed where to add all required `data-testid` attributes across `InterventieForm`, `InterventieCard`, `InterventieList`, and `App`.
- **Changed or rejected**: I verified the attributes in the browser console using `querySelectorAll` to ensure they matched Table 7.3 from the guide.

## What I learned / what did not work
I learned how to build controlled forms in React using `value` and `onChange`, how to prevent default form submissions with `e.preventDefault()`, and how to display inline validation errors instead of browser alerts. I also understood the importance of updating the local React state only after receiving confirmation from the server (`await`), preventing duplicate submissions by disabling the submit button during requests, and configuring `data-testid` attributes for automated UI testing.