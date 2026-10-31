# Stage 5: AI log

## Tools
- Gemini

## Conversations
- https://gemini.google.com/share/f9fed6035d49 (Moving data to React state, implementing toggle/delete functions, and adding a theme toggle)

## Key requests

### 1. Adding interactivity and state
- **Asked**: I requested step-by-step instructions to implement Stage 5 requirements.
- **Got**: Code for `App.jsx`, `InterventieList.jsx`, and `InterventieCard.jsx` integrating `useState` for the main array and immutable update functions (`map`, `filter`). I also received the code to manage the Light/Dark mode state and write it to the `html` element.
- **Changed or rejected**: I adjusted the component structures to preserve my original layout, ensuring the checkbox and text were wrapped in a clickable label while retaining the grid structure.

## What I learned / what did not work
I learned how to lift state up in React, why functions that modify state need to use immutable array methods (`map`/`filter`), how to pass event handlers as props down the component tree, and how to implement a manual dark/light mode toggle that updates both React state and HTML attributes.