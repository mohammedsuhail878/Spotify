// Handles audio play, pause, next, etc.
import { songs } from "./data.js";
import { audioElement, masterSongName, masterPlay, gif } from './UI.js'; 
import { getSongIndex, setSongIndex,  } from './appstate.js';

const playSong = () => { 
    audioElement.play();
    masterPlay.classList.replace('fa-circle-play', 'fa-circle-pause');
    gif.style.opacity = 1;
    masterSongName.innerText = songs[getSongIndex()].songName;
  };

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
    playSong();
};

export {pauseSong, loadSong, }