import type from './type';

async function bee(...args){
  const [input, init] = args;
  const {method = 'GET'} = init;
  let request, _init;
  if(type(input) === 'string'){
    request = new Request(input, {
      
    });
  }






  const promise = new Promise((resolve, reject) => {
    if(window.AbortController){
      const controller = new AbortController();
      const {signal} = controller;
      promise.abort = () => {
        controller.abort();
        console.log('Fetch aborted!');
      };

      const {method, headers, data} = args[1];
      const init = {
        method,
        headers,
        body: data,

      }
      // GET 不有 body
      try{
        const response = await fetch(args[0], {...args[1], signal});
        const {status, statusText, ok} = response;
        if(ok){
          resolve(response.json());
        }else{
          reject({status, statusText});
        }
      }catch(e){
        reject(e);
        console.log(e);
      }  
    }else{
      const xhr = new XMLHttpRequest();
      const {headers, data} = args[1];
      for(let key of headers){
        if(headers.hasOwnProperty(key)){
          xhr.setRequestHeader(key, headers[key]);
        }
      }
      xhr.open(args[1].method, args[0]);
      const formData = new FormData;
      for(let key of data){
        if(data.hasOwnProperty(key)){
          formData.append(key, data[key]);
        }
      }
      xhr.send(formData);
    }
  });

  return promise;
}

export default bee;