# ilo-portfolio

Media-oriented portfolio site for Iloe Vera.

## Structure

- `index.html` contains the page shell and section markup.
- `src/styles/site.css` contains the grid treatment, layout refinements, and component states that sit alongside Tailwind utilities.
- `src/js/main.js` handles horizontal navigation, active-section progress state, keyboard support, and project popups.
- `src/data/projects.js` contains placeholder project records so future content updates stay centralized.

## Usage

This version is a static implementation and can be opened directly in a browser by loading `index.html`.

## Notes for Future Improvements

- Replace placeholder project content in `src/data/projects.js` with real case-study data.
- Move from the Tailwind CDN to a local Tailwind CLI pipeline once Node.js is available in the environment.
- Add real media assets and external case-study links without changing the current section or modal structure.
