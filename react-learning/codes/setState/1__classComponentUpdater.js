var classComponentUpdater = {
    isMounted: isMounted,

    enqueueSetState: function (inst, payload, callback) {
        var fiber = get(inst);
        var currentTime = requestCurrentTime();
        var suspenseConfig = requestCurrentSuspenseConfig();
        var expirationTime = computeExpirationForFiber(currentTime, fiber, suspenseConfig);
        var update = createUpdate(expirationTime, suspenseConfig);
        update.payload = payload;

        if (callback !== undefined && callback !== null) {
            {
                warnOnInvalidCallback$1(callback, 'setState');
            }

            update.callback = callback;
        }

        enqueueUpdate(fiber, update);
        scheduleWork(fiber, expirationTime);
    },
    
    enqueueReplaceState: function (inst, payload, callback) {
        var fiber = get(inst);
        var currentTime = requestCurrentTime();
        var suspenseConfig = requestCurrentSuspenseConfig();
        var expirationTime = computeExpirationForFiber(currentTime, fiber, suspenseConfig);
        var update = createUpdate(expirationTime, suspenseConfig);
        update.tag = ReplaceState;
        update.payload = payload;

        if (callback !== undefined && callback !== null) {
            {
                warnOnInvalidCallback$1(callback, 'replaceState');
            }

            update.callback = callback;
        }

        enqueueUpdate(fiber, update);
        scheduleWork(fiber, expirationTime);
    },
    enqueueForceUpdate: function (inst, callback) {
        var fiber = get(inst);
        var currentTime = requestCurrentTime();
        var suspenseConfig = requestCurrentSuspenseConfig();
        var expirationTime = computeExpirationForFiber(currentTime, fiber, suspenseConfig);
        var update = createUpdate(expirationTime, suspenseConfig);
        update.tag = ForceUpdate;

        if (callback !== undefined && callback !== null) {
            {
                warnOnInvalidCallback$1(callback, 'forceUpdate');
            }

            update.callback = callback;
        }

        enqueueUpdate(fiber, update);
        scheduleWork(fiber, expirationTime);
    }
};