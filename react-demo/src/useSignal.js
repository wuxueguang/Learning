import { useState, useEffect } from 'react';

const createUseSignal = (dataList) => {
  const et = new EventTarget();
  const eventNameForSignalMap = new Map();

  dataList.forEach(([_signal, _eventName]) => eventNameForSignalMap.set(_signal, _eventName));

  const useSignal = (defaultSignal) => {

    const [signal, setSignal] = useState(defaultSignal);

    useEffect(() => {
      dataList.forEach(([_signal, _eventName, _callback]) => {
        const _handler = (e) => {
          setSignal(_signal);
          if (typeof _callback === 'function') {
            _callback(e);
          }
        };
        et.addEventListener(_eventName, _handler);

        return () => et.removeEventListener(_eventName, _handler);
      });
    }, []);

    const setAll = (signal, detail) => {
      const _eventName = eventNameForSignalMap.get(signal);
      et.dispatchEvent(new CustomEvent(_eventName, {detail}));
    };

    return [signal, setAll, setSignal, et];
  };

  return useSignal;
};

export {
  createUseSignal,
};

export default createUseSignal;
