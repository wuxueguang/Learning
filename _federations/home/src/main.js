
import React from 'react';
import { render } from 'react-dom';

const loadComponent = (scope, module) => {
  return async () => {
    await __webpack_init_sharing__("default");
    const container = window[scope];
    await container.init(__webpack_share_scopes__.default);
    const factory = await window[scope].get(module);
    const Module = factory();
    return Module;
  };
};

let remoteScript;
const useRemoteScript = (args) => {
  remoteScript && document.head.removeChild(remoteScript);
  return new Promise((resolve, reject) => {
    if (!args.url) {
      reject();
    }

    remoteScript = document.createElement("script");
    remoteScript.src = args.url;
    remoteScript.type = "text/javascript";
    remoteScript.onload = () => {
      resolve();
    };
    remoteScript.onerror = () => {
      reject();
    };
    document.head.appendChild(remoteScript);
  });
};

const App = async () => {
  await useRemoteScript({url: 'http://localhost:9002/remote_entry.js'});
  const Component = React.lazy(
    loadComponent('about', './About')
  );

  return (
    <About/>
  );
};

render((
  <React.Suspense
    fallback="Loading..."
  ><App/></React.Suspense>
), document.getElementById('root'));
