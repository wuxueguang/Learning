const reg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/;

const isUrl = path => reg.test(path);
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

export {
  isUrl,
  key2value,
  downloadWithUrl,
  downloadWithBinary
};