

const { observable, action, autorun } = require('mobx');

const counter = observable(0);

counter.add = action(function(){
  this.set(this.get() + 1);
});

autorun(() => {
  console.log(counter.get())
});

setInterval(() => {
  counter.add();
}, 1000);


