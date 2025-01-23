function getButtonByText(text) {
  const xpath = `//button[contains(text(), '${text}')]`;
  const result = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
  return result.singleNodeValue;
}

let intervalId;

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "start") {
    const buttonText = "Check Now"; // Cambia esto por el texto del botón
    const checkText = "Submit"; // Opcional: texto del elemento que indica el cambio esperado

    intervalId = setInterval(() => {
      const button = getButtonByText(buttonText);
      if (button) {
        button.click();
        console.log(`Botón con texto '${buttonText}' clickeado`);

        // Verifica si ocurrió el cambio esperado
        const change = document.evaluate(`//*[contains(text(), '${checkText}')]`, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
        if (change) {
          console.log(`Cambio detectado: '${checkText}'`);
          chrome.runtime.sendMessage({ action: "notify", message: `Cambio detectado: '${checkText}'` });
          clearInterval(intervalId); // Detiene el intervalo
        }
      } else {
        console.error(`Botón con texto '${buttonText}' no encontrado`);
      }
    }, 30000); // Cada 30 segundos
  }

  if (request.action === "stop") {
    clearInterval(intervalId);
    console.log("Ciclo detenido");
  }

  sendResponse({ success: true });
});
