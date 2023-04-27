'use strict';

// Timer elements
const timer = document.querySelector('.timer'),
      timerNumbers = timer.querySelectorAll('#timer_numbers div'),
      timerButtons = timer.querySelectorAll('#timer_arrows div div'),
      timerConfirm = document.querySelector('#timer_confirm'),
      timerPause = document.querySelector('#timer_pause'),
      timerContinue = document.querySelector('#timer_continue'),
      timerStop = document.querySelector('#timer_stop');

// Alarm sound
let alarm = new Audio('alarm.mp3');

// Indicates if timer is paused or running
let paused = true;

// Actual time values on timer
const time = {
    hours: 0,
    minutes: 0,
    seconds: 0
};

// Function that sends time values on screen
function refreshScreen () {
    timerNumbers[0].innerHTML = time.hours;
    timerNumbers[1].innerHTML = time.minutes;
    timerNumbers[2].innerHTML = time.seconds;
}

// Function that resets timer values
function reset () {
    time.hours = 0;
    time.minutes = 0;
    time.seconds = 0;
    refreshScreen();
}

// Function that allows user input time values
function timerInput () {
    timerButtons.forEach((btn, i) => {
        let a = '';

        // Function that changes number
        const changeNum = () => {
            if (i == 0 && time.hours > 0) {
                time.hours--;
                refreshScreen();
            } else if (i == 1 && time.hours < 60) {
                time.hours++;
                refreshScreen();
            } else if (i == 2 && time.minutes > 0) {
                time.minutes--;
                refreshScreen();
            } else if (i == 3 && time.minutes < 60) {
                time.minutes++;
                refreshScreen();
            } else if (i == 4 && time.seconds > 0) {
                time.seconds--;
                refreshScreen();
            } else if (i == 5 && time.seconds < 60) {
                time.seconds++;
                refreshScreen();
            } else if (i == 0 && time.hours == 0) {
                time.hours = 60;
                refreshScreen();
            } else if (i == 2 && time.minutes == 0) {
                time.minutes = 60;
                refreshScreen();
            } else if (i == 4 && time.seconds == 0) {
                time.seconds = 60;
                refreshScreen();
            } else if (i == 1 && time.hours == 60) {
                time.hours = 0;
                refreshScreen();
            } else if (i == 3 && time.minutes == 60) {
                time.minutes = 0;
                refreshScreen();
            } else if (i == 5 && time.seconds == 60) {
                time.seconds = 0;
                refreshScreen();
            }
        };

        // While holding button
        btn.addEventListener('mousedown', () => {
            a = setInterval(changeNum, 90);
        });

        btn.addEventListener('mouseup', () => {
            clearInterval(a);
        });
        
        // While pointer is out of button (bug )
        btn.addEventListener('mouseleave', () => {
            clearInterval(a);
        })

        // While pressing button
        btn.addEventListener('click', () => {
            changeNum();
        });
    });
};

// Functions that counts time left
function counting () {
        let a = setInterval(function() {
            if (time.hours == 0 && time.minutes == 0 && time.seconds == 0) {
                alarm.play();
                setTimeout(() => {
                    alarm.load();
                    clearInterval(a);
                }, 4000);
                timerConfirm.style.display = 'flex';
                timerPause.style.display = 'none';
            } else if (time.seconds == 0 && time.minutes != 0) {
                time.minutes--;
                time.seconds = 59;
            } else if (time.seconds == 0 && time.minutes == 0){
                time.hours--;
                time.minutes = 59;
                time.seconds = 59;
            } else {
                time.seconds--;
            }

            refreshScreen();
        }, 1000);

        // Puts timer on pause
        timerPause.addEventListener('click', () => {
            if (!paused) {
                clearInterval(a);
                timerPause.style.display = 'none';
                timerContinue.style.display = 'flex';
            }
        });

        // Stops and resets timer
        timerStop.addEventListener('click', () => {
            clearInterval(a);
            timerPause.style.display = 'none';
            timerStop.style.display = 'none';
            timerConfirm.style.display = 'flex';
            reset();
            refreshScreen();
        });
}

// Starts timer
timerConfirm.addEventListener('click', () => {
    counting();
    paused = false;
    timerConfirm.style.display = 'none';
    timerPause.style.display = 'flex';
    timerStop.style.display = 'flex';
});

// Continues timer after pause
timerContinue.addEventListener('click', () => {
    counting();
    paused = false;
    timerPause.style.display = 'flex';
    timerContinue.style.display = 'none';
});

// Called funcions
timerInput();
