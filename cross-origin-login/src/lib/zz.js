
const IFRAME_LOADED = 'iframe loaded';

const et = new EventTarget;

const iframeLoadPromise = new Promise((resolve, reject) => {
  et.addEventListener(IFRAME_LOADED, e => {
    resolve(e.detail);
  });
});

export const init = iframeUrl => {
  const _iframe = document.createElement('iframe');

  _iframe.style.display = 'none';
  _iframe.src = iframeUrl;
  document.body.appendChild(_iframe);
  _iframe.addEventListener('load', () => {
    et.dispatchEvent(new CustomEvent(IFRAME_LOADED, {
      detail: {
        iframe: _iframe,
        url: new URL(iframeUrl),
      },
    }));
  });
};


export const login = (username, password) => new Promise((resolve, reject) => {
  iframeLoadPromise.then(({iframe, url}) => {
    iframe.contentWindow.postMessage({type: 'login'}, url.origin);
    window.addEventListener('message', ({data: {type, userInfo}}) => {
      resolve({type, userInfo});
    });
  });
});