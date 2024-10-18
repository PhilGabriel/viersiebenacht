document.addEventListener("DOMContentLoaded", function () {
  const startButton = document.getElementById("startButton");
  const countdown = document.getElementById("countdown");
  const phaseText = document.getElementById("phaseText");
  const instructions = document.getElementById("instructions");
  const introText = document.getElementById("introText");
  const backgroundButton = document.querySelector('a[href="/hintergrund.html"]'); // Button zur Hintergrundseite

  // Start-Button mit Pulse-Effekt
  startButton.classList.add("pulse");

  startButton.addEventListener("click", function () {
    startButton.disabled = true;
    instructions.style.display = "none";
    introText.style.display = "none";
    backgroundButton.style.display = "none"; // Versteckt den Hintergrund-Button

    // Vibration bei Start der Übung
    if (navigator.vibrate) {
      navigator.vibrate(100);
    }

    startCountdown(3, function () {
      beginBreathingExercise();
    });
  });

  function beginBreathingExercise() {
    changeBackgroundColor("#c1e1ff"); // Pastell-Blau
    phaseText.textContent = "Atme durch die Nase ein";
    startButton.innerHTML =
      '<img src="/svg/wind.svg" alt="Wind" style="width: 50px; height: 50px;">';
    countUp(4, function () {
      changeBackgroundColor("#fff7c1"); // Pastell-Gelb
      phaseText.textContent = "Halte die Luft an";
      startButton.innerHTML =
        '<img src="/svg/pause.svg" alt="Pause" style="width: 50px; height: 50px;">';
      countUp(7, function () {
        changeBackgroundColor("#d1c1ff"); // Pastell-Pflaumenfarbe
        phaseText.textContent = "Atme langsam durch den Mund aus";
        startButton.innerHTML =
          '<img src="/svg/wind.svg" alt="Wind" style="width: 50px; height: 50px;">';
        countUp(8, function () {
          showFinalButtons();
        });
      });
    });
  }

  function startCountdown(seconds, callback) {
    let counter = seconds;
    countdown.textContent = counter;
    const interval = setInterval(function () {
      counter--;
      if (counter > 0) {
        countdown.textContent = counter;
      } else {
        clearInterval(interval);
        countdown.textContent = "";
        callback();
      }
    }, 1000);
  }

  function countUp(target, callback) {
    let counter = 0;
    countdown.textContent = counter;
    const interval = setInterval(function () {
      counter++;
      if (counter <= target) {
        countdown.textContent = counter;
      } else {
        clearInterval(interval);
        countdown.textContent = "";
        callback();
      }
    }, 1000);
  }

  function changeBackgroundColor(color) {
    document.body.style.backgroundColor = color;
  }

  function showFinalButtons() {
    startButton.style.display = "none";
    phaseText.textContent = "";
    const repeatButton = document.createElement("button");
    repeatButton.textContent = "Wiederholen";
    repeatButton.className = "btn btn-secondary m-2";

    const thankYouButton = document.createElement("button");
    thankYouButton.textContent = "Danke";
    thankYouButton.className = "btn btn-secondary m-2";

    const backgroundButton = document.createElement("a");
    backgroundButton.href = "/hintergrund.html";
    backgroundButton.textContent = "Mehr über die Atemtechnik";
    backgroundButton.className = "btn btn-info m-2";

    const main = document.querySelector("main");
    main.appendChild(repeatButton);
    main.appendChild(thankYouButton);
    main.appendChild(backgroundButton); // Zeigt den Hintergrund-Button am Ende des Ablaufs wieder an

    repeatButton.addEventListener("click", function () {
      repeatButton.style.display = "none";
      thankYouButton.style.display = "none";
      backgroundButton.style.display = "none";
      startButton.style.display = "block";
      startButton.disabled = true;
      instructions.style.display = "none";
      introText.style.display = "none";
      beginBreathingExercise();
    });

    thankYouButton.addEventListener("click", function () {
      window.location.reload();
    });
  }
});
