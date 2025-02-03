// Handles audio play, pause, next, etc.
import { songs } from "./data.js";
import { audioElement, songItemPlay, resetPlayIcons, masterSongName, masterPlay, gif } from './UI.js'; 
import { getSongIndex, setSongIndex } from './appstate.js';


songItemPlay.forEach((button, index) => {
  button.addEventListener('click', () => {
    const isPaused = audioElement.paused;
    resetPlayIcons();
    if (isPaused || getSongIndex() !== index) {
      button.classList.replace('fa-circle-play', 'fa-circle-pause');
      loadSong(index);
    } else {
      button.classList.replace('fa-circle-pause', 'fa-circle-play');
      pauseSong();
    }
  });
});

const playSong = () => { 
    audioElement.play();
    gif.style.opacity = 1;
    masterSongName.innerText = songs[getSongIndex()].songName;
  };
  
  // console.log("Current Index:", getSongIndex());
  // console.log("Is Audio Playing:", !audioElement.paused);

const pauseSong = () => {
    audioElement.pause();
    masterPlay.classList.replace('fa-circle-pause', 'fa-circle-play');
    gif.style.opacity = 0;
    masterSongName.innerText = "";
  };

const loadSong = (index) => {
    setSongIndex(index);
    audioElement.src = songs[getSongIndex()].filePath;
    audioElement.currentTime = 0;
    audioElement.addEventListener('canplay', () => {
      playSong();
    });
};
  // console.log(setSongIndex());

  // console.log(loadSong());

export { playSong, pauseSong, loadSong, }