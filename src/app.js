//Initialize the variable
let songIndex = 0;
let audioElement = new Audio('/songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let coverPath = document.querySelectorAll('.coverPath');
let songName = document.querySelectorAll('.songName');
let songItemPlay = document.querySelectorAll('.songItemPlay');
let nextbtn = document.querySelector('.next-btn');
let previousbtn = document.querySelector('.previous-btn');
let masterSongName = document.querySelector('.masterSongName');

let songs = [
    {
     songName: "Warriyo - Mortals", 
     filePath: "/songs/1.mp3", 
     coverPath: "/cover/1.jpg"
    },
    {
     songName: "Cielo", 
     filePath: "/songs/2.mp3", 
     coverPath: "/cover/2.jpg"
    },
    {
     songName: "DEAF KEV", 
     filePath: "/songs/3.mp3", 
     coverPath: "/cover/3.jpg"
    },
    {
     songName: "Different Haven", 
     filePath: "/songs/4.mp3", 
     coverPath: "/cover/4.jpg"
    },
];

// song Image and Name 
songs.forEach((song, i) => {
   coverPath[i].src = song.coverPath;
   songName[i].innerText = song.songName; 
});

const playSong = () => {
    audioElement.play();
    masterPlay.classList.replace('fa-circle-play', 'fa-circle-pause');
    gif.style.opacity = 1
    masterSongName.innerText = songs[songIndex].songName;
};  

const pauseSong = () => {
    audioElement.pause();
    masterPlay.classList.replace('fa-circle-pause', 'fa-circle-play');
    gif.style.opacity = 0;
    masterSongName.innerText = " ";
    myProgressBar.value = 0;
};

// Reset songItemPlay-btns
const resetPlayIcons = () => {
    songItemPlay.forEach((button) => {
        button.classList.replace('fa-circle-pause', 'fa-circle-play');
    });
};

loadSong = (index) => {
    songIndex = index;
    audioElement.src = songs[songIndex].filePath;
    audioElement.currentTime = 0;
    playSong();
};

songItemPlay.forEach((button, index) => {
    button.addEventListener('click', () => {
       const isPaused = audioElement.paused;
       resetPlayIcons();
       if(isPaused || songIndex !== index){
            button.classList.replace('fa-circle-play', 'fa-circle-pause');
            loadSong(index);
        }else {
            pauseSong();
        };
    });
});

masterPlay.addEventListener('click', () => {
    if(audioElement.paused || audioElement.currentTime <= 0){
        playSong();
    }else {
        pauseSong();
    };
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

nextbtn.addEventListener('click', () => {
    const nextSong = (songIndex + 1) % songs.length;
    loadSong(nextSong);
});

previousbtn.addEventListener('click', () => {
    const preSong = (songIndex - 1 + songs.length) % songs.length;
    loadSong(preSong);
});



