// Este é um arquivo de service worker gerado para uso com o Create React App.
// Ele ajuda a habilitar funcionalidades offline e outras.

// Remova o código abaixo se você não precisa de funcionalidade offline.

// Em desenvolvimento, ele desabilita o cache porque `register()` é chamado.
const isLocalhost = Boolean(
    window.location.hostname === 'localhost' ||
      // [::1] é o endereço IPv6 local.
      window.location.hostname === '[::1]' ||
      // 127.0.0.0/8 são considerados como IPs localhost.
      window.location.hostname.match(
        /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
      )
  );
  
  export function register(config) {
    if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
      // O URL base onde está o arquivo service-worker.js
      const publicUrl = new URL(process.env.PUBLIC_URL, window.location.href);
      if (publicUrl.origin !== window.location.origin) {
        // O service worker não funcionará se o public URL for de uma origem diferente.
        return;
      }
  
      window.addEventListener('load', () => {
        const swUrl = `${process.env.PUBLIC_URL}/service-worker.js`;
  
        if (isLocalhost) {
          // Este bloco é executado apenas em localhost.
          checkValidServiceWorker(swUrl, config);
        } else {
          // Registre o service worker normalmente
          registerValidSW(swUrl, config);
        }
      });
    }
  }
  
  function registerValidSW(swUrl, config) {
    navigator.serviceWorker
      .register(swUrl)
      .then((registration) => {
        registration.onupdatefound = () => {
          const installingWorker = registration.installing;
          if (installingWorker == null) {
            return;
          }
          installingWorker.onstatechange = () => {
            if (installingWorker.state === 'installed') {
              if (navigator.serviceWorker.controller) {
                // Executa algo quando o novo service worker for instalado.
                if (config && config.onUpdate) {
                  config.onUpdate(registration);
                }
              } else {
                // Executa algo quando o novo service worker for instalado pela primeira vez.
                if (config && config.onSuccess) {
                  config.onSuccess(registration);
                }
              }
            }
          };
        };
      })
      .catch((error) => {
        console.error('Erro ao registrar o service worker:', error);
      });
  }
  
  function checkValidServiceWorker(swUrl, config) {
    fetch(swUrl, {
      headers: { 'Service-Worker': 'script' },
    })
      .then((response) => {
        const contentType = response.headers.get('content-type');
        if (
          response.status === 404 ||
          (contentType != null && contentType.indexOf('javascript') === -1)
        ) {
          // Se o service worker não existir, recarregue a página.
          navigator.serviceWorker.ready.then((registration) => {
            registration.unregister().then(() => {
              window.location.reload();
            });
          });
        } else {
          // Registra o service worker normalmente.
          registerValidSW(swUrl, config);
        }
      })
      .catch(() => {
        console.log('Nenhuma conexão de internet. Aplicativo rodando no modo offline.');
      });
  }
  
  export function unregister() {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.ready
        .then((registration) => {
          registration.unregister();
        })
        .catch((error) => {
          console.error(error.message);
        });
    }
  }
  