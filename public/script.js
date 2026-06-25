let lapCount = 0;

let milliseconds = 0;
let seconds = 0;
let minutes = 0;
let hours = 0;
let timer = null;

function updateDisplay() {

    let h = String(hours).padStart(2, '0');
    let m = String(minutes).padStart(2, '0');
    let s = String(seconds).padStart(2, '0');
    let ms = String(milliseconds).padStart(2, '0');

    document.getElementById("display").innerText =
        `${h}:${m}:${s}:${ms}`;
}

function startStop() {

    if (timer !== null) return;

    timer = setInterval(() => {

        milliseconds++;

        if (milliseconds === 100) {
            milliseconds = 0;
            seconds++;
        }

        if (seconds === 60) {
            seconds = 0;
            minutes++;
        }

        if (minutes === 60) {
            minutes = 0;
            hours++;
        }

        updateDisplay();

    }, 10);
}

function pauseStop() {

    clearInterval(timer);
    timer = null;
}

function resetStop() {

    clearInterval(timer);

    timer = null;

    milliseconds = 0;
    seconds = 0;
    minutes = 0;
    hours = 0;
    lapCount = 0;

    document.getElementById("laps").innerHTML = "";

    fetch("/laps", {
        method: "DELETE"
    });

    updateDisplay();
}

async function lapTime() {

    lapCount++;

    const currentTime =
        document.getElementById("display").innerText;

    const li = document.createElement("li");

    li.textContent =
        `Lap ${lapCount} - ${currentTime}`;

    document.getElementById("laps").appendChild(li);

    await fetch("/laps", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            lap: currentTime
        })
    });
}

async function loadLaps() {

    const response = await fetch("/laps");

    const data = await response.json();

    const lapList =
        document.getElementById("laps");

    data.forEach((item, index) => {

        const li =
            document.createElement("li");

        li.textContent =
            `Saved Lap ${index + 1} - ${item.lap}`;

        lapList.appendChild(li);
    });
}

updateDisplay();
loadLaps();