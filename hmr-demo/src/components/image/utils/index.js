const IMG = new Image;
const ARRAY = [];
const STR = '';


export const typeOf = v => /^\[object (.*)\]$/.exec(Object.prototype.toString.call(v))[1].toLowerCase();

export const isString = v => typeOf(v) === typeOf(STR);
export const isArray = v => typeOf(v) === typeOf(ARRAY);
export const isImage = v => typeOf(v) === typeOf(IMG);

export const createImg = src => new Promise((resolve, reject) => {
  const img = new Image;
  img.src = src;
  img.setAttribute('crossOrigin', 'anonymous');
  img.addEventListener('load', () => {
    img.setAttribute('original-width', img.width);
    img.setAttribute('original-height', img.height);

    resolve(img);
  });
  img.addEventListener('error', () => {
    reject();
  });
});
