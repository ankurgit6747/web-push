const publicVapidKey = 'BNl0lBObcPPCtvMaSk-x6VblBtRmSz3xmFOiZ0sGDF2SPpJQv6n6Dj-8vbNFmy30wJndf6nK7xUXQ2hEjj_H-oo';

// check for service worker

if ('serviceWorker' in navigator) {
  send().catch(err => console.error(err))
}

// register sw, push , send push notification
async function send() {
  console.log('Registering service worker...');
  const register = await navigator.serviceWorker.register('/worker.js', {
    scope: '/'
  });
  console.log('service worker registered...')

  // register push
  console.log('Registering push...');
  const subscription = await register.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(publicVapidKey)
  });
  console.log('push registered...')

  // send push notification
  console.log('Sending push...');

  await fetch('/subscribe', {
    method: 'POST',
    body: JSON.stringify(subscription),
    headers: {
      'content-type': 'application/json'
    }
  })
  console.log('push sent...')
}

function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, "+")
    .replace(/_/g, "/");

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}