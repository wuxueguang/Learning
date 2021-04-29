
'use strict';


class EventEmitter{
    recorder = new Map
    on(eventType, handler){
        let handlers = this.recorder.get(eventType);
        if(!Array.isArray(handlers)){
            handlers = [handler];
            this.recorder.set(eventType, handlers);
        }else{
            handlers.push(handler);
        }
        return this;
    }
    emit(eventType, ...args){
        const handlers = this.recorder.get(eventType);
        
        if(Array.isArray(handlers)){
            handlers.forEach(func => {
                func.apply(null, args);             
            })
        }
        return this;
    }
}

const ee = new EventEmitter;

ee.on('click', () => {
    console.log('clicked');
}).on('click', () => {
    console.log('clicked 1')
});

ee.emit('click');