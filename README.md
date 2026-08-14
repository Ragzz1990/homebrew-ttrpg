# The Far Reach v1.2.1 — Galaxy Atlas Fix

This replaces v1.2 and fixes atlas initialisation.

Key fixes:
- all main JavaScript now uses `defer`
- atlas waits for DOMContentLoaded
- clear on-page status if galaxy data fails to load
- map works even if planet image files are missing
- first planet auto-opens so successful loading is obvious
- region dropdown and markers initialise together

Upload all files and folders from this package to the repository root, replacing v1.2.
Keep `assets/planets/` intact.
