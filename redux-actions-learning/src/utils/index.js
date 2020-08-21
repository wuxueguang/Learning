
export const createAction = (...args) => {
  let ret;
  if(args.length > 0){
    ret = payload => ({type: args[0], payload});
    ret.toString = () => args[0];
  }
  if(args.length > 1){
    ret = ret(args[1]);
  }
  return ret;
}