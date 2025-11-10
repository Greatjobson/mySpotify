import { songs } from "./albumDisplay.js";

let currentIndex = -1;
let playerBarEl = null;
let fakeTimer = null;
let fakeCurrentTime = 0;
let isPlaying = false;

export function initPlayer(selector = "#player") {
  if (document.querySelector(".player-bar")) {
    playerBarEl = document.querySelector(".player-bar");
    return;
  }

  const container = document.querySelector(selector) || document.body;

  playerBarEl = document.createElement("div");
  playerBarEl.className = "player-bar player-fixed";
  playerBarEl.style.display = "none";

  playerBarEl.innerHTML = `
    <div class="player-info">
      <img src="" alt="cover" class="player-cover">
      <div class="player-text">
        <div class="player-title">Title</div>
        <div class="player-artist">Artist</div>
      </div>
    </div>

    <div class="player-controls">
      <button class="player-prev btn btn-link text-white opacity-75" title="Previous">
        <i class="bi bi-skip-start-fill fs-3"></i>
      </button>

      <button class="player-play-btn play-btn" title="Play/Pause">
        <i class="bi bi-play-fill"></i>
      </button>

      <button class="player-next btn btn-link text-white opacity-75" title="Next">
        <i class="bi bi-skip-end-fill fs-3"></i>
      </button>
    </div>

    <div class="player-duration">0:00 / 0:00</div>
  `;

  container.appendChild(playerBarEl);

  const playBtn = playerBarEl.querySelector(".player-play-btn");
  const prevBtn = playerBarEl.querySelector(".player-prev");
  const nextBtn = playerBarEl.querySelector(".player-next");

  playBtn.addEventListener("click", togglePlay);
  prevBtn.addEventListener("click", playPrev);
  nextBtn.addEventListener("click", playNext);

  window.mySpotifyPlayer = {
    playSong: (song) => loadSong(song)
  };
}

function showPlayer() {
  if (playerBarEl) playerBarEl.style.display = "flex";
}

function parseDuration(str) {
  if (!str) return 0;
  const [m, s] = str.split(":").map(Number);
  return m * 60 + s;
}

function formatTime(sec) {
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}

function updatePlayButton(playing) {
  const icon = playerBarEl.querySelector(".player-play-btn i");
  if (playing) {
    icon.classList.replace("bi-play-fill", "bi-pause-fill");
  } else {
    icon.classList.replace("bi-pause-fill", "bi-play-fill");
  }
}

function startFakeTimer(durationSec) {
  clearInterval(fakeTimer);
  fakeTimer = setInterval(() => {
    fakeCurrentTime++;
    const durationEl = playerBarEl.querySelector(".player-duration");
    const currentSong = songs[currentIndex];
    if (durationEl && currentSong) {
      durationEl.textContent = `${formatTime(fakeCurrentTime)} / ${currentSong.duration}`;
    }
    if (fakeCurrentTime >= durationSec) {
      clearInterval(fakeTimer);
      isPlaying = false;
      updatePlayButton(false);
      playNext();
    }
  }, 1000);
}

function loadSong(song) {
  const cover = playerBarEl.querySelector(".player-cover");
  const title = playerBarEl.querySelector(".player-title");
  const artist = playerBarEl.querySelector(".player-artist");
  const durationEl = playerBarEl.querySelector(".player-duration");

  currentIndex = songs.findIndex(s => s.title === song.title);
  if (currentIndex === -1) currentIndex = 0;

  cover.src = song.img || "";
  title.textContent = song.title;
  artist.textContent = song.artist;

  const durationSec = parseDuration(song.duration);
  durationEl.textContent = `0:00 / ${song.duration}`;

  clearInterval(fakeTimer);
  fakeCurrentTime = 0;
  isPlaying = true;

  updatePlayButton(true);
  showPlayer();
  startFakeTimer(durationSec);
}

function togglePlay() {
  const currentSong = songs[currentIndex];
  if (!currentSong) return;

  const durationSec = parseDuration(currentSong.duration);
  const durationEl = playerBarEl.querySelector(".player-duration");

  isPlaying = !isPlaying;
  updatePlayButton(isPlaying);

  if (isPlaying) {
    startFakeTimer(durationSec);
  } else {
    clearInterval(fakeTimer);
  }

  if (durationEl) {
    durationEl.textContent = `${formatTime(fakeCurrentTime)} / ${currentSong.duration}`;
  }
}

function playPrev() {
  if (!songs.length) return;
  currentIndex = (currentIndex - 1 + songs.length) % songs.length;
  loadSong(songs[currentIndex]);
}

function playNext() {
  clearInterval(fakeTimer);
  fakeCurrentTime = 0;
  if (!songs.length) return;
  currentIndex = (currentIndex + 1) % songs.length;
  loadSong(songs[currentIndex]);
}
