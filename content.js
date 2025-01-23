const button = Array.from(document.querySelectorAll('button')).find(el => el.textContent.trim() === 'Check Now');

if (button) {
  button.click();
}

// Detectar cambios en el DOM
const observer = new MutationObserver(() => {
  const target = Array.from(document.querySelectorAll('button')).find(el => el.textContent.trim() === 'Submit'); // Detectar botón con texto "Submit"
  if (target) {
    fetch('http://localhost:3000/notify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: 'Cambio detectado en el sitio web' })
    });
    observer.disconnect();
  }
});

observer.observe(document.body, { childList: true, subtree: true });

//
