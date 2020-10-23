import { observable, action } from 'mobx';

const store = observable([{
  id: 0,
  name: '项目0',
}]);

store.add = action(project => {
  store.push(project);
});

store.update = action(function(newItems) {
  store.replace(newItems);
});

export default store;