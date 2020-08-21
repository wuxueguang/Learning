
export default (state = 'Tom', { type, payload }) => {
  switch(type){
    case 'UPDATE_NAME':
      return payoad;
    default:
      return state;
  }
};