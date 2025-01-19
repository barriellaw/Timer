let timerInterval;

document.getElementById("start-btn").addEventListener("click", function() {
    clearInterval(timerInterval);

    let hours = parseInt(document.getElementById("hours").value) || 0;
    let minutes = parseInt(document.getElementById("minutes").value) || 0;
    let seconds = parseInt(document.getElementById("seconds").value) || 0;

    if (hours < 0 || minutes < 0 || seconds < 0) {
        alert("Please enter a valid time.");
        return;
    }

    let totalSeconds = hours * 3600 + minutes * 60 + seconds;

    const timerDisplay = document.getElementById("timer-display");
    timerInterval = setInterval(function() {
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
});

document.getElementById("stop-btn").addEventListener("click", function() {
    clearInterval(timerInterval);
});

let ringtone;

function playRingtone() {
    if (!ringtone) {
        ringtone = new Audio("./royalty_free_cancer.mp3");
    }

    ringtone.loop = true;
    ringtone.play();

    setTimeout(() => {
        if (confirm("Time's up! Do you want to stop the alarm?")) {
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
