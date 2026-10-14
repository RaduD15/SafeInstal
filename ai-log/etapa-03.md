# Stage 3: AI log

## Tools
- Gemini

## Conversations
- [https://share.gemini.google/aFRlDdzcpyh9]

## Key requests

### 1. Understanding the Stage 3 workflow
- **Asked**: I asked Gemini to explain the Stage 3 PDF guidelines step-by-step and clarify what needs to be done.
- **Got**: I received a clear, 11-step breakdown on how to move the old mockup files, initialize the Vite + React project, clean up the default files, and start the development server.
- **Changed or rejected**: I followed the steps exactly but made sure the context applied specifically to my QuickInstal project.

### 2. Converting HTML/JS to React JSX
- **Asked**: I asked Gemini to help me write the `App.jsx` code based on my existing `index.html` and `interventii.js` files.
- **Got**: I received the fully functional React component. Gemini explained the differences between HTML and JSX (like using `className` instead of `class`, closing all tags, and using fragments) and implemented the dynamic counters and raw JSON list rendering.

### 3. Updating the README and checklist
- **Asked**: I asked for help formatting the `README.md` file according to the Stage 3 requirements.
- **Got**: I received the exact markdown text for the new Stage 3 section, the run instructions, and the required checklist table, along with instructions on how to split this into two separate commits.


## What I learned / what did not work
I learned how to initialize and run a React development server with Vite using `npm run dev` and how to handle JSX syntax differences (like `className` instead of `class`)