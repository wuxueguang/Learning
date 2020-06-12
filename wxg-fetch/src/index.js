import {type, queryString} from './utils';

const HEADERS = {'Content-Type': 'application/json;charset=UTF-8'};

async function bee(url = '', ops = {}){
  if(type(args[0]) !== 'String' || type(ops) !== 'Object'){
    return console.error(new TypeError('arguments[0] is expected as URL string, arguments[1] is expected as config object'));
  }

  const {method = 'GET', headers, data = {}} = ops;

  const promise = new Promise((resolve, reject) => {
    if(window.fetch && window.AbortController){
      const controller = new AbortController();
      const {signal} = controller;
      promise.abort = () => {
        controller.abort();
        console.log('Request aborted!');
      };
      
      const request = (() => {
        let init, input = url;
        if(method === 'GET' || method === 'HEAD'){
          input = `${url}${queryString.serialize(data)}`;
          init = {
            method,
            ...ops,
          };
        }else if(method === 'POST'){
          init = {
            method,
            headers: {
              ...(type(data) === 'FormData' ? null : HEADERS),
              ...ops.headers,
            },
            body: JSON.stringify(data),
            ...ops,
          };
        }else{
          init = {...ops};
        }
        delete init.data;

        return new Request(input, init);
      })();

      try{
        const response = await fetch(request, {signal});
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
      promise.abort = () => {
        xhr.abort();
        console.log('Request aborted!');
      };

      for(let key of headers){
        if(headers.hasOwnProperty(key)){
          xhr.setRequestHeader(key, headers[key]);
        }
      }
      if(method === 'GET' || method === 'HEAD'){
        xhr.open(method, `${url}${queryString.serialize(data)}`);
      }else if(method === 'POST'){
        xhr.open(method, url);
        if(type(data) === 'FormData'){
          xhr.send(data);
        }else{
          xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
          xhr.send(JSON.stringify(data));
        }
      }else{

      }
    }
  });

  return promise;
}

export default bee;