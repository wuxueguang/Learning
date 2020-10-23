
import React, { useEffect } from 'react';
import { observer, Provider } from 'mobx-react';

import Statistics from './components/Statistics';

import store from './store';

const ProjectList = observer(props => {

  useEffect(() => {
    setTimeout(() => {
      store.add({id: 1, name: '项目1'});
    }, 1000);
    setTimeout(() => {
      store.update([{id: 2, name: '项目2'}]);
    }, 2000);
  }, []);

  return (
    <>
      <ul>
      {
        store.map(item => {
          return (
            <li key={item.id}>{item.name}</li>
          );
        })
      }
      </ul>
    </>
  );
});

export default () => {
  return (
    <Provider projectList={store} >
      <ProjectList />
      <Statistics />
    </Provider>
  );
};
