/**
 * Veer Features Flags Control HOC
*/
import React from 'react';
import devConfig from './dev.config';
import prodConfig from './prod.config';
import store from '@/store_old';
import { isDev } from '@/utils';


const config = isDev() ? devConfig : prodConfig;

function _checkFeatureFlag ( id: string, data?: any[]): boolean {
  if (!data) {
    return false;
  }
  for (let i = 0; i < data.length; i ++) {
    if (data[i].id === id) {
      return true
    }
  }
  return false;
}

export function checkFeatureFlag(featureName: string): boolean {
  const id = config[featureName];
  if (!id) {
    return true;
  }
  const state = store.getState();
  const featureFlags = state['Business'].featureFlags;
  for (let i = 0; i < featureFlags.length; i ++) {
    if (featureFlags[i].id === id) {
      return true
    }
  }
  return false;
}

interface HocProps {
  feature_name: string;
}

export default function withFeatureFlag (WrapComponent) {
  
  return class Hoc extends React.Component <HocProps>  {

    render () {
      const state = store.getState();
      const { feature_name } = this.props;
      
      const featureFlags = state['Business'].featureFlags;
      if (typeof feature_name === 'string' && !_checkFeatureFlag(config[feature_name], featureFlags)) {
        return null;
      }
      return (
        <WrapComponent 
          {...this.props}
        />
      )
    }
  }

};
