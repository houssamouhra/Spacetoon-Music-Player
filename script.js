const image = document.querySelector("img");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const music = document.querySelector("audio");
const progressContainer = document.getElementById("progress-container");
const progress = document.getElementById("progress");
const currentTimeEl = document.getElementById("current-time");
const durationEl = document.getElementById("duration");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const playBtn = document.getElementById("play");

// Music
const songs = [
  {
    name: "one piece",
    displayName: "One Piece",
    artist: "spacetoon",
  },
  {
    name: "naruto",
    displayName: "Naruto",
    artist: "spacetoon",
  },
  {
    name: "friendz",
    displayName: "عهد الأصدقاء",
    artist: "spacetoon",
  },
  {
    name: "Blazing teens",
    displayName: "Blazing Teens",
    artist: "spacetoon",
  },
  {
    name: "dragon ballz",
    displayName: "Dragon Ball Z",
    artist: "spacetoon",
  },
  {
    name: "peace maker",
    displayName: "صانع السلام",
    artist: "spacetoon",
  },
  {
    name: "hunterxhunter",
    displayName: "القناص",
    artist: "spacetoon",
  },
  {
    name: "conan",
    displayName: "Conan",
    artist: "spacetoon",
  },
  {
    name: "fire blade",
    displayName: "سيف النار",
    artist: "spacetoon",
  },
  {
    name: "recca",
    displayName: "شعلة ريكا",
    artist: "spacetoon",
  },
  {
    name: "noble fighter",
    displayName: "المقاتل النبيل",
    artist: "spacetoon",
  },
];

// Check if Playing
let isPlaying = false;

// Play
const playSong = function () {
  isPlaying = true;
  playBtn.classList.replace("fa-play", "fa-pause");
  playBtn.setAttribute("title", "Pause");
  music.play();
};

// Pause
const pauseSong = function () {
  isPlaying = false;
  playBtn.classList.replace("fa-pause", "fa-play");
  playBtn.setAttribute("title", "Play");
  music.pause();
};

// Event Listener
playBtn.addEventListener("click", () => (isPlaying ? pauseSong() : playSong()));

// Update DOM
const loadSong = function (song) {
  title.textContent = song.displayName;
  artist.textContent = song.artist;
  music.src = `music/${song.name}.mp3`;
  image.src = `img/${song.name}.jpg`;
};

// Current Song
let songIndex = 0;

// Next Song
const prevSong = function () {
  songIndex--;
  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }
  loadSong(songs[songIndex]);
  playSong();
};

// Next Song
const nextSong = function () {
  songIndex++;
  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }
  loadSong(songs[songIndex]);
  playSong();
};

// On Load - Select First Song
loadSong(songs[songIndex]);

// Update Progress Bar & Time
const updateProgressBar = function (e) {
  if (isPlaying) {
    const { duration, currentTime } = e.srcElement;
    // Update progress bar width
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;
    // Calculate display for duration
    const durationMinutes = Math.floor(duration / 60);
    let durationSeconds = Math.floor(duration % 60);
    if (durationSeconds < 10) {
      durationSeconds = `0${durationSeconds}`;
    }
    // Delay switching duration Element to avoid NaN
    if (durationSeconds) {
      durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
    }
    // Calculate display for current
    const currentMinutes = Math.floor(currentTime / 60);
    let currentSeconds = Math.floor(currentTime % 60);
    if (currentSeconds < 10) {
      currentSeconds = `0${currentSeconds}`;
    }
    currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`;
  }
};

// Set Progress Bar
const setProgressBar = function (e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const { duration } = music;
  music.currentTime = (clickX / width) * duration;
};

// Event Listeners
prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);
music.addEventListener("ended", nextSong);
music.addEventListener("timeupdate", updateProgressBar);
progressContainer.addEventListener("click", setProgressBar);
