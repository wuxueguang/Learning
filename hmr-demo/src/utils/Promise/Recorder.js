
const EventEmitter = require('../EventEmitter');
const { isFunc } = require('..');
const { FULFILLED, REJECTED } = require('./consts');

class Recorder {
  constructor(){
    this.settled = false;
    this.fulfilled = false;
    this.rejected = false;
    this.result = undefined;
    this.fulfilledHandlers = [];
    this.rejectedHandlers = [];

    this.eventEmitter = new EventEmitter;
  }

  addFulfilledHandlers(handler) {
    if (isFunc(handler)) {
      this.fulfilledHandlers.push(handler);
      if (this.fulfilled) {
        const detail = {};
        try {
          detail.data = handler(this.result);
          detail.settledStatus = FULFILLED;
        } catch (err) {
          detail.rejectReason = err;
          detail.settledStatus = REJECTED;
        }
        this.eventEmitter.emit(`fulfilledHandlerCalled_${handler.idx}`, { detail });
      }
    }
  }

  addRejectedHandlers(handler) {
    if (isFunc(handler)) {
      this.rejectedHandlers.push(handler);
      if (this.rejected) {
        const detail = {};
        try {
          detail.data = handler(this.result);
          detail.settledStatus = FULFILLED;
        } catch (err) {
          detail.rejectReason = err;
          detail.settledStatus = REJECTED;
        }
        this.eventEmitter.emit(`fulfilledHandlerCalled_${handler.idx}`, { detail });
      }
    }
  }

  resolve(data) {
    if (!this.settled) {
      this.settled = true;
      this.fulfilled = true;
      this.result = data;

      this.eventEmitter.emit(FULFILLED);

      this.fulfilledHandlers.forEach(handler => {
        const detail = {};
        try {
          detail.data = handler(data);
          detail.settledStatus = FULFILLED;
        } catch (err) {
          detail.rejectReason = err;
          detail.settledStatus = REJECTED;
        }
        this.eventEmitter.emit(`fulfilledHandlerCalled_${handler.idx}`, { detail });
      });
    }
  }
  reject(rejectReason) {
    if (!this.settled) {
      this.settled = true;
      this.rejected = true;
      this.result = rejectReason;

      this.eventEmitter.emit(REJECTED);

      this.rejectedHandlers.forEach(handler => {
        const detail = {};
        try {
          detail.data = handler(rejectReason);
          detail.settledStatus = FULFILLED;
        } catch (err) {
          detail.rejectReason = err;
          detail.settledStatus = REJECTED;
        }
        this.eventEmitter.emit(`rejectedHandlerCalled_${handler.idx}`, { detail });
      });
    }
  }
}


module.exports = Recorder;
