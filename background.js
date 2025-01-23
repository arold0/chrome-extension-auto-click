let interval;

chrome.runtime.onMessage.addListener((message) => {
  if (message.action === 'start') {
    interval = setInterval(() => {
      chrome.scripting.executeScript({
        target: { tabId: message.tabId },
        files: ['content.js']
      });
    }, 30000); // Cada 30 segundos
  } else if (message.action === 'stop') {
    clearInterval(interval);
  }
});
