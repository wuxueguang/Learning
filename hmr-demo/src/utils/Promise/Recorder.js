
const EventEmitter = require('../EventEmitter');
const { isPromise$ } = require('./utils');
const { FULFILLED, REJECTED } = require('./consts');
const { RECORDER } = require('./consts');

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


module.exports = Recorder;
