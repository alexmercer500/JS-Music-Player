
// audio sorce and volume assignment on top

let gaana = new Audio('/src/Unknown.mp3')
gaana.volume = 0.2;

// Theme Selection for Audio Player;

const themeSelector = document.querySelector('.theme-sel');

themeSelector.addEventListener('change', () => {
    
    let currentTheme = themeSelector.value;

    switch (currentTheme) {
        case themeSelector[0].value:
            document.body.classList.remove('theme-two', 'theme-three', 'theme-four') // Theme one
            break;

        case themeSelector[1].value:
            document.body.classList.add('theme-two')
            document.body.classList.remove('theme-three', 'theme-four') // Theme Two
            break;

        case themeSelector[2].value:
            document.body.classList.add('theme-three')
            document.body.classList.remove('theme-two', 'theme-four') // Theme Three
            break;

        case themeSelector[3].value:
            document.body.classList.add('theme-four')
            document.body.classList.remove('theme-two', 'theme-three') // Theme Four
            break;
        default:
            break;
    }
})

// Play, Pause, stop song and song progress bar slectors------>
let newSong = document.getElementById('play-song');
const stopBtn = document.getElementById('stop-song');
const progressBar = document.querySelector('.seek-bar');
const get = document.querySelector('.time-ups');

// volume control sections------>
const volUp = document.querySelector('.vol-up');   // Volume Increase
const volDown = document.querySelector('.vol-down') // Volume Deacrease
const volBar = document.getElementById('vol-bar'); // Volume Bar

// Cover-Art and Styling selector------>
const coverArt = document.getElementById('coverArt');
const musicStyle = document.querySelector('.art-sec');


// Song Stop or end function here----->
function gannaEnd() {
    gaana.pause();
    gaana.currentTime = 0;
    coverArt.style.animationPlayState = 'paused';
    coverArt.style.animationIterationCount = 0;
}

// Song PLay/Pause and stopToggle--------->
newSong.addEventListener('click', () => {
    gaana.paused ? gaana.play() : gaana.pause();
    gaana.paused ? coverArt.style.animationPlayState = 'paused' : coverArt.style.animationPlayState = 'running';

    if (gaana.played) {
        coverArt.style.animationIterationCount = 'infinite';
    }
})

stopBtn.addEventListener('click', () => {
    gannaEnd();
})

// On Song Time update ----- Time Update, Progress Bar Update----------->
gaana.addEventListener('timeupdate', () => {
    progressBar.setAttribute('max', gaana.duration)
    progressBar.value = gaana.currentTime;
    progressBar.style.backgroundImage = `linear-gradient( to right,
        var(--style-color) ${((gaana.currentTime / gaana.duration) * 100)}%, 
        #fff ${((gaana.currentTime / gaana.duration) * 100)}% )`

    //to Display current duration of song------>
    let mm = Math.floor((gaana.currentTime / 60));
    let ss = Math.floor((gaana.currentTime % 60));
    get.innerText = `${mm}m:${ss}s`

    //Behind Cover Art style -------->
    musicStyle.style.backgroundImage = `conic-gradient(var(--style-color) 
        ${((gaana.currentTime / gaana.duration) * 100)}%,
         #fff ${((gaana.currentTime / gaana.duration) * 100)}% )`

    // Song End---->
    if (gaana.currentTime >= gaana.duration) {
        gannaEnd();
    }
})

progressBar.addEventListener('input', () => {
    gaana.currentTime = progressBar.value;
})


//volume control section------------->

//volume Bar update on volume update function here----->
function volBarCtrl() {
    volBar.style.backgroundImage = `
        linear-gradient( to right, var(--style-color) 
        ${gaana.volume * 100}%, 
        #fff ${gaana.volume * 100}% )`
}

volUp.addEventListener('click', () => {
    gaana.volume < 1 ? gaana.volume += 0.1 : gaana.volume = 1
    volBar.value = gaana.volume * 10;
    volBarCtrl();
})

volDown.addEventListener('click', () => {
    gaana.volume >= 0 ? gaana.volume -= 0.1 : gaana.volume = 0;
    volBar.value = gaana.volume * 10
    volBarCtrl();
})

volBarCtrl();
volBar.addEventListener('input', () => {
    gaana.volume = volBar.value / 10;
    volBarCtrl();
})
