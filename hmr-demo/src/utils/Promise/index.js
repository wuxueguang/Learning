
const FULFILLED = 'promise fulfilled';
const REJECTED = 'promise rejected';

const IS_PROMISE = Symbol('is promise');
const RECORDER = Symbol('recorder');

const typeOf = v => /^\[object (.*)\]$/.exec(Object.prototype.toString.call(v))[1].toLowerCase();

const isObject = obj => typeOf(obj) === 'object';

const isFunc = func => typeOf(func) === 'function';

// const isArray = arr => typeOf(arr) === 'array';

const isPromise$ = p => isObject(p) && p[IS_PROMISE];

const thenable = obj => isObject(obj) && isFunc(obj['then']);

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

class Recorder {
  constructor () {
    this.settled = false;

    this.fulfilled = false;
    this.rejected = false;

    this.fulfilledHandlerExcuted = false;
    this.rejectedHandlerExcuted = false;

    this.suspended = false;

    this.result = undefined;
    this.fatherPromise = null;

    this.fulfilledHandler = Function();
    this.rejectedHandler = Function();

    this.eventEmitter = new EventEmitter;
  }

  setFulfilledHandler(handler){
    this.fulfilledHandler = handler;
    this.excuteFulfilledHandler();
  }
  setRejectedHandler(handler){
    this.rejectedHandler = handler;
    this.excuteRejectedHandler();
  }

  excuteFulfilledHandler() {
    if (!this.suspended && this.fulfilled && !this.fulfilledHandlerExcuted) {
      try {
        this.fulfilledHandlerExcuted = true;
        const ret = this.fulfilledHandler(this.result);
        this.eventEmitter.emit(FULFILLED, { result: ret });
      } catch (err) {
        this.eventEmitter.emit(REJECTED, { rejectedReason: err });
      }
    }
  }
  excuteRejectedHandler() {
    if (!this.suspended && this.rejected && !this.rejectedHandlerExcuted) {
      let rejectedReason;
      try{
        this.rejectedHandlerExcuted = true;
        rejectedReason = this.rejectedHandler(this.result);
      }catch(err){
        rejectedReason = err;
      }
      this.eventEmitter.emit(REJECTED, { rejectedReason });
    }
  }

  resolve(result) {
    if (!this.settled) {
      this.settled = true;
      this.fulfilled = true;
      this.result = result;
      this.excuteFulfilledHandler();
    }
  }
  reject(rejectReason) {
    if (!this.settled) {
      this.settled = true;
      this.rejected = true;
      this.result = rejectReason;
      this.excuteRejectedHandler();
    }
  }

  suspend() {
    this.suspended = true;
    if (isPromise$(this.fatherPromise)) {
      this.fatherPromise[RECORDER].suspend();
    }
  }
  continue() {
    this.suspended = false;
    if (isPromise$(this.fatherPromise)) {
      this.fatherPromise[RECORDER].continue();
    }

    if (this.settled) {
      this.excuteFulfilledHandler();
      this.excuteRejectedHandler();

      if (isPromise$(this.fatherPromise)) {
        this.fatherPromise[RECORDER].excuteFulfilledHandler();
        this.fatherPromise[RECORDER].excuteRejectedHandler();
      }
    }
  }
}

function Promise$(executor){
  if(new.target){
    this[IS_PROMISE] = true;
    this[RECORDER] = new Recorder;

    if (isFunc(executor)) {
      executor(this[RECORDER].resolve.bind(this[RECORDER]), this[RECORDER].reject.bind(this[RECORDER]));
    } else {
      throw new TypeError(`Promise$ resolver ${executor} is not a function`);
    }
  }
}

Promise$.resolve = function(data) {
  if (thenable(data)) {
    return new Promise$((resolve, reject) => {
      data.then(result => resolve(result), rejectedReason => reject(rejectedReason));
    });
  }
  return new Promise$(resolve => resolve(data));
};

Promise$.prototype.then = function(onFulfilled, onRejected) {
  const fatherRecorder = this[RECORDER];
  const promise = new Promise$(Function());

  const _onFulfilled = isFunc(onFulfilled) ? onFulfilled : result => result;
  const _onRejected = isFunc(onRejected) ? onRejected : rejectedReason => rejectedReason;

  promise[RECORDER].fatherPromise = this;
  promise[RECORDER].setFulfilledHandler(_onFulfilled);
  promise[RECORDER].setRejectedHandler(_onRejected);

  if (fatherRecorder.settled) {
    fatherRecorder.fulfilled && promise[RECORDER].resolve(fatherRecorder.result);
    fatherRecorder.rejected && promise[RECORDER].resolve();

  } else {
    fatherRecorder.eventEmitter.on(FULFILLED, e => {
      promise[RECORDER].resolve(e.result);
    });
    fatherRecorder.eventEmitter.on(REJECTED, e => {
      promise[RECORDER].reject(e.rejectedReason);
    });
  }

  return promise;
};

Promise$.prototype.catch = function(onRejected) {
  return this.then(result => result, onRejected);
};
Promise$.prototype.finally = function(onFinally) {
  return this.then(onFinally, onFinally);
};

Promise$.prototype.stop = function() {
  this[RECORDER].suspend();
  return this;
};
Promise$.prototype.continue = function() {
  this[RECORDER].continue();
  return this;
};

export {
  RECORDER,
};

export default Promise$;




