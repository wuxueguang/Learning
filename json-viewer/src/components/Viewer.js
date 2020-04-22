import React, { PureComponent as Component } from 'react';

import DView from './DView';

export default ({jsonObj, status}) => (
    <div className="viewer">
        {
            status === 'unnormal' ? 'Invalid JSON string!' : jsonObj === undefined ? '' : <DView>{jsonObj}</DView> 
        }   
    </div>
);