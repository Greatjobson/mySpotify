// === ALBUM DISPLAY MODULE ===

// === SONGS ARRAY ===
export const songs = [
  {
    title: "Alone Again",
    artist: "The Weeknd",
    album: "After Hours",
    duration: "4:10",
    img: "../img/weeknd.jpg"
  },
  {
    title: "Too Late",
    artist: "The Weeknd",
    album: "After Hours",
    duration: "3:59",
    img: "../img/weeknd.jpg"
  },
  {
    title: "Hardest To Love",
    artist: "The Weeknd",
    album: "After Hours",
    duration: "3:31",
    img: "../img/weeknd.jpg"
  },
  {
    title: "Scared To Live",
    artist: "The Weeknd",
    album: "After Hours",
    duration: "4:02",
    img: "../img/weeknd.jpg"
  },
  {
    title: "Snowchild",
    artist: "The Weeknd",
    album: "After Hours",
    duration: "5:12",
    img: "../img/weeknd.jpg"
  },
  {
    title: "Escape From LA",
    artist: "The Weeknd",
    album: "After Hours",
    duration: "4:24",
    img: "../img/weeknd.jpg"
  },
  {
    title: "Heartless",
    artist: "The Weeknd",
    album: "After Hours",
    duration: "3:20",
    img: "../img/weeknd.jpg"
  },
  {
    title: "Faith",
    artist: "The Weeknd",
    album: "After Hours",
    duration: "4:01",
    img: "../img/weeknd.jpg"
  },
  {
    title: "Blinding Lights",
    artist: "The Weeknd",
    album: "After Hours",
    duration: "3:20",
    img: "../img/weeknd.jpg"
  },
  {
    title: "In Your Eyes",
    artist: "The Weeknd",
    album: "After Hours",
    duration: "3:58",
    img: "../img/weeknd.jpg"
  },
  {
    title: "Save Your Tears",
    artist: "The Weeknd",
    album: "After Hours",
    duration: "3:36",
    img: "../img/weeknd.jpg"
  },
  {
    title: "Believer",
    artist: "Imagine Dragons",
    album: "Evolve",
    duration: "3:24",
    img: "../img/believer.jpg"
  },
  {
    title: "Whatever It Takes",
    artist: "Imagine Dragons",
    album: "Evolve",
    duration: "3:21",
    img: "../img/believer.jpg"
  },
  {
    title: "Thunder",
    artist: "Imagine Dragons",
    album: "Evolve",
    duration: "3:07",
    img: "../img/believer.jpg"
  },
  {
    title: "Walking The Wire",
    artist: "Imagine Dragons",
    album: "Evolve",
    duration: "3:55",
    img: "../img/believer.jpg"
  },
  {
    title: "Like Him",
    artist: "Chromakopia",
    album: "Chromakopia",
    duration: "4:10",
    img: "../img/chromakopia.jpg"
  },
  {
    title: "Let It Happen",
    artist: "Tame Impala",
    album: "Currents",
    duration: "7:46",
    img: "../img/currents.jpg"
  },
  {
    title: "Nangs",
    artist: "Tame Impala",
    album: "Currents",
    duration: "1:44",
    img: "../img/currents.jpg"
  }
];

// === FUNCTIONS ===

export function renderAlbums(containerSelector) {
  const container = document.querySelector(containerSelector);
  if (!container) return;

  container.innerHTML = "";

  createSearchBar(container.parentElement);

  // === LOOPS ===
  songs.forEach((song, index) => {
    const card = document.createElement("div");
    card.className = "album-card text-center p-3 rounded bg-dark";
    card.innerHTML = `
      <img src="${song.img}" alt="${song.title}" class="img-fluid rounded mb-2" style="width:150px">
      <h5 class="fw-bold">${song.title}</h5>
      <p class="text-muted">${song.artist}</p>
      <p>${song.duration}</p>
      <button class="btn btn-outline-light play-btn" data-index="${index}">
        <i class="bi bi-play-fill"></i>
      </button>
    `;
    container.appendChild(card);
  });

  // === EVENT LISTENERS (click) ===
  const buttons = container.querySelectorAll(".play-btn");
  buttons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const index = e.target.closest("button").dataset.index;
      playSong(index);
    });
  });
}

// === HELPER FUNCTIONS ===

// Запускает песню через глобальный плеер
function playSong(index) {
  const song = songs[index];
  const player = window.mySpotifyPlayer;

  if (!song) {
    console.warn("No song found for index", index);
    return;
  }

  if (player && typeof player.playSong === "function") {
    player.playSong(song);
  } else {
    console.error("Player not initialized yet");
    alert("Player not ready yet!");
  }
}

function createSearchBar(container) {
  const searchInput = document.createElement("input");
  searchInput.placeholder = "Search song...";
  searchInput.className = "form-control bg-dark text-light border-secondary my-3";

  container.prepend(searchInput);

  searchInput.addEventListener("keyup", (e) => {
    const query = e.target.value.toLowerCase();
    const filtered = songs.filter(
      (s) =>
        s.title.toLowerCase().includes(query) ||
        s.artist.toLowerCase().includes(query)
    );
    renderFiltered(filtered);
  });
}

function renderFiltered(filtered) {
  const container = document.querySelector("#all-songs");
  container.innerHTML = "";

  if (filtered.length === 0) {
    container.innerHTML = `<p class="text-center text-muted">No songs found</p>`;
    return;
  }

  filtered.forEach((song, index) => {
    const card = document.createElement("div");
    card.className = "album-card text-center p-3 rounded bg-dark";
    card.innerHTML = `
      <img src="${song.img}" alt="${song.title}" class="img-fluid rounded mb-2" style="width:150px">
      <h5 class="fw-bold">${song.title}</h5>
      <p class="text-muted">${song.artist}</p>
      <p>${song.duration}</p>
      <button class="btn btn-outline-light play-btn" data-index="${index}">
        <i class="bi bi-play-fill"></i>
      </button>
    `;
    container.appendChild(card);
  });

  container.querySelectorAll(".play-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const index = e.target.closest("button").dataset.index;
      playSong(index);
    });
  });
}
