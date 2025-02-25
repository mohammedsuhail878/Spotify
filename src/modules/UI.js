// Handles DOM manipulation
import { songs, } from "./data.js";
import { loadSong, pauseSong } from "./audioPlayer.js"; 
import { getSongIndex } from "./appstate.js";

const audioElement = document.querySelector('#audioElement');
const masterPlay = document.getElementById('masterPlay');
const myProgressBar = document.getElementById('myProgressBar');
const gif = document.getElementById('gif');
const coverPath = document.querySelectorAll('.coverPath');
const songName = document.querySelectorAll('.songName');
const songItemPlay = document.querySelectorAll('.songItemPlay');
const nextBtn = document.querySelector('.next-btn');
const previousBtn = document.querySelector('.previous-btn');
const masterSongName = document.querySelector('.masterSongName');

songs.forEach((song, i) => {
  coverPath[i].src = song.coverPath;
  songName[i].innerText = song.songName;
  });

const resetPlayIcons = () => {
    songItemPlay.forEach((button) => {
      button.classList.replace('fa-circle-pause', 'fa-circle-play');
    });
  };
  
  // Event Listeners
  songItemPlay.forEach((button, index) => {
    button.addEventListener('click', () => {
        resetPlayIcons();
      if (audioElement.paused || getSongIndex() !== index) {
        button.classList.replace('fa-circle-play', 'fa-circle-pause');
        loadSong(index);
      } else {
        pauseSong();
      }
    });
  });

  masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        loadSong(getSongIndex());
        }else {
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
  
export { audioElement, masterSongName, masterPlay, gif }