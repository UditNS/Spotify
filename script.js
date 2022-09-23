// Variables

let songIndex = 0;
let audioElement = new Audio("songs/0.mp3");
let masterplay = document.getElementById("masterPlay");
let masterpause = document.getElementById("masterPause");
let progressBar = document.getElementById("music-range");
let currentT = document.getElementById("currentTime");
let smPlay = document.querySelector(".songPlay");
let smPause = document.querySelector(".songPause");
let bottomSong = document.querySelector("#bottom_name");
let duration = document.querySelector("duration");
let songLive = false;

// BUGS
// 1. Their is a pause problem in the card. You can play songs from card but cannot stop from their.  (SOLVED)
// 2. You cannot use spacebar for pause. Even cannot forward and backward function with Key.
// 3. Their is no audio current duration and total duration.
// 4. No autoplay

let songs = [
  {
    song: "One Kiss",
    songPath: "songs/one_kiss.mp3",
    coverPath: "covers/one_kiss.jpg",
  },
  {
    song: "Levitating",
    songPath: "songs/1.mp3",
    coverPath: "covers/levitating.jpeg",
  },
  { song: "Pink Venom", songPath: "songs/2.mp3", coverPath: "covers/pv2.jpeg" },
  { song: "DDU-DU-DDU-DU", songPath: "songs/3.mp3", coverPath: "covers/3.jpg" },
  { song: "Unstoppable", songPath: "songs/4.mp3", coverPath: "covers/4.jpg" },
  { song: "BTS Butter", songPath: "songs/5.mp3", coverPath: "covers/5.jpg" },
  {
    song: "Kill This Love",
    songPath: "songs/6.mp3",
    coverPath: "covers/6.jpg",
  },
  { song: "New Rules", songPath: "songs/7.mp3", coverPath: "covers/7.jpg" },
  {
    song: "How You Like That",
    songPath: "songs/8.mp3",
    coverPath: "covers/8.jpg",
  },
  { song: "Infinity", songPath: "songs/9.mp3", coverPath: "covers/9.jpg" },
  {
    song: "BTS Dynamite",
    songPath: "songs/10.mp3",
    coverPath: "covers/10.jpg",
  },
];

// Pause function
function pause() {
  audioElement.pause();
  masterplay.classList.remove("hidden");
  masterpause.classList.add("hidden");
}
// Play function
function play() {
  audioElement.play();
  masterplay.classList.add("hidden");
  masterpause.classList.remove("hidden");
}

// Play/Pause event
masterplay.addEventListener("click", () => {
  if (audioElement.paused || audioElement.currentTime <= 0) {
    play();
  }
});
masterpause.addEventListener("click", pause);

// time update
audioElement.addEventListener("timeupdate", () => {
  // Update bar
  progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
  progressBar.value = progress;
  // change in progressBar with change in movement
  progressBar.addEventListener("change", () => {
    audioElement.currentTime =
      (progressBar.value * audioElement.duration) / 100;
  });
});

function makeAllPlay() {
  Array.from(document.getElementsByClassName("songPlay")).forEach((element) => {
    element.classList.add("fa-pause");
    element.classList.add("fa-play");
  });
}

Array.from(document.getElementsByClassName("songPlay")).forEach((element) => {
  element.addEventListener("click", (e) => {
    if (e.target.classList[6] == "fa-play") {
      makeAllPlay();
      songIndex = parseInt(e.target.id);
      let con = e.target.classList[6];
      e.target.classList.add("fa-pause");
      e.target.classList.remove("fa-play");
      audioElement.src = `songs/${songIndex}.mp3`;
      bottomSong.innerText = songs[songIndex].song;
      audioElement.currentTime = 0;
      audioElement.play();
      masterpause.classList.remove("hidden");
      masterplay.classList.add("hidden");
      songLive = true;
    } else if (songLive === true && e.target.classList[6] == "fa-pause") {
      songIndex = parseInt(e.target.id);
      e.target.classList.add("fa-play");
      e.target.classList.remove("fa-pause");
      // audioElement.src = `songs/${songIndex}.mp3`;
      // bottomSong.innerText = songs[songIndex].song;
      audioElement.pause();
      masterpause.classList.add("hidden");
      masterplay.classList.remove("hidden");
      songLive = false;
    }
  });
});

document.getElementById("forward").addEventListener("click", () => {
  if (songIndex >= 10) {
    songIndex = 0;
  } else {
    songIndex += 1;
  }
  audioElement.src = `songs/${songIndex}.mp3`;
  bottomSong.innerText = songs[songIndex].song;
  audioElement.currentTime = 0;
  audioElement.play();
  masterpause.classList.remove("hidden");
  masterplay.classList.add("hidden");
});

document.getElementById("previous").addEventListener("click", () => {
  if (songIndex <= 0) {
    songIndex = 0;
  } else {
    songIndex -= 1;
  }
  audioElement.src = `songs/${songIndex}.mp3`;
  bottomSong.innerText = songs[songIndex].song;

  audioElement.currentTime = 0;
  audioElement.play();
  masterpause.classList.remove("hidden");
  masterplay.classList.add("hidden");
});
