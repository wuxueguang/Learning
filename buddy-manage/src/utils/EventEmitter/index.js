
const RECORDER = Symbol('recorder of events');
const ADD_EVENT_LISTENER = Symbol('add event listener');

class EventEmitter {
  constructor () {
    this[RECORDER] = new Map;
  }
  [ADD_EVENT_LISTENER]({ eventType, handler, maxTime = Infinity }) {
    if (!this[RECORDER].get(eventType)) {
      this[RECORDER].set(eventType, {
        callbacks: [],
        excutedTime: 0,
        maxTime,
      });
    }
    this[RECORDER].get(eventType).callbacks.push(handler);
    return this;
  }
  emit(eventType, ...args) {
    const recorder = this[RECORDER].get(eventType);
    if (recorder && recorder.excutedTime < recorder.maxTime) {
      recorder.callbacks.forEach(handler => {
        handler(...args);
      });
      recorder.excutedTime += 1;
    }else if(recorder){
      this[RECORDER].delete(eventType);
    }
  }
  addListener(eventType, handler){
    return this[ADD_EVENT_LISTENER]({ eventType, handler });
  }
  on(eventType, handler) {
    return this[ADD_EVENT_LISTENER]({ eventType, handler });
  }
  once(eventType, handler) {
    return this[ADD_EVENT_LISTENER]({ eventType, handler, maxTime: 1 });
  }
}

module.exports = EventEmitter;
