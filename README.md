**JavaScript Functionality Implementation**

In the MySpotify project, all required JavaScript features were fully implemented.
A central array `songs` in `albumDisplay.js` stores over 18 song objects containing
titles, artists, durations, and cover images, serving as the data source for the
entire application. Loops (`forEach`, `filter`) dynamically generate album cards,
library table rows, search results, and recently played lists across multiple pages.
Conditional logic using `if-else` statements handles playback state, song existence
checks, empty search results, and timer boundaries. At least five event listeners
were added: `click` on play buttons in cards, table rows, and artist profiles;
`keyup` for live search; `submit` on the search form; and `click` on player controls
(prev/play/next). DOM manipulation is used extensively — updating song titles, cover
images, playback time, button icons, and injecting HTML content dynamically. Reusable
functions such as `initPlayer()`, `loadSong()`, `togglePlay()`, `renderAlbums()`,
`renderLibrary()`, and `startFakeTimer()` encapsulate repeated tasks, manage user
interactions, and process playback logic efficiently. Overall, the project demonstrates
robust, clean, and interactive JavaScript functionality meeting all assignment requirements.
