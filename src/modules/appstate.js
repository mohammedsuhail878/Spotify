// state managment

let songIndex = 0; // Ensure default value

const getSongIndex = () => {
    return songIndex;
};

const setSongIndex = (currentIndex) => {
    songIndex = currentIndex
};

export { getSongIndex, setSongIndex, };