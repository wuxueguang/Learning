

// const loader = (jsUrls, targetName = 'render') => {
//   const iframe = document.createElement('iframe');
  
//   iframe.src = `/remote-loader.html?jsUrls=${Array.isArray(jsUrls) ? jsUrls.map(url => escape(url)).join(',') : escape(jsUrls)}`;
//   iframe.style.display = 'none';
//   document.body.appendChild(iframe);

//   return new Promise(resolve => {
//     iframe.contentWindow.addEventListener('message', () => {
//       resolve(iframe.contentWindow[targetName]);
//     });
//   });
// }

const loader = (jsUrls, targetName = 'render') => {
  return new Promise(resolve => {
    (function innerCall(urls){
      const url = urls.pop();
      if(url){
        const script = document.createElement('script');
        script.src = unescape(url);
        document.body.appendChild(script);
        
        script.addEventListener('load', () => {
          if(urls.length){
            innerCall(urls);
          }else{
            resolve(window[targetName]);
          }
        });
      }
    })(jsUrls.reverse());
  });
}

export default loader;