
const isUrl = (reg => path => reg.test(path))(
  /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/
);

/**
 * examples: key2value('true') -> true | key2value('null) -> null | key2value('123') -> 123 | key2value('sdf') -> sdf;
 * @param {*} key 
 */
const key2value = key => (
  Number.isNaN(Number(key)) ? ({
    [key]: key,
    'true': true,
    'false': false,
    'null': null
  })[key] : Number(key)
);

const downloadWithUrl = (url, fileName) => {
  const a = document.createElement('a');
  const fName = fileName || url.replace(/^.*\//, '');
  
  a.setAttribute('href', url);
  a.setAttribute('download', fName);
  a.style.setProperty('display', 'none');
  document.body.appendChild(a);
  a.click();
  a.remove();
};

const downloadWithBinary = async ({ response } = {}) => {
  try{
    const blob = await response.blob();
    const loadstream = window.URL.createObjectURL(blob);
    const contentDisposition = response.headers.get('Content-Disposition') || '';
    const encodedFilename = (contentDisposition.split('=')[1]);
    if(!encodedFilename) throw new Error('下载失败');
    const filename = decodeURIComponent(encodedFilename);
    downloadWithUrl(loadstream, filename);
    window.URL.revokeObjectURL(loadstream);
  }catch(e){
    alert(e.message);
  }
};

const img2Base64 = file => {
  const fileReader = new FileReader;
  fileReader.readAsDataURL(file);
  return new Promise(resolve => {
    fileReader.addEventListener('load', () => {
      resolve(fileReader.result);
    });
  });
};

const isAbsoluteURL = url => {
  // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
  // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
  // by any combination of letters, digits, plus, period, or hyphen.
  return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);
};

export {
  isUrl,
  key2value,
  downloadWithUrl,
  downloadWithBinary,
  img2Base64,
  isAbsoluteURL,
};