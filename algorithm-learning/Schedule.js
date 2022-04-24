

class TaskManager{
  et = new EventTarget
  counter = 0
  addCounter = 0
  constructor(max){
    this.max = max;
  }
  add(task){
    return new Promise((resolve, reject) => {
      const handler = () => {
        this.et.removeEventListener(eventName, handler);
        this.counter += 1;
        task.call(null).then(data => {
          resolve(data);
        }).catch(err => {
          reject(err);
        }).finally(() => {
          this.counter -= 1;
          this.et.dispatchEvent(new CustomEvent('onTaskSettled'));
        });
      };
      const eventName = `onTaskExcuted_${this.addCounter++}`;
      this.et.addEventListener(eventName, handler);
      this._schedule(eventName);
    });
  }
  _schedule(eventName){
    if(this.counter < this.max){
      this.et.dispatchEvent(new CustomEvent(eventName));
    }else{
      const handler = () => {
        this.et.removeEventListener('onTaskSettled', handler);
        this._schedule(eventName);
      };
      this.et.addEventListener('onTaskSettled', handler);
    }
  }
}


const createTask = (data, delay, flag = true) => () => new Promise(resolve => {
  setTimeout(() => {
    if(flag){
      resolve(data);
    }else{
      reject('For some reason!');
    }
  }, delay);
});

const sc = new TaskManager(2);


sc.add(createTask('test1', 10000)).then(data => console.log(data));
sc.add(createTask('test2', 2000)).then(data => console.log(data));
sc.add(createTask('test3', 3000)).then(data => console.log(data));
sc.add(createTask('test4', 4000)).then(data => console.log(data));
sc.add(createTask('test5', 5000)).then(data => console.log(data));
sc.add(createTask('test6', 6000)).then(data => console.log(data));
