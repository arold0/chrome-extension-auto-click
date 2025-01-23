document.getElementById('start').addEventListener('click', () => {
    chrome.runtime.sendMessage({ action: 'start' });
    document.getElementById('status').innerText = 'Estado: Activo';
  });
  
  document.getElementById('stop').addEventListener('click', () => {
    chrome.runtime.sendMessage({ action: 'stop' });
    document.getElementById('status').innerText = 'Estado: Inactivo';
  });
  