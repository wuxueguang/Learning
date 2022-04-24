/* // export * from './components/Counter';
import 'antd/dist/antd.css';

import React, { useState, useCallback } from 'react';

import {  Tree, Button, Input } from 'antd';

import { render } from 'react-dom';

import Image from './components/Image';

import createUseSignal from './useSignal';

import treeData from './tree';

const useIsCreating = createUseSignal([[true, 'creatingStart'], [false, 'creatingEnd']]);

const Node = props => {

  const { title } = props;

  const [isCreating, setAllIsCreating] = useIsCreating(false);

  const [status, setStatus] = useState('view');

  const clickHandler = useCallback((e) => {
    const { action } = e.currentTarget.dataset;

    setStatus(action === 'creatingStart' ? 'edit' : 'view');
    setAllIsCreating(action === 'creatingStart');
  }, []);

  console.log(status);

  return status === 'edit' ? (
    <span>
      <Input defaultValue={title} />
      <Button data-action="creatingEnd" onClick={clickHandler}>SAVE</Button>
    </span>
   ) : (
    isCreating ? (
      <span>{title}</span>
    ) : (
      <a data-action="creatingStart" onClick={clickHandler}>{title}</a>
    )
   );
}

render((
  <>
    <Image width={300} height={200} src="https://img0.baidu.com/it/u=3122136587,3938996930&fm=26&fmt=auto" />
    <br/>
    <Tree
      width={800}
      treeData={treeData}
      expandedKeys={['l1', 'l1_1', 'l2', 'l2_1', 'l2_1_1']}
      titleRender={({title}) => {
        return <Node title={title}/>;
      }}
    />
  </>
), document.getElementById('root')); */
