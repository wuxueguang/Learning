
const RECORDER = Symbol('RECORDER key');
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
    try {
      if (recorder.excutedTime < recorder.maxTime) {
        recorder.callbacks.forEach(handler => {
          handler(...args);
        });
        recorder.excutedTime += 1;
      }
    } catch (err) {
      console.error(err);
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
