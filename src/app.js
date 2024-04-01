const hoursElement = document.querySelector('#hours');
const minutesElement = document.querySelector('#minutes');
const secondsElement = document.querySelector('#seconds');

const hoursPut = document.querySelector('#hours-put');
const minutesPut = document.querySelector('#minutes-put');
const secondsPut = document.querySelector('#seconds-put');

const startTimer = document.querySelector('#start-timer');

//
let time;
let timerInterval;

const updateTimer = () => {
    if (time) {
        const differenceInSeconds = Math.floor(time - Date.now()) / 1000;
        if (differenceInSeconds < 1) {
            clearInterval(timerInterval);
        }

        const hours = Math.floor(differenceInSeconds / 3600);
        const minutes = Math.floor(differenceInSeconds / 60) % 60;
        const seconds = Math.floor(differenceInSeconds % 60);

        hoursPut.textContent = `${hours} hours`;
        minutesPut.textContent = `${minutes} minutes`;
        secondsPut.textContent = `${seconds} seconds`;
    }
}

startTimer.addEventListener('click', () => {
    clearInterval(timerInterval);
    const futureHours = parseInt(hoursElement.value);
    const futureMinutes = parseInt(minutesElement.value);
    const futureSeconds = parseInt(secondsElement.value);

    const date = new Date();
    const currentHours = date.getHours();
    const currentMinutes = date.getMinutes();
    const currentSeconds = date.getSeconds();

    date.setHours(currentHours + futureHours);
    date.setMinutes(futureMinutes + currentMinutes);
    date.setSeconds(currentSeconds + futureSeconds);

    time = date.getTime();
    localStorage.setItem('targetTime', targetTime);
    updateTimer();
    timerInterval = setInterval(updateTimer, 500);
});


const storedTargetTime = localStorage.getItem('targetTime');

if (storedTargetTime) {
    time = storedTargetTime;
    updateTimer();
    timerInterval = setInterval(updateTimer, 500);
}