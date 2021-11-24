import {getPublicUrl} from "./utils/domHelpers.js";
const isLocalhost = Boolean(window.location.hostname === "localhost" || window.location.hostname === "[::1]" || window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));
export default function register() {
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      const swUrl = "/service-worker.js";
      if (!isLocalhost) {
        registerValidSW(swUrl);
      } else {
        checkValidServiceWorker(swUrl);
      }
    });
  }
}
function registerValidSW(swUrl) {
  let refreshing = false;
  if (navigator.serviceWorker.controller) {
    navigator.serviceWorker.addEventListener("controllerchange", () => {
      if (refreshing) {
        return;
      }
      refreshing = true;
      window.location.reload();
    });
  }
  navigator.serviceWorker.register(getPublicUrl(swUrl)).then((registration) => {
    registration.onupdatefound = () => {
      const installingWorker = registration.installing;
      if (!installingWorker) {
        return;
      }
      const onServiceWorkerChange = () => {
        if (installingWorker.state === "installed") {
          if (navigator.serviceWorker.controller) {
            const event = new CustomEvent("updateavailable", {detail: installingWorker});
            window.dispatchEvent(event);
          }
        } else {
          console.info("Service worker ready");
        }
      };
      installingWorker.onstatechange = onServiceWorkerChange;
      onServiceWorkerChange();
    };
  }).catch((error) => {
    console.error("Error during service worker registration:", error);
  });
}
function checkValidServiceWorker(swUrl) {
  fetch(getPublicUrl(swUrl)).then((response) => {
    if (response.status === 404 || response.headers.get("content-type")?.indexOf("javascript") === -1) {
      navigator.serviceWorker.ready.then((registration) => {
        registration.unregister().then(() => {
          window.location.reload();
        });
      });
    } else {
      registerValidSW(swUrl);
    }
  }).catch(() => {
    console.info("No internet connection found. App is running in offline mode.");
  });
}
export function unregister() {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.ready.then((registration) => {
      registration.unregister();
    });
  }
}
