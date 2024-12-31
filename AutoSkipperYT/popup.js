document.getElementById('activar').addEventListener('click', () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        function: activarScript
      });
    });
  });
  
  document.getElementById('desactivar').addEventListener('click', () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        function: desactivarScript
      });
    });
  });
  
  function activarScript() {
    if (!window.autoClicker) {
      window.autoClicker = (function() {
        let observer;
  
        function clickDiv() {
          var boton = document.querySelector('button.ytp-skip-ad-button');
          if (boton) {
            var div = boton.querySelector('.ytp-skip-ad-button__text');
            if (div) {
              div.click();
            } else {
              console.log('Div no encontrado');
            }
          } else {
            console.log('Botón no encontrado');
          }
        }
  
        function start() {
          clickDiv();
          observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
              if (mutation.type === 'childList') {
                clickDiv();
              }
            });
          });
  
          var config = { childList: true, subtree: true };
          observer.observe(document.body, config);
          console.log('Script activado');
        }
  
        function stop() {
          if (observer) {
            observer.disconnect();
            observer = null;
            console.log('Script desactivado');
          }
        }
  
        return { start, stop };
      })();
      window.autoClicker.start();
    } else {
      window.autoClicker.start();
    }
  }
  
  function desactivarScript() {
    if (window.autoClicker) {
      window.autoClicker.stop();
    }
  }
  