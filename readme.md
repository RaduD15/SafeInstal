# SafeInstal
A web application that efficiently manages plumbing and heating problems and interventions for a service company's clients.

## Data model
| Field | Type | Notes |
| --- | --- | --- |
| title | text | required, max 100 chars |
| resolved | boolean | toggled from the list, default false |
| priority | fixed values | mica (low), medie (medium), mare (high) |
| category | relation | Plumbing, Heating, Maintenance |
| user | relation | the owner of the item (from week 11) |

Sample data used across all stages:
1. Scurgere țeavă baie principală, active, mare
2. Verificare anuală centrală termică, done, medie
3. Înlocuire robinet calorifer, active, mica

## AI usage
| Tool | Used for |
| --- | --- |
| Gemini | Drafting README contents, HTML/CSS layout, JS logic, and Vite/React setup |
| Claude | Reviewing the stages against the guides, fixes and the visual redesign |

Details per stage:
- Stage 1: Used AI to understand Git commands, set up the initial HTML semantic structure, and create the responsive CSS Grid/Flexbox layout for the mockup. Manual adjustments were made to the dark theme, specific CSS classes, and layout spacing. See the `ai-log/` folder.
- Stage 2: Used AI to generate the immutable JavaScript array methods (map, filter, reduce) and console tests according to the assignment requirements. See the `ai-log/` folder.
- Stage 3: Used AI to guide the Vite project initialization, file cleanup, JSX conversion, and README updates according to the lab requirements. See the `ai-log/` folder.
- Stage 4: Used AI to split the UI into React components (InterventieList and InterventieCard), pass data via props, implement conditional rendering for empty lists, and map array items with unique keys. See the `ai-log/` folder.
- Stage 5: Used AI to move the data array into React state (`useState`), implement immutable toggle and delete functions, lift state up to the App component, and add a toggleable dark mode theme. See the `ai-log/` folder.


