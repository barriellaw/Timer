document.getElementById("start-btn").addEventListener("click", function() {
    let hours = parseInt(document.getElementById("hours").value) || 0;
    let minutes = parseInt(document.getElementById("minutes").value) || 0;
    let seconds = parseInt(document.getElementById("seconds").value) || 0;

    let totalSeconds = hours * 3600 + minutes * 60 + seconds;

    const timerDisplay = document.getElementById("timer-display");
    const interval = setInterval(function() {
        if (totalSeconds <= 0) {
            clearInterval(interval);
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
})