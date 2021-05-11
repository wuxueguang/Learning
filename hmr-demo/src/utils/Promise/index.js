
const FULFILLED = 'promise fulfilled';
const REJECTED = 'promise rejected';

const IS_PROMISE = Symbol('is promise');
const RECORDER = Symbol('Recorder for promise instance’s inner property and method.');
const INSTANCES_RECORDER = Symbol('Promise instances recorder for stop and continue method.');

const typeOf = v => /^\[object (.*)\]$/.exec(Object.prototype.toString.call(v))[1].toLowerCase();

const isObject = obj => typeOf(obj) === 'object';

const isFunc = func => typeOf(func) === 'function';

const isArray = arr => typeOf(arr) === 'array';

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
    }
    if (recorder && recorder.excutedTime >= recorder.maxTime) {
      this[RECORDER].delete(eventType);
    }
  }
  addListener(eventType, handler) {
    return this[ADD_EVENT_LISTENER]({ eventType, handler });
  }
  on(eventType, handler) {
    return this.addListener(eventType, handler);
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

    this.suspended = false;

    this.result = undefined;

    this.fatherPromise = null;

    this.fulfilledHandlers = [];
    this.rejectedHandlers = [];

    this.eventEmitter = new EventEmitter;
  }

  addFulfilledHandler(handler) {
    this.fulfilledHandlers.push(handler);
    this._excuteHandlers();
  }
  addRejectedHandler(handler) {
    this.rejectedHandlers.push(handler);
    this._excuteHandlers();
  }

  _excuteHandlers() {
    if (this.settled && !this.suspended) {
      const handlers = this.fulfilled ? this.fulfilledHandlers : this.rejectedHandlers;
      const unexcutedHandlers = handlers.filter(item => !item.excuted);

      if (unexcutedHandlers.length) {
        const settledStatus = this.fulfilled ? FULFILLED : REJECTED;
        const detail = {
          settledStatus,
          result: this.result,
          rejectReason: this.result,
        };
        this.eventEmitter.emit(settledStatus, { detail });
      }

      unexcutedHandlers.forEach(handler => {
        const detail = {};
        try {
          handler.excuted = true;
          detail.result = handler(this.result);
          detail.settledStatus = FULFILLED;
        } catch (err) {
          detail.rejectReason = err;
          detail.settledStatus = REJECTED;
        }
        this.eventEmitter.emit(`handlerCalled_${handler.idx}`, { detail });
      });
    }
  }

  resolve(result) {
    if (!this.settled) {
      this.settled = true;
      this.fulfilled = true;
      this.result = result;
      this._excuteHandlers();
    }
  }
  reject(rejectReason) {
    if (!this.settled) {
      this.settled = true;
      this.rejected = true;
      this.result = rejectReason;
      this._excuteHandlers();
    }
  }

  suspendSelf(){
    this.suspended = true;
  }
  suspend() {
    this.suspendSelf();
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
      this._excuteHandlers();

      if (isPromise$(this.fatherPromise)) {
        this.fatherPromise[RECORDER]._excuteHandlers();
      }
    }
  }
}

class Promise${
  constructor(executor, instanceRecorder){
    if (isFunc(executor)) {
      this[IS_PROMISE] = true;
      this[RECORDER] = new Recorder;

      if(isArray(instanceRecorder)){
        instanceRecorder.push(this);
      }

      Promise.resolve().then(() => {
        executor(this[RECORDER].resolve.bind(this[RECORDER]), this[RECORDER].reject.bind(this[RECORDER]));
      }).catch(err => {
        this[RECORDER].settled = true;
        this[RECORDER].rejected = true;
        this[RECORDER].result = err;
      });
    } else {
      throw new TypeError(`Promise$ resolver ${executor} is not a function`);
    }
  }
}

Promise$.scope = function(){
  const recorder = [];
  class Promise$$ extends Promise${
    constructor(executor){
      super(executor, recorder);
    }
  }

  Promise$$[INSTANCES_RECORDER] = recorder;

  Promise$$.stopAll = function(){
    recorder.forEach(item => item[RECORDER].suspendSelf());
  };

  return Promise$$;
};

Promise$.resolve = function (data) {
  if (thenable(data)) {
    return new Promise$((resolve, reject) => {
      data.then(result => resolve(result), rejectReason => reject(rejectReason));
    });
  }
  return new Promise$(resolve => resolve(data));
};

Promise$.reject = function () { };

Promise$.stop = function (ps) {
  (ps || Promise$[INSTANCES_RECORDER] || []).forEach(promise => promise[RECORDER].stopSelf());
};

Promise$.prototype.then = function (onFulfilled, onRejected) {
  const fatherRecorder = this[RECORDER];
  const newPromise = new Promise$(Function());

  newPromise[RECORDER].fatherPromise = this;

  const _onFulfilled = isFunc(onFulfilled) ? onFulfilled : result => result;
  const _onRejected = isFunc(onRejected) ? onRejected : rejectReason => rejectReason;

  _onFulfilled.idx = fatherRecorder.fulfilledHandlers.length + fatherRecorder.rejectedHandlers.length;
  _onRejected.idx = _onFulfilled.idx + 1;

  const handlerCalledHandler = e => {
    if (e.detail.settledStatus === FULFILLED) {
      if (thenable(e.detail.result)) {
        e.detail.result.then(result => {
          newPromise[RECORDER].resolve(result);
        }, rejectReason => {
          newPromise[RECORDER].reject(rejectReason);
        });
      } else {
        newPromise[RECORDER].resolve(e.detail.result);
      }
    } else {
      newPromise[RECORDER].reject(e.detail.rejectReason);
    }
  };

  try {
    // change new promise status
    if (isFunc(onFulfilled)) {
      fatherRecorder.eventEmitter.on(`handlerCalled_${_onFulfilled.idx}`, handlerCalledHandler);
    } else {
      fatherRecorder.eventEmitter.on(FULFILLED, handlerCalledHandler);
    }
    if (isFunc(onRejected)) {
      fatherRecorder.eventEmitter.on(`handlerCalled_${_onRejected.idx}`, handlerCalledHandler);
    } else {
      fatherRecorder.eventEmitter.on(REJECTED, handlerCalledHandler);
    }
  } finally {
    // must be after eventEmitter.on
    fatherRecorder.addFulfilledHandler(_onFulfilled);
    fatherRecorder.addRejectedHandler(_onRejected);
  }

  return newPromise;
};

Promise$.prototype.catch = function (onRejected) {
  return this.then(result => result, onRejected);
};
Promise$.prototype.finally = function (onFinally) {
  return this.then(onFinally, onFinally);
};

Promise$.prototype.stop = function () {
  this[RECORDER].suspend();
  return this;
};
Promise$.prototype.continue = function () {
  this[RECORDER].continue();
  return this;
};

export {
  RECORDER,
};

export default Promise$;




