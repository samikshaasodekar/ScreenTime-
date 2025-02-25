let screenTime = 0;

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.set({ screenTime: 0 });
});

function trackTime() {
  chrome.idle.queryState(15, (state) => {
    if (state === "active") {
      chrome.windows.getCurrent((window) => {
        if (window?.focused) {
          chrome.storage.local.get(["screenTime"], (result) => {
            screenTime = result.screenTime || 0;
            chrome.storage.local.set({ screenTime: screenTime + 1 });
          });
        }
      });
    }
  });
}

setInterval(trackTime, 1000);
