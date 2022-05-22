let music = document.querySelectorAll('.music');
let audio = document.querySelector('audio');
// let active = document.querySelector('.music');
let currentTime = document.querySelector('.text');
let playBtn = document.querySelector('.fa-play');
let previousBtn = document.querySelector('.fa-angle-left');
let nextBtn = document.querySelector('.fa-angle-right');
let pauseBtn = document.querySelector('.fa-pause');
let progressBar = document.querySelector('.progress-bar');

for (let i = 0; i < music.length; i++) {
    const m = music[i];
    m.addEventListener('click', start);
}

function start(e){
    for (let i = 0; i < music.length; i++) {
        const a = music[i];
        a.classList.remove('list-group-item-success');
    }
    e.target.classList.add('list-group-item-success');
    let SrcName = 'music/' + e.target.id;
    audio.src = SrcName;
    audio.play();
    pauseBtn.style.display = 'block';
    playBtn.style.display = 'none';
}

///////play pause previous next button
playBtn.addEventListener('click', playM);
pauseBtn.addEventListener('click', pauseM);
previousBtn.addEventListener('click', priviousM);
nextBtn.addEventListener('click', nextM);


function playM(){
    audio.play();
    pauseBtn.style.display = 'block';
    playBtn.style.display = 'none';
}

function pauseM(){
    audio.pause();
    pauseBtn.style.display = 'none';
    playBtn.style.display = 'block';

}

let activeId, musicId;
function priviousM(){
    musicId = audio.src;
    musicId = musicId.substring(28,30);
    musicId = +musicId;
    musicId = musicId > 1 ? musicId -1: musicId;
    musicId = musicId < 10 ? "music/" + "0" + musicId + ".mp3":'music/' +  musicId + '.mp3';
    activeId = musicId.substring(6,12);
    for (let i = 0; i < music.length; i++) {
        const a = music[i];
        a.classList.remove('list-group-item-success');
    }
    document.getElementById(`${activeId}`).classList.add('list-group-item-success');
    audio.src = musicId;
    audio.play();
}
function nextM(){
    musicId = audio.src;
    musicId = musicId.substring(28,30);
    musicId = +musicId;
    musicId = musicId < music.length ? musicId + 1: musicId;
    musicId = musicId < 10 ? "music/" + "0" + musicId + ".mp3":'music/' +  musicId + '.mp3';
    activeId = musicId.substring(6,12);
    for (let i = 0; i < music.length; i++) {
        const a = music[i];
        a.classList.remove('list-group-item-success');
    }
    document.getElementById(`${activeId}`).classList.add('list-group-item-success');
    audio.src = musicId;
    audio.play();
}
////////////////////////////

////// duration and current time
audio.addEventListener('loadeddata', durationOfMusic);
audio.addEventListener('timeupdate', currentTimeOfMusic);
let duration, durationM, durationS, currentTimeOfMTotal, currentTimeOfMM, currentTimeOfMS, progressPercent;
progressPercent = 0;

function durationOfMusic(){
    duration = Math.floor(audio.duration);
    durationM = Math.floor(duration/60);
    durationS = duration%60;

    durationS = durationS < 10 ? '0' + durationS: durationS;
}
function currentTimeOfMusic(){
    currentTimeOfMTotal = Math.floor(audio.currentTime);
    currentTimeOfMM = Math.floor(currentTimeOfMTotal/60);
    currentTimeOfMS = currentTimeOfMTotal%60;

    progressPercent = progressPercent === 0? progressPercent + (100/345): (100/345) * currentTimeOfMTotal;
    progressBar.style.width = progressPercent + '%';

    currentTimeOfMS = currentTimeOfMS < 10? '0' + currentTimeOfMS: currentTimeOfMS;

    currentTime.textContent = `${currentTimeOfMM}:${currentTimeOfMS} / ${durationM}:${durationS}`
}


// currentTime.textContent = duration;
