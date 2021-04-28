import { PXPS } from './const';


export const transformStyle = styleObj => {
  const newStyle = {...styleObj};

  for(const n in newStyle){
    if(PXPS.includes(n) && Number.isFinite(newStyle[n])){
      newStyle[n] = `${newStyle[n]}px`;
    }
  }

  return newStyle;
};
