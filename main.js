const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');

function togglePlay() {
    const method = video.paused? 'play' : 'pause';
    video[method]();
    
    // if(video.paused){
    //     video.play();
    // } else {
    //     video.pause();
    // }
}
//Play video - 2 ways
video.addEventListener('click', togglePlay);
toggle.addEventListener('click', togglePlay);

//Change between play and pause
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);

function updateButton() {
    // const icon = this.paused ? '►' : '❚ ❚';
    // toggle.textContent = icon;
    if(toggle.textContent === '►') {
        toggle.textContent = '❚ ❚'
    } else {
         toggle.textContent = '►';
    }
}

//Fast forward or backward
function skip() {
    video.currentTime += parseFloat(this.dataset.skip);
}
skipButtons.forEach(button => {
    button.addEventListener('click', skip)
})

//Range update
function updateRange() {
    video[this.name] = this.value
}

ranges.forEach(range => range.addEventListener('change', updateRange));
ranges.forEach(range => range.addEventListener('mousemove', updateRange));

//Progress bar
function updateProgressbar() {
    const percent = (video.currentTime / video.duration) * 100;
    progressBar.style.flexBasis = `${percent}%`;
}

video.addEventListener('timeupdate', updateProgressbar);

//Scrub
function scrub(e) {
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
    console.log(e)
}

let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown =  false);


