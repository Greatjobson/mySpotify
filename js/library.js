import { songs } from "./albumDisplay.js";

export function renderLibrary(containerSelector) {
  const tbody = document.querySelector(containerSelector);
  if (!tbody) return;

  tbody.innerHTML = "";

  songs.forEach((song, index) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>
        <div class="position-relative d-inline-block">
          <span class="library-track-number">${index + 1}</span>
          <button class="library-play-btn play-btn" data-index="${index}">
            <i class="bi bi-play-fill"></i>
          </button>
        </div>
      </td>
      <td>
        <img src="${song.img}" alt="${song.title}" class="library-cover">
      </td>
      <td>
        <div class="library-title">${song.title}</div>
      </td>
      <td>
        <div class="library-artist">${song.artist}</div>
      </td>
      <td class="text-center">
        <span class="library-duration">${song.duration}</span>
      </td>
    `;
    tbody.appendChild(tr);
  });

  tbody.querySelectorAll(".library-play-btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
      const index = parseInt(e.currentTarget.dataset.index);
      const song = songs[index];
      window.mySpotifyPlayer.playSong(song);
    });
  });
}
