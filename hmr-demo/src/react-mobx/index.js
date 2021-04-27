
import React, { useContext, useEffect, useState } from 'react';
import { autorun } from 'mobx';

const StoreContext = React.createContext();

const Provider = props => {
  const { store, children } = props;

  return (
    <StoreContext.Provider
      value={{store}}
    >{children}</StoreContext.Provider>
  );
};

const observer = target => {


};

const inject = (...args) => C => {
  const C_ = props => {
    const { store } = useContext(StoreContext);
    const localStore = {};
    (Array.isArray(args[0]) ? args[0] : [args[0]]).forEach(item => {
      localStore[item] = store[item];
    });
    
    return (
      <C {...props} {...localStore} />
    );
  };

  C_.context = StoreContext;

  return C_;
};

export {
  Provider,
  inject,
};