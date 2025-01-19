let timerInterval;
let isPaused = false;
let totalSeconds = 0;
let initialTime = "";
let ringtone;

document.getElementById("start-btn").addEventListener("click", function () {
    const startBtn = document.getElementById("start-btn");

    if (startBtn.textContent === "Start Timer") {
        
        let hours = parseInt(document.getElementById("hours").value) || 0;
        let minutes = parseInt(document.getElementById("minutes").value) || 0;
        let seconds = parseInt(document.getElementById("seconds").value) || 0;

        if (hours < 0 || minutes < 0 || seconds < 0) {
            alert("Please enter a valid time.");
            return;
        }
    totalSeconds = hours * 3600 + minutes * 60 + seconds;
    initialTime = `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
    startTimer();
    startBtn.textContent = "Pause Timer";
    isPaused = false;
    } else if (startBtn.textContent === "Pause Timer") {
        clearInterval(timerInterval);
        startBtn.textContent = "Start Timer";
        isPaused = false;
    }
});

document.getElementById("stop-btn").addEventListener("click", function () {
    const stopBtn = document.getElementById("stop-btn");

if (stopBtn.textContent === "Stop Timer") {
    clearInterval(timerInterval);
    document.getElementById("timer-display").textContent =initialTime; //reset to initial time
    stopBtn.textContent = "Rest Timer";
    document.getElementById("start-btn").textContent = "Start Timer";
} else if (stopBtn.textContent === "Rest Timer") {
    clearInterval(timerInterval);
    document.getElementById("timer-display").textContent = "00:00:00";
    document.getElementById("hours").value = "";
    document.getElementById("minutes").value = "";
    document.getElementById("seconds").value = "";
    stopBtn.textContent = "Stop Timer";
    isPaused = false;
  }  
});

function startTimer() {
    const timerDisplay = document.getElementById("timer-display");

    timerInterval = setInterval(function () {
        if (totalSeconds <= 0) {
            clearInterval(timerInterval);
            timerDisplay.textContent = "00:00:00";
            playRingtone();
        } else {
            totalSeconds--;
            let h = String(Math.floor(totalSeconds / 3600)).padStart(2, "0");
            let m = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, "0");
            let s = String(totalSeconds % 60).padStart(2, "0");
            timerDisplay.textContent = `${h}:${m}:${s}`;
        }
    }, 1000);
}

document.getElementById("stop-btn").addEventListener("click", function () {
    clearInterval(timerInterval);
    stopRingtone();
})

function playRingtone() {
    if (!ringtone) {
        ringtone = new Audio("./royalty_free_cancer.mp3");
    }

    ringtone.loop = true;
    ringtone.play();

    setTimeout(() => {
        if (confirm("Time's up! Stop the Ringtone?")) {
            stopRingtone();
        }
    }, 100);
}

function stopRingtone() {
    if (ringtone) {
        ringtone.pause();
        ringtone.currentTime = 0;
    }
}
