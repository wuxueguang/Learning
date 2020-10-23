
import { observable, action } from "mobx";

const projectList = observable({
  list: [{
    id: 0,
    name: '项目0',
  }]
});

projectList.add = action(project => {
  projectList.list.push(project);
});

projectList.update = action(function() {
  projectList.list = [{
      id: 1,
      name: '项目1'
    }, {
      id: 2,
      name: '项目2'
    }, {
      id: 3,
      name: '项目3'
    }];
});

export default projectList;