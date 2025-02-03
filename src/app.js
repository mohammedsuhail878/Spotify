import { songs } from './modules/data.js';
import { playSong, pauseSong, loadSong } from './modules/audioPlayer.js';

// Initialize Variables
let songIndex = 0;
const audioElement = new Audio('/songs/1.mp3');
const masterPlay = document.getElementById('masterPlay');
const myProgressBar = document.getElementById('myProgressBar');
const gif = document.getElementById('gif');
const coverPath = document.querySelectorAll('.coverPath');
const songName = document.querySelectorAll('.songName');
const songItemPlay = document.querySelectorAll('.songItemPlay');
const nextBtn = document.querySelector('.next-btn');
const previousBtn = document.querySelector('.previous-btn');
const masterSongName = document.querySelector('.masterSongName');

// const songs = [
//   { songName: "Warriyo - Mortals", filePath: "/songs/1.mp3", coverPath: "/cover/1.jpg" },
//   { songName: "Cielo", filePath: "/songs/2.mp3", coverPath: "/cover/2.jpg" },
//   { songName: "DEAF KEV", filePath: "/songs/3.mp3", coverPath: "/cover/3.jpg" },
//   { songName: "Different Haven", filePath: "/songs/4.mp3", coverPath: "/cover/4.jpg" },
// ];

// Initialize UI
songs.forEach((song, i) => {
  coverPath[i].src = song.coverPath;
  songName[i].innerText = song.songName;
});

// Utility Functions
// const playSong = () => {
//   audioElement.play();
//   masterPlay.classList.replace('fa-circle-play', 'fa-circle-pause');
//   gif.style.opacity = 1;
//   masterSongName.innerText = songs[songIndex].songName;
// };

// const pauseSong = () => {
//   audioElement.pause();
//   masterPlay.classList.replace('fa-circle-pause', 'fa-circle-play');
//   gif.style.opacity = 0;
//   masterSongName.innerText = "";
// };

const resetPlayIcons = () => {
  songItemPlay.forEach((button) => {
    button.classList.replace('fa-circle-pause', 'fa-circle-play');
  });
};

// const loadSong = (index) => {
//   songIndex = index;
//   audioElement.src = songs[songIndex].filePath;
//   audioElement.currentTime = 0;
//   playSong();
// };

// Event Listeners
songItemPlay.forEach((button, index) => {
  button.addEventListener('click', () => {
    const isPaused = audioElement.paused;
    resetPlayIcons();
    if (isPaused || songIndex !== index) {
      button.classList.replace('fa-circle-play', 'fa-circle-pause');
      loadSong(index);
    } else {
      pauseSong();
    }
  });
});

masterPlay.addEventListener('click', () => {
  if (audioElement.paused || audioElement.currentTime <= 0) {
    playSong();
  } else {
    pauseSong();
  }
});

myProgressBar.addEventListener('change', () => {
  audioElement.currentTime = (myProgressBar.value * audioElement.duration) / 100;
});

audioElement.addEventListener('timeupdate', () => {
  const progress = (audioElement.currentTime / audioElement.duration) * 100;
  myProgressBar.value = progress || 0;
});

audioElement.addEventListener('ended', () => {
  resetPlayIcons();
  pauseSong();
});

nextBtn.addEventListener('click', () => {
  const nextIndex = (songIndex + 1) % songs.length;
  loadSong(nextIndex);
});

previousBtn.addEventListener('click', () => {
  const prevIndex = (songIndex - 1 + songs.length) % songs.length;
  loadSong(prevIndex);
});
