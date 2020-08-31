/**
 * Veer User Policy handler
*/
import React from 'react';
import store from '@/store_old';
// import { isDev } from '@/utils';


const config = {};

function _checkPolicy ( code: string, data?: any[]): boolean {
  if (!data || data.length === 0) {
    return false;
  }
  for (let i = 0; i < data.length; i ++) {
    if (data[i].code === code) {
      return true
    }
  }
  return false;
}

export function checkUserPolicy(code?: string): boolean {
  if (!code) {
    return true;
  }
  const state = store.getState();
  const policies = state['User'].policy;
  // console.log('policies', policies)
  return _checkPolicy(code, policies);
}


export default function withUserPolicy (WrapComponent, code) {

  const state = store.getState();
  const policies = state['User'].policy;
  if (typeof code === 'string' && !_checkPolicy(code, policies)) {
    return null;
  }
  return WrapComponent;

};
