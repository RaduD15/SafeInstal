# QuickInstal
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

Details per stage:
- Stage 1: Used AI to understand Git commands, set up the initial HTML semantic structure, and create the responsive CSS Grid/Flexbox layout for the mockup. Manual adjustments were made to the dark theme, specific CSS classes, and layout spacing. See the `ai-log/` folder.
- Stage 2: Used AI to generate the immutable JavaScript array methods (map, filter, reduce) and console tests according to the assignment requirements. See the `ai-log/` folder.
- Stage 3: Used AI to guide the Vite project initialization, file cleanup, JSX conversion, and README updates according to the lab requirements. See the `ai-log/` folder.
- Stage 4: Used AI to split the UI into React components (InterventieList and InterventieCard), pass data via props, implement conditional rendering for empty lists, and map array items with unique keys. See the `ai-log/` folder.


## How to run
cd frontend
npm install
npm run dev
Then open the address printed in the terminal (http://localhost:5173).

## Status
- [x] Stage 1: static mockup
- [x] Stage 2: data logic in JavaScript
- [x] Stage 3: Vite and React project
- [x] Stage 4: components rendered from data

## Stage 1 Checklist
| ID | Requirement | Where (permalink) | How to check |
| --- | --- | --- | --- |
| S1-R1 | README: description, fields, sample data, how to run | [README.md](https://github.com/RaduD15/SafeInstal/blob/main/readme.md) | read |
| S1-R2 | AI usage section | [README.md](https://github.com/RaduD15/SafeInstal/blob/4e3792314524a5aff2f8912e1c15098d907c022e/readme.md) | read |
| S1-R3 | AI log for stage 1 | [ai-log/etapa-01.md](https://github.com/RaduD15/SafeInstal/blob/main/ai-log/etapa-01.md) | read |
| S1-R4 | header, form (text + select), 3 cards with own data | [index.html#L10-L64](https://github.com/RaduD15/SafeInstal/blob/4e3792314524a5aff2f8912e1c15098d907c022e/index.html#L10-L64) | open the page |
| S1-R5 | finished card looks different | [style.css#L154-L161](https://github.com/RaduD15/SafeInstal/blob/4e3792314524a5aff2f8912e1c15098d907c022e/style.css#L154-L161) | look at the card |
| S1-R6 | 2 columns on desktop, 1 under 700px | [style.css#L199-L203](https://github.com/RaduD15/SafeInstal/blob/4e3792314524a5aff2f8912e1c15098d907c022e/style.css#L199-L203) | resize < 700px |
| S1-R7 | visible focus, readable dark theme | [style.css#L194-L225](https://github.com/RaduD15/SafeInstal/blob/4e3792314524a5aff2f8912e1c15098d907c022e/style.css#L194-L225) | Tab; dark mode |
| S1-R8 | commit "Stage 1" pushed | [commit 4e37923](https://github.com/RaduD15/SafeInstal/commit/4e3792314524a5aff2f8912e1c15098d907c022e) | commit history |

## Stage 2 Checklist
| ID | Requirement | Where (permalink) | How to check |
| --- | --- | --- | --- |
| S2-R1 | JS file linked, logs on page load | [index.html#L66](https://github.com/RaduD15/SafeInstal/blob/main/index.html#L66) | open page, F12 |
| S2-R2 | 3+ items with id, name, state, tag | [interventii.js#L2-L6](https://github.com/RaduD15/SafeInstal/blob/main/interventii.js#L2-L6) | read |
| S2-R3 | list, count, search, add, toggle, delete | [interventii.js#L10-L67](https://github.com/RaduD15/SafeInstal/blob/main/interventii.js#L10-L67) | console output |
| S2-R4 | add rejects empty name and invalid tag | [interventii.js#L30-L37](https://github.com/RaduD15/SafeInstal/blob/main/interventii.js#L30-L37) | last 2 console lines |
| S2-R5 | original array unchanged after add | [interventii.js#L71](https://github.com/RaduD15/SafeInstal/blob/main/interventii.js#L71) | console line |
| S2-R6 | README Stage 2 section + AI log | [README.md](https://github.com/RaduD15/SafeInstal/blob/main/readme.md) | read |
| S2-R7 | commit "Stage 2" pushed | [commit cb2045e](https://github.com/RaduD15/SafeInstal/commit/cb2045e59b7ad93d0c324066c5cae474e99cfa8e) | commit history |

## Stage 3 Checklist
| ID | Requirement | Where (permalink) | How to check |
| --- | --- | --- | --- |
| S3-R1 | npm run dev starts without errors | [frontend/package.json](https://github.com/RaduD15/SafeInstal/blob/main/frontend/package.json) | npm install, npm run dev |
| S3-R2 | app name and counter computed from data | [frontend/src/App.jsx#L12-L17](https://github.com/RaduD15/SafeInstal/blob/main/frontend/src/App.jsx#L12-L17) | edit data, save |
| S3-R3 | data from README, not from the example | [frontend/src/App.jsx#L1-L5](https://github.com/RaduD15/SafeInstal/blob/main/frontend/src/App.jsx#L1-L5) | compare with README |
| S3-R4 | stage 1 styles reused | [frontend/src/App.css](https://github.com/RaduD15/SafeInstal/blob/main/frontend/src/App.css) | look at the page |
| S3-R5 | node_modules ignored, build passes | [frontend/.gitignore](https://github.com/RaduD15/SafeInstal/blob/main/frontend/.gitignore) | npm run build |
| S3-R6 | README Stage 3 section + AI log | [README.md](https://github.com/RaduD15/SafeInstal/blob/main/readme.md) | read |
| S3-R7 | commit "Stage 3" pushed | [commit 56e34fc](https://github.com/RaduD15/SafeInstal/commit/56e34fc06bc2d70f918077bbd6de99ad4e9a0c26) | commit history |


## Stage 4 Checklist
| ID | Requirement | Where (permalink) | How to check |
| --- | --- | --- | --- |
| S4-R1 | List component, `.map()`, `key` | [InterventieList.jsx#L9-L14](https://github.com/RaduD15/SafeInstal/blob/main/frontend/src/Components/InterventieList.jsx#L9-L14) | read code |
| S4-R2 | Card component uses props | [InterventieCard.jsx#L7-L18](https://github.com/RaduD15/SafeInstal/blob/main/frontend/src/Components/InterventieCard.jsx#L7-L18) | read code |
| S4-R3 | App computes counters, passes data to List | [App.jsx#L9-L25](https://github.com/RaduD15/SafeInstal/blob/main/frontend/src/App.jsx#L9-L25) | read code |
| S4-R4 | empty list handled conditionally | [InterventieList.jsx#L4-L6](https://github.com/RaduD15/SafeInstal/blob/main/frontend/src/Components/InterventieList.jsx#L4-L6) | delete data, save, look at page |
| S4-R5 | README Stage 4 section + AI log | [README.md](https://github.com/RaduD15/SafeInstal/blob/main/readme.md) | read |
| S4-R6 | commit "Stage 4" pushed | [commit 6c155c4](https://github.com/RaduD15/SafeInstal/commit/6c155c4f2ebf482c24aeda4edbd7d9460316c5a4) | commit history |
