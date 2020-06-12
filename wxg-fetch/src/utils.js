export const type = val => /^\[object (.+)\]$/.exec(Object.prototype.toString.call(val))[1];

export const colorLog = msg => {
  const style = [
    'color:#f00',
    'background-color:#333',
    'fontWeight:bold',
    'fontSize:12px',
  ];

  console.log('%c LOGGER ', `${style.join(';')};`, msg);
};

export const queryString = {
  serialize: params => {
    let ret = '?';
    for(let n of params){
      ret += `${n}=${params[n]}&`;
    }
    return ret.replace(/&$/, '');
  },
  parse: () => {},
};