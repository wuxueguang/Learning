
export const imgAdaptor = imgs => key => {
  let pixel = window.devicePixelRatio <= 3 ? Math.ceil(window.devicePixelRatio) : 3;

  while(imgs[`${key}${pixel}`] === undefined){
    pixel -= 1;
  }
  return imgs[`${key}${pixel}`];
};

export const transferSize = totalWidth => value => `${value / totalWidth * 16}rem`;
