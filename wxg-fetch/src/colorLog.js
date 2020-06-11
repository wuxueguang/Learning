const colorLog = msg => {
  const style = [
    'color:#f00',
    'background-color:#333',
    'fontWeight:bold',
    'fontSize:12px',
  ];

  if(process.env.node_env !== 'production'){
    console.log('%c ERROR ', `${style.join(';')};`, msg);
  }
};

export default colorLog;