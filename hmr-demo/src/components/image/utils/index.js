const IMG = new Image;


export const typeOf = v => /^\[object (.*)\]$/.exec(Object.prototype.toString.call(v))[1].toLowerCase();


export const isImage = v => typeOf(v) === typeOf(IMG);
