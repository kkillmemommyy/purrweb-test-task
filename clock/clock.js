const hourHand = document.getElementById('hour');
const minuteHand = document.getElementById('minute');
const secondHand = document.getElementById('second');

const startBtn = document.getElementById('start');
const pauseBtn = document.getElementById('pause');

let intervalId = null;

function updateClock() {
  const now = new Date();
  const seconds = now.getSeconds();
  const minutes = now.getMinutes();
  const hours = now.getHours();

  const secondDeg = 6 * seconds;
  const minuteDeg = 6 * minutes + 0.1 * seconds;
  const hourDeg = 30 * (hours % 12) + 0.5 * minutes;

  secondHand.style.transform = `rotate(${secondDeg}deg)`;
  minuteHand.style.transform = `rotate(${minuteDeg}deg)`;
  hourHand.style.transform = `rotate(${hourDeg}deg)`;
}

startBtn.addEventListener('click', () => {
  if (!intervalId) {
    updateClock();
    intervalId = setInterval(updateClock, 1000);
  }
});

pauseBtn.addEventListener('click', () => {
  clearInterval(intervalId);
  intervalId = null;
});
