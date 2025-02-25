document.addEventListener("DOMContentLoaded", () => {
  const timeDisplay = document.getElementById("timeDisplay");
  const resetButton = document.getElementById("resetButton");

  function updateTime() {
    chrome.storage.local.get(["screenTime"], (result) => {
      const time = result.screenTime || 0;
      timeDisplay.textContent = `Time Spent: ${formatTime(time)}`;
    });
  }

  resetButton.addEventListener("click", () => {
    chrome.storage.local.set({ screenTime: 0 }, updateTime);
  });

  function formatTime(seconds) {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${pad(hrs)}:${pad(mins)}:${pad(secs)}`;
  }

  function pad(num) {
    return num < 10 ? "0" + num : num;
  }

  updateTime();
  setInterval(updateTime, 1000);
});
