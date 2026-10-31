# Stage 4: AI log

## Tools
- Gemini

## Conversations
- https://share.gemini.google/ZZQGPeeCQ2js

## Key requests

### 1. Extracting React components
- **Asked**: I asked Gemini to help me continue with Stage 4 step-by-step.
- **Got**: I received the code for `InterventieCard` and `InterventieList` components. Gemini explained how to use conditional rendering and the `map` function to generate the UI from the data array.
- **Changed or rejected**: I integrated the components into my `App.jsx` and verified that the priority badges and statuses matched my SafeInstal design.


## What I learned / what did not work
I learned how to break down a monolithic React file into smaller, reusable components (`InterventieCard` and `InterventieList`). I also understood the importance of the `key` attribute when rendering lists with `map`, and how to conditionally render elements (like an empty state message) based on the array's length. I also learned to always check my current terminal directory when running npm commands.