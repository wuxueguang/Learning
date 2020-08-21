
export default (state = 0, action) => {
  const { type, payload } = action;
  switch(type){
    case 'INCREMENT':
      return state + payload || 1;
    case 'DECREMENT':
      return state - payload || 1;
    default:
      return state;
  }
};