## How to run
```
cd frontend
npm install
npm run dev
```
Then open the address printed in the terminal (http://localhost:5173).

The static mockup from stages 1 and 2 is kept in `mockup/` (open `mockup/index.html` in the browser).

## Stage 2: data logic
Plain JavaScript, no DOM. `interventii.js` holds the array and the functions
that read and change it. Results are printed in the browser console (F12).

## Stage 3: Vite and React project
The app now lives in `frontend/`, built with Vite. The data from stage 2
moved into the main component; the list is still printed raw.

## Stage 4: components
The list is rendered from the data, through two components:
- `InterventieList` receives the whole array and renders one card per item
- `InterventieCard` receives a single item through props and displays it

## Stage 5: local state and events
The list lives in React state. Checking and deleting work from the page,
and the counters in the header follow automatically. A button in the
header switches between light and dark mode. Changes are lost on refresh,
which is what stage 6 and stage 10 fix.

## Status
- [x] Stage 1: static mockup
- [x] Stage 2: data logic in JavaScript
- [x] Stage 3: Vite and React project
- [x] Stage 4: components rendered from data
- [x] Stage 5: local state and events
- [ ] Stage 6: loading data from a mock API

## Stage 1 Checklist
| ID | Requirement | Where (permalink) | How to check |
| --- | --- | --- | --- |
| S1-R1 | README: description, fields, sample data, how to run | [README.md](https://github.com/RaduD15/SafeInstal/blob/7d47e4883ee213157637d4574a52bad9be690f30/readme.md) | read |
| S1-R2 | AI usage section | [README.md](https://github.com/RaduD15/SafeInstal/blob/7d47e4883ee213157637d4574a52bad9be690f30/readme.md) | read |
| S1-R3 | AI log for stage 1 | [ai-log/etapa-01.md](https://github.com/RaduD15/SafeInstal/blob/7d47e4883ee213157637d4574a52bad9be690f30/ai-log/etapa-01.md) | read |
| S1-R4 | header, form (text + select), 3 cards with own data | [index.html#L10-L67](https://github.com/RaduD15/SafeInstal/blob/4e3792314524a5aff2f8912e1c15098d907c022e/index.html#L10-L67) | open the page |
| S1-R5 | finished card looks different | [style.css#L154-L161](https://github.com/RaduD15/SafeInstal/blob/4e3792314524a5aff2f8912e1c15098d907c022e/style.css#L154-L161) | look at the card |
| S1-R6 | 2 columns on desktop, 1 under 700px | [style.css#L199-L203](https://github.com/RaduD15/SafeInstal/blob/4e3792314524a5aff2f8912e1c15098d907c022e/style.css#L199-L203) | resize < 700px |
| S1-R7 | visible focus, readable dark theme | [style.css#L194-L197](https://github.com/RaduD15/SafeInstal/blob/4e3792314524a5aff2f8912e1c15098d907c022e/style.css#L194-L197), [style.css#L205-L227](https://github.com/RaduD15/SafeInstal/blob/4e3792314524a5aff2f8912e1c15098d907c022e/style.css#L205-L227) | Tab; dark mode |
| S1-R8 | commit "Stage 1" pushed | [commit 4e37923](https://github.com/RaduD15/SafeInstal/commit/4e3792314524a5aff2f8912e1c15098d907c022e) | commit history |

## Stage 2 Checklist
| ID | Requirement | Where (permalink) | How to check |
| --- | --- | --- | --- |
| S2-R1 | JS file linked, logs on page load | [index.html#L68](https://github.com/RaduD15/SafeInstal/blob/cb2045e59b7ad93d0c324066c5cae474e99cfa8e/index.html#L68) | open page, F12 |
| S2-R2 | 3+ items with id, name, state, tag | [interventii.js#L2-L8](https://github.com/RaduD15/SafeInstal/blob/cb2045e59b7ad93d0c324066c5cae474e99cfa8e/interventii.js#L2-L8) | read |
| S2-R3 | list, count, search, add, toggle, delete | [interventii.js#L10-L67](https://github.com/RaduD15/SafeInstal/blob/cb2045e59b7ad93d0c324066c5cae474e99cfa8e/interventii.js#L10-L67) | console output |
| S2-R4 | add rejects empty name and invalid tag | [interventii.js#L34-L42](https://github.com/RaduD15/SafeInstal/blob/cb2045e59b7ad93d0c324066c5cae474e99cfa8e/interventii.js#L34-L42) | last 2 console lines |
| S2-R5 | original array unchanged after add | [interventii.js#L76-L78](https://github.com/RaduD15/SafeInstal/blob/cb2045e59b7ad93d0c324066c5cae474e99cfa8e/interventii.js#L76-L78) | console line |
| S2-R6 | README Stage 2 section + AI log | [README.md](#stage-2-data-logic), [ai-log/etapa-02.md](ai-log/etapa-02.md) | read |
| S2-R7 | commit "Stage 2" pushed | [commit cb2045e](https://github.com/RaduD15/SafeInstal/commit/cb2045e59b7ad93d0c324066c5cae474e99cfa8e) | commit history |

## Stage 3 Checklist
| ID | Requirement | Where (permalink) | How to check |
| --- | --- | --- | --- |
| S3-R1 | npm run dev starts without errors | [frontend/package.json](https://github.com/RaduD15/SafeInstal/blob/56e34fc06bc2d70f918077bbd6de99ad4e9a0c26/frontend/package.json) | npm install, npm run dev |
| S3-R2 | app name and counter computed from data | [App.jsx#L7-L18](https://github.com/RaduD15/SafeInstal/blob/56e34fc06bc2d70f918077bbd6de99ad4e9a0c26/frontend/src/App.jsx#L7-L18) | edit data, save |
| S3-R3 | data from README, not from the example | [App.jsx#L1-L5](https://github.com/RaduD15/SafeInstal/blob/56e34fc06bc2d70f918077bbd6de99ad4e9a0c26/frontend/src/App.jsx#L1-L5) | compare with README |
| S3-R4 | stage 1 styles reused | [App.css](https://github.com/RaduD15/SafeInstal/blob/56e34fc06bc2d70f918077bbd6de99ad4e9a0c26/frontend/src/App.css) | look at the page |
| S3-R5 | node_modules ignored, build passes | [frontend/.gitignore](https://github.com/RaduD15/SafeInstal/blob/56e34fc06bc2d70f918077bbd6de99ad4e9a0c26/frontend/.gitignore) | npm run build |
| S3-R6 | README Stage 3 section + AI log | [README.md](#stage-3-vite-and-react-project), [ai-log/etapa-03.md](ai-log/etapa-03.md) | read |
| S3-R7 | commit "Stage 3" pushed | [commit 56e34fc](https://github.com/RaduD15/SafeInstal/commit/56e34fc06bc2d70f918077bbd6de99ad4e9a0c26) | commit history |

## Stage 4 Checklist
| ID | Requirement | Where (permalink) | How to check |
| --- | --- | --- | --- |
| S4-R1 | 2+ components in src/components/ | [frontend/src/components/](frontend/src/components) | open folder |
| S4-R2 | card receives data through props | [InterventieCard.jsx#L7-L21](https://github.com/RaduD15/SafeInstal/blob/6c155c4f2ebf482c24aeda4edbd7d9460316c5a4/frontend/src/Components/InterventieCard.jsx#L7-L21) | read |
| S4-R3 | map + key={id}, no console warnings | [InterventieList.jsx#L10-L12](https://github.com/RaduD15/SafeInstal/blob/6c155c4f2ebf482c24aeda4edbd7d9460316c5a4/frontend/src/Components/InterventieList.jsx#L10-L12) | F12, Console |
| S4-R4 | message for empty list | [InterventieList.jsx#L4-L6](https://github.com/RaduD15/SafeInstal/blob/6c155c4f2ebf482c24aeda4edbd7d9460316c5a4/frontend/src/Components/InterventieList.jsx#L4-L6) | set array to [] |
| S4-R5 | state changes the card look | [InterventieCard.jsx#L9](https://github.com/RaduD15/SafeInstal/blob/6c155c4f2ebf482c24aeda4edbd7d9460316c5a4/frontend/src/Components/InterventieCard.jsx#L9) | toggle a done flag |
| S4-R6 | README Stage 4 section + AI log | [README.md](#stage-4-components), [ai-log/etapa-04.md](ai-log/etapa-04.md) | read |
| S4-R7 | commit "Stage 4" pushed | [commit 6c155c4](https://github.com/RaduD15/SafeInstal/commit/6c155c4f2ebf482c24aeda4edbd7d9460316c5a4) | commit history |

## Stage 5 Checklist
| ID | Requirement | Where (permalink) | How to check |
| --- | --- | --- | --- |
| S5-R1 | list kept in useState, in App | [App.jsx#L15](https://github.com/RaduD15/SafeInstal/blob/54081cdecd6604d3db1490b0c2d8744111b8f592/frontend/src/App.jsx#L15) | read |
| S5-R2 | toggling changes state and card look | [App.jsx#L18-L22](https://github.com/RaduD15/SafeInstal/blob/54081cdecd6604d3db1490b0c2d8744111b8f592/frontend/src/App.jsx#L18-L22), [InterventieCard.jsx#L9](https://github.com/RaduD15/SafeInstal/blob/54081cdecd6604d3db1490b0c2d8744111b8f592/frontend/src/Components/InterventieCard.jsx#L9) | click a checkbox |
| S5-R3 | delete removes the item | [App.jsx#L24-L26](https://github.com/RaduD15/SafeInstal/blob/54081cdecd6604d3db1490b0c2d8744111b8f592/frontend/src/App.jsx#L24-L26), [InterventieCard.jsx#L23-L29](https://github.com/RaduD15/SafeInstal/blob/54081cdecd6604d3db1490b0c2d8744111b8f592/frontend/src/Components/InterventieCard.jsx#L23-L29) | click Delete |
| S5-R4 | header counter derived, not in state | [App.jsx#L34](https://github.com/RaduD15/SafeInstal/blob/54081cdecd6604d3db1490b0c2d8744111b8f592/frontend/src/App.jsx#L34) | toggle, watch header |
| S5-R5 | immutable updates (no push, splice, assignment) | [App.jsx#L18-L26](https://github.com/RaduD15/SafeInstal/blob/54081cdecd6604d3db1490b0c2d8744111b8f592/frontend/src/App.jsx#L18-L26) | read |
| S5-R6 | light / dark toggle: state + data-theme on html | [App.jsx#L28-L32](https://github.com/RaduD15/SafeInstal/blob/54081cdecd6604d3db1490b0c2d8744111b8f592/frontend/src/App.jsx#L28-L32), [App.css#L257-L302](https://github.com/RaduD15/SafeInstal/blob/54081cdecd6604d3db1490b0c2d8744111b8f592/frontend/src/App.css#L257-L302) | click the button, both system themes |
| S5-R7 | no console warnings; README + AI log | [README.md](#stage-5-local-state-and-events), [ai-log/etapa-05.md](ai-log/etapa-05.md) | F12, Console |
| S5-R8 | commit "Stage 5" pushed | [commit 54081cd](https://github.com/RaduD15/SafeInstal/commit/54081cdecd6604d3db1490b0c2d8744111b8f592) | commit history |


