export { default as HasLiked } from './HasLiked';
export { default as ThanksForLike } from './ThanksForLike';


import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import Message from './Message';

export const info = (msg, timeout = 1000, bgColor = 'blue') => {

  const div = document.createElement('div');

  document.body.appendChild(div);

  render(<Message msg={msg} bgColor={bgColor} />, div);

  setTimeout(() => {
    unmountComponentAtNode(div);
    div.remove();
  }, timeout);
};

export const success = (msg, timeout = 3000) => info(msg, timeout, 'green');

export const error = (msg, timeout = 3000) => info(msg, timeout, 'red');
