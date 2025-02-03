// state managment

export { getSongIndex, setSongIndex };

// let songIndex = 0;

// const setSongIndex = (currentIndex) => {
//     songIndex = currentIndex;
// }; 
// const getSongIndex = () => songIndex;

// let songIndex = 0;  // Ensure it has a default value
// const getSongIndex = () => {
//     console.log("getSongIndex() called, returning:", songIndex);
//     return songIndex;
// };

// const setSongIndex = (currentIndex) => {
//     console.log("setSongIndex() called with:", currentIndex);
//     songIndex = currentIndex;
// };

let songIndex = 0; // Ensure default value

const getSongIndex = () => {
    // console.log("getSongIndex() called, returning:", songIndex);
    return songIndex;
};

const setSongIndex = (currentIndex) => {
    if (typeof currentIndex !== "number" || isNaN(currentIndex)) {
        console.error("Error: setSongIndex() called with invalid value:", currentIndex);
        return;
    }
    
    console.log("setSongIndex() called with:", currentIndex);
    songIndex = currentIndex;
};
