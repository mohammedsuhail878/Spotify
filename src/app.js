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
    {songName: "Warriyo - Mortals", failePath: "/songs/1.mp3", coverPath: "/cover/1.jpg"},
    {songName: "Cielo", failePath: "/songs/2.mp3", coverPath: "/cover/2.jpg"},
    {songName: "DEAF KEV", failePath: "/songs/3.mp3", coverPath: "/cover/3.jpg"},
    {songName: "Different Haven", failePath: "/songs/4.mp3", coverPath: "/cover/4.jpg"},
]

songs.forEach((element, i) => {
    coverPath[i].src = element.coverPath;
    songName[i].innerText = element.songName;
});

// const rePuse = ()=>{
//     songItemPlay.forEach((element)=>{
//         element.addEventListener('click', ()=>{
//             element.classList.remove('fa-circle-pause');
//             element.classList.add('fa-circle-play');
//         })
//     })
// } 

// Nodelist doesn't have function, use forEach for songItemPlay because it returns NodeList.
songItemPlay.forEach((element)=>{
    let currentPlay = null;

        // Toggle play/pause for the clicked button
        element.addEventListener('click', ()=>{
            // pause            play        
            // Pause the currently playing song if it's not the same as the clicked one   
        // if(currentPlay && currentPlay !== element){ 
        //     currentPlay.classList.add('fa-circle-play');
        //     currentPlay.classList.remove('fa-circle-pause');
        //     console.log(currentPlay);
        // } 
        // currentPlay variable stores a reference to the button element of the currently playing song.
            currentPlay = element;
            // console.log('Current Playing (After):', currentPlay);
            
                const songPlayId = parseInt(element.id);
                // const adjustedSongId = parseInt(element.id) +1;
                const adjustedSongId = songPlayId + 1;

                    if(audioElement.paused){
                        audioElement.src = `/songs/${adjustedSongId}.mp3`;
                        audioElement.currentTime = 0;
                        audioElement.play();
                         if(adjustedSongId >=0 && adjustedSongId <= songs.length){
                            const currentSongName = songs[songPlayId]?.songName;
                            if(currentSongName) {
                                masterSongName.innerText = currentSongName;
                                songIndex = songPlayId;
                            }}
                        element.classList.remove('fa-circle-play');
                        element.classList.add('fa-circle-pause');
                        masterPlay.classList.remove('fa-circle-play');
                        masterPlay.classList.add('fa-circle-pause');
                        gif.style.opacity = 1;
                    }else {
                        audioElement.pause();
                        masterSongName.innerText = " ";
                        element.classList.remove('fa-circle-pause');
                        element.classList.add('fa-circle-play');
                        masterPlay.classList.remove('fa-circle-pause');
                        masterPlay.classList.add('fa-circle-play');
                        gif.style.opacity = 0;
                    }               
    })
})

// Handle Play/Pause button
    masterPlay.addEventListener('click', ()=>{
        if(audioElement.paused || audioElement.currentTime<=0){
            audioElement.play();   
            if(songIndex !== undefined){
                masterSongName.innerText = songs[songIndex]?.songName;
            }
            masterSongName.innerText = songs[songIndex].songName;
            masterPlay.classList.remove('fa-circle-play');
            masterPlay.classList.add('fa-circle-pause');
            gif.style.opacity = 1;
            
        }else {
            audioElement.pause();
            masterSongName.innerText = " ";
            masterPlay.classList.add('fa-circle-play');
            masterPlay.classList.remove('fa-circle-pause');
            gif.style.opacity = 0;
        }
    })

    audioElement.addEventListener('timeupdate', ()=>{
        //update seekBar
        progress = parseInt((audioElement.currentTime/audioElement.duration)* 100); // percentage value
        myProgressBar.value = progress
    })

    myProgressBar.addEventListener('change', ()=>{
        audioElement.currentTime = myProgressBar.value* audioElement.duration/100; // current value (myProgressBar.value is percentage)
    })

    nextbtn.addEventListener('click', ()=>{
        songIndex = (songIndex + 1) % songs.length;
                audioElement.src = `/songs/${songIndex+1}.mp3`;
                masterSongName.innerText = songs[songIndex].songName;
                audioElement.currentTime = 0;
                audioElement.play();
                masterPlay.classList.remove('fa-circle-play');
                masterPlay.classList.add('fa-circle-pause');
                gif.style.opacity = 1;
    })

    previousbtn.addEventListener('click', ()=>{
        if(songIndex<=0){
            songIndex = 0
        }else {
            songIndex -= 1; 
        }
                audioElement.src = `/songs/${songIndex+1}.mp3`;
                masterSongName.innerText = songs[songIndex].songName;
                audioElement.currentTime = 0;
                audioElement.play();
                masterPlay.classList.remove('fa-circle-play');
                masterPlay.classList.add('fa-circle-pause');
                gif.style.opacity = 1;
    })

    // Reset all
    audioElement.addEventListener('ended', () => {
        myProgressBar.value = 0;
        gif.style.opacity = 0;
        masterPlay.classList.remove('fa-circle-pause');
        masterPlay.classList.add('fa-circle-play');
    });
    


