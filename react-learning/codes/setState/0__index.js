

function dispatchDiscreteEvent(topLevelType, eventSystemFlags, nativeEvent) {
    flushDiscreteUpdatesIfNeeded(nativeEvent.timeStamp);
    discreteUpdates(dispatchEvent, topLevelType, eventSystemFlags, nativeEvent);
}

function discreteUpdates(fn, a, b, c) {
    var prevIsInsideEventHandler = isInsideEventHandler;
    isInsideEventHandler = true;

    try {
        return discreteUpdatesImpl(fn, a, b, c);
    } finally {
        isInsideEventHandler = prevIsInsideEventHandler;

        if (!isInsideEventHandler) {
            finishEventHandler();
        }
    }
}

function discreteUpdates$1(fn, a, b, c) {
    var prevExecutionContext = executionContext;
    executionContext |= DiscreteEventContext;

    try {
        // Should this
        return runWithPriority$2(UserBlockingPriority$2, fn.bind(null, a, b, c));
    } finally {
        executionContext = prevExecutionContext;

        if (executionContext === NoContext) {
            // Flush the immediate callbacks that were scheduled during this batch
            flushSyncCallbackQueue();
        }
    }
}

function runWithPriority$2(reactPriorityLevel, fn) {
    var priorityLevel = reactPriorityToSchedulerPriority(reactPriorityLevel);
    return Scheduler_runWithPriority(priorityLevel, fn);
}

function unstable_runWithPriority(priorityLevel, eventHandler) {
    switch (priorityLevel) {
        case ImmediatePriority:
        case UserBlockingPriority:
        case NormalPriority:
        case LowPriority:
        case IdlePriority:
            break;

        default:
            priorityLevel = NormalPriority;
    }

    var previousPriorityLevel = currentPriorityLevel;
    currentPriorityLevel = priorityLevel;

    try {
        return eventHandler();
    } finally {
        currentPriorityLevel = previousPriorityLevel;
    }
}

///////////////////////*************************/////////////////////
function dispatchEvent(topLevelType, eventSystemFlags, nativeEvent) {
    if (!_enabled) {
        return;
    }

    if (hasQueuedDiscreteEvents() && isReplayableDiscreteEvent(topLevelType)) {
        // If we already have a queue of discrete events, and this is another discrete
        // event, then we can't dispatch it regardless of its target, since they
        // need to dispatch in order.
        queueDiscreteEvent(null, // Flags that we're not actually blocked on anything as far as we know.
            topLevelType, eventSystemFlags, nativeEvent);
        return;
    }

    var blockedOn = attemptToDispatchEvent(topLevelType, eventSystemFlags, nativeEvent);

    if (blockedOn === null) {
        // We successfully dispatched this event.
        clearIfContinuousEvent(topLevelType, nativeEvent);
        return;
    }

    if (isReplayableDiscreteEvent(topLevelType)) {
        // This this to be replayed later once the target is available.
        queueDiscreteEvent(blockedOn, topLevelType, eventSystemFlags, nativeEvent);
        return;
    }

    if (queueIfContinuousEvent(blockedOn, topLevelType, eventSystemFlags, nativeEvent)) {
        return;
    } // We need to clear only if we didn't queue because
    // queueing is accummulative.


    clearIfContinuousEvent(topLevelType, nativeEvent); // This is not replayable so we'll invoke it but without a target,
    // in case the event system needs to trace it.

    if (enableFlareAPI) {
        if (eventSystemFlags & PLUGIN_EVENT_SYSTEM) {
            dispatchEventForPluginEventSystem(topLevelType, eventSystemFlags, nativeEvent, null);
        }

        if (eventSystemFlags & RESPONDER_EVENT_SYSTEM) {
            // React Flare event system
            dispatchEventForResponderEventSystem(topLevelType, null, nativeEvent, getEventTarget(nativeEvent), eventSystemFlags);
        }
    } else {
        dispatchEventForPluginEventSystem(topLevelType, eventSystemFlags, nativeEvent, null);
    }
} // Attempt dispatching an event. Returns a SuspenseInstance or Container if it's blocked.

function attemptToDispatchEvent(topLevelType, eventSystemFlags, nativeEvent) {
    // TODO: Warn if _enabled is false.
    var nativeEventTarget = getEventTarget(nativeEvent);
    var targetInst = getClosestInstanceFromNode(nativeEventTarget);

    if (targetInst !== null) {
        var nearestMounted = getNearestMountedFiber(targetInst);

        if (nearestMounted === null) {
            // This tree has been unmounted already. Dispatch without a target.
            targetInst = null;
        } else {
            var tag = nearestMounted.tag;

            if (tag === SuspenseComponent) {
                var instance = getSuspenseInstanceFromFiber(nearestMounted);

                if (instance !== null) {
                    // Queue the event to be replayed later. Abort dispatching since we
                    // don't want this event dispatched twice through the event system.
                    // TODO: If this is the first discrete event in the queue. Schedule an increased
                    // priority for this boundary.
                    return instance;
                } // This shouldn't happen, something went wrong but to avoid blocking
                // the whole system, dispatch the event without a target.
                // TODO: Warn.


                targetInst = null;
            } else if (tag === HostRoot) {
                var root = nearestMounted.stateNode;

                if (root.hydrate) {
                    // If this happens during a replay something went wrong and it might block
                    // the whole system.
                    return getContainerFromFiber(nearestMounted);
                }

                targetInst = null;
            } else if (nearestMounted !== targetInst) {
                // If we get an event (ex: img onload) before committing that
                // component's mount, ignore it for now (that is, treat it as if it was an
                // event on a non-React tree). We might also consider queueing events and
                // dispatching them after the mount.
                targetInst = null;
            }
        }
    }

    if (enableFlareAPI) {
        if (eventSystemFlags & PLUGIN_EVENT_SYSTEM) {
            dispatchEventForPluginEventSystem(topLevelType, eventSystemFlags, nativeEvent, targetInst);
        }

        if (eventSystemFlags & RESPONDER_EVENT_SYSTEM) {
            // React Flare event system
            dispatchEventForResponderEventSystem(topLevelType, targetInst, nativeEvent, nativeEventTarget, eventSystemFlags);
        }
    } else {
        dispatchEventForPluginEventSystem(topLevelType, eventSystemFlags, nativeEvent, targetInst);
    } // We're not blocked on anything.


    return null;
}

function dispatchEventForPluginEventSystem(topLevelType, eventSystemFlags, nativeEvent, targetInst) {
    var bookKeeping = getTopLevelCallbackBookKeeping(topLevelType, nativeEvent, targetInst, eventSystemFlags);

    try {
        // Event queue being processed in the same cycle allows
        // `preventDefault`.
        batchedEventUpdates(handleTopLevel, bookKeeping);
    } finally {
        releaseTopLevelCallbackBookKeeping(bookKeeping);
    }
}

function batchedEventUpdates(fn, a, b) {
    if (isBatchingEventUpdates) {
        // If we are currently inside another batch, we need to wait until it
        // fully completes before restoring state.
        return fn(a, b);
    }

    isBatchingEventUpdates = true;

    try {
        return batchedEventUpdatesImpl(fn, a, b);
    } finally {
        isBatchingEventUpdates = false;
        finishEventHandler();
    }
} // This is for the React Flare event system

function batchedEventUpdates$1(fn, a) {
    var prevExecutionContext = executionContext;
    executionContext |= EventContext;

    try {
        return fn(a);
    } finally {
        executionContext = prevExecutionContext;

        if (executionContext === NoContext) {
            // Flush the immediate callbacks that were scheduled during this batch
            flushSyncCallbackQueue();
        }
    }
}

function handleTopLevel(bookKeeping) {
    var targetInst = bookKeeping.targetInst; // Loop through the hierarchy, in case there's any nested components.
    // It's important that we build the array of ancestors before calling any
    // event handlers, because event handlers can modify the DOM, leading to
    // inconsistencies with ReactMount's node cache. See #1105.

    var ancestor = targetInst;

    do {
        if (!ancestor) {
            var ancestors = bookKeeping.ancestors;
            ancestors.push(ancestor);
            break;
        }

        var root = findRootContainerNode(ancestor);

        if (!root) {
            break;
        }

        var tag = ancestor.tag;

        if (tag === HostComponent || tag === HostText) {
            bookKeeping.ancestors.push(ancestor);
        }

        ancestor = getClosestInstanceFromNode(root);
    } while (ancestor);

    for (var i = 0; i < bookKeeping.ancestors.length; i++) {
        targetInst = bookKeeping.ancestors[i];
        var eventTarget = getEventTarget(bookKeeping.nativeEvent);
        var topLevelType = bookKeeping.topLevelType;
        var nativeEvent = bookKeeping.nativeEvent;
        runExtractedPluginEventsInBatch(topLevelType, targetInst, nativeEvent, eventTarget, bookKeeping.eventSystemFlags);
    }
} // TODO: can we stop exporting these?

function runExtractedPluginEventsInBatch(topLevelType, targetInst, nativeEvent, nativeEventTarget, eventSystemFlags) {
    var events = extractPluginEvents(topLevelType, targetInst, nativeEvent, nativeEventTarget, eventSystemFlags);
    runEventsInBatch(events);
}

function runEventsInBatch(events) {
    if (events !== null) {
        eventQueue = accumulateInto(eventQueue, events);
    } // Set `eventQueue` to null before processing it so that we can tell if more
    // events get enqueued while processing.


    var processingEventQueue = eventQueue;
    eventQueue = null;

    if (!processingEventQueue) {
        return;
    }

    forEachAccumulated(processingEventQueue, executeDispatchesAndReleaseTopLevel);

    (function () {
        if (!!eventQueue) {
            {
                throw ReactError(Error("processEventQueue(): Additional events were enqueued while processing an event queue. Support for this has not yet been implemented."));
            }
        }
    })(); // This would be a good time to rethrow if any of the event handlers threw.


    rethrowCaughtError();
}

function forEachAccumulated(arr, cb, scope) {
    if (Array.isArray(arr)) {
        arr.forEach(cb, scope);
    } else if (arr) {
        cb.call(scope, arr);
    }
}

var executeDispatchesAndReleaseTopLevel = function (e) {
    return executeDispatchesAndRelease(e);
};

var executeDispatchesAndRelease = function (event) {
    if (event) {
        executeDispatchesInOrder(event);

        if (!event.isPersistent()) {
            event.constructor.release(event);
        }
    }
};

function executeDispatchesInOrder(event) {
    var dispatchListeners = event._dispatchListeners;
    var dispatchInstances = event._dispatchInstances;

    {
        validateEventDispatches(event);
    }

    if (Array.isArray(dispatchListeners)) {
        for (var i = 0; i < dispatchListeners.length; i++) {
            if (event.isPropagationStopped()) {
                break;
            } // Listeners and Instances are two parallel arrays that are always in sync.


            executeDispatch(event, dispatchListeners[i], dispatchInstances[i]);
        }
    } else if (dispatchListeners) {
        executeDispatch(event, dispatchListeners, dispatchInstances);
    }

    event._dispatchListeners = null;
    event._dispatchInstances = null;
}

function executeDispatch(event, listener, inst) {
    var type = event.type || 'unknown-event';
    event.currentTarget = getNodeFromInstance(inst);
    invokeGuardedCallbackAndCatchFirstError(type, listener, undefined, event);
    event.currentTarget = null;
}

function invokeGuardedCallbackAndCatchFirstError(name, func, context, a, b, c, d, e, f) {
    invokeGuardedCallback.apply(this, arguments);

    if (hasError) {
        var error = clearCaughtError();

        if (!hasRethrowError) {
            hasRethrowError = true;
            rethrowError = error;
        }
    }
}


function invokeGuardedCallback(name, func, context, a, b, c, d, e, f) {
    hasError = false;
    caughtError = null;
    invokeGuardedCallbackImpl$1.apply(reporter, arguments);
}

{
    // In DEV mode, we swap out invokeGuardedCallback for a special version
    // that plays more nicely with the browser's DevTools. The idea is to preserve
    // "Pause on exceptions" behavior. Because React wraps all user-provided
    // functions in invokeGuardedCallback, and the production version of
    // invokeGuardedCallback uses a try-catch, all user exceptions are treated
    // like caught exceptions, and the DevTools won't pause unless the developer
    // takes the extra step of enabling pause on caught exceptions. This is
    // unintuitive, though, because even though React has caught the error, from
    // the developer's perspective, the error is uncaught.
    //
    // To preserve the expected "Pause on exceptions" behavior, we don't use a
    // try-catch in DEV. Instead, we synchronously dispatch a fake event to a fake
    // DOM node, and call the user-provided callback from inside an event handler
    // for that fake event. If the callback throws, the error is "captured" using
    // a global event handler. But because the error happens in a different
    // event loop context, it does not interrupt the normal program flow.
    // Effectively, this gives us try-catch behavior without actually using
    // try-catch. Neat!
    // Check that the browser supports the APIs we need to implement our special
    // DEV version of invokeGuardedCallback
    if (typeof window !== 'undefined' && typeof window.dispatchEvent === 'function' && typeof document !== 'undefined' && typeof document.createEvent === 'function') {
        var fakeNode = document.createElement('react');

        var invokeGuardedCallbackDev = function (name, func, context, a, b, c, d, e, f) {
            // If document doesn't exist we know for sure we will crash in this method
            // when we call document.createEvent(). However this can cause confusing
            // errors: https://github.com/facebookincubator/create-react-app/issues/3482
            // So we preemptively throw with a better message instead.
            (function () {
                if (!(typeof document !== 'undefined')) {
                    {
                        throw ReactError(Error("The `document` global was defined when React was initialized, but is not defined anymore. This can happen in a test environment if a component schedules an update from an asynchronous callback, but the test has already finished running. To solve this, you can either unmount the component at the end of your test (and ensure that any asynchronous operations get canceled in `componentWillUnmount`), or you can change the test itself to be asynchronous."));
                    }
                }
            })();

            var evt = document.createEvent('Event'); // Keeps track of whether the user-provided callback threw an error. We
            // set this to true at the beginning, then set it to false right after
            // calling the function. If the function errors, `didError` will never be
            // set to false. This strategy works even if the browser is flaky and
            // fails to call our global error handler, because it doesn't rely on
            // the error event at all.

            var didError = true; // Keeps track of the value of window.event so that we can reset it
            // during the callback to let user code access window.event in the
            // browsers that support it.

            var windowEvent = window.event; // Keeps track of the descriptor of window.event to restore it after event
            // dispatching: https://github.com/facebook/react/issues/13688

            var windowEventDescriptor = Object.getOwnPropertyDescriptor(window, 'event'); // Create an event handler for our fake event. We will synchronously
            // dispatch our fake event using `dispatchEvent`. Inside the handler, we
            // call the user-provided callback.

            var funcArgs = Array.prototype.slice.call(arguments, 3);

            function callCallback() {
                // We immediately remove the callback from event listeners so that
                // nested `invokeGuardedCallback` calls do not clash. Otherwise, a
                // nested call would trigger the fake event handlers of any call higher
                // in the stack.
                fakeNode.removeEventListener(evtType, callCallback, false); // We check for window.hasOwnProperty('event') to prevent the
                // window.event assignment in both IE <= 10 as they throw an error
                // "Member not found" in strict mode, and in Firefox which does not
                // support window.event.

                if (typeof window.event !== 'undefined' && window.hasOwnProperty('event')) {
                    window.event = windowEvent;
                }

                func.apply(context, funcArgs);
                didError = false;
            } // Create a global error event handler. We use this to capture the value
            // that was thrown. It's possible that this error handler will fire more
            // than once; for example, if non-React code also calls `dispatchEvent`
            // and a handler for that event throws. We should be resilient to most of
            // those cases. Even if our error event handler fires more than once, the
            // last error event is always used. If the callback actually does error,
            // we know that the last error event is the correct one, because it's not
            // possible for anything else to have happened in between our callback
            // erroring and the code that follows the `dispatchEvent` call below. If
            // the callback doesn't error, but the error event was fired, we know to
            // ignore it because `didError` will be false, as described above.


            var error; // Use this to track whether the error event is ever called.

            var didSetError = false;
            var isCrossOriginError = false;

            function handleWindowError(event) {
                error = event.error;
                didSetError = true;

                if (error === null && event.colno === 0 && event.lineno === 0) {
                    isCrossOriginError = true;
                }

                if (event.defaultPrevented) {
                    // Some other error handler has prevented default.
                    // Browsers silence the error report if this happens.
                    // We'll remember this to later decide whether to log it or not.
                    if (error != null && typeof error === 'object') {
                        try {
                            error._suppressLogging = true;
                        } catch (inner) { // Ignore.
                        }
                    }
                }
            } // Create a fake event type.


            var evtType = "react-" + (name ? name : 'invokeguardedcallback'); // Attach our event handlers

            window.addEventListener('error', handleWindowError);
            fakeNode.addEventListener(evtType, callCallback, false); // Synchronously dispatch our fake event. If the user-provided function
            // errors, it will trigger our global error handler.

            evt.initEvent(evtType, false, false);
            fakeNode.dispatchEvent(evt);

            if (windowEventDescriptor) {
                Object.defineProperty(window, 'event', windowEventDescriptor);
            }

            if (didError) {
                if (!didSetError) {
                    // The callback errored, but the error event never fired.
                    error = new Error('An error was thrown inside one of your components, but React ' + "doesn't know what it was. This is likely due to browser " + 'flakiness. React does its best to preserve the "Pause on ' + 'exceptions" behavior of the DevTools, which requires some ' + "DEV-mode only tricks. It's possible that these don't work in " + 'your browser. Try triggering the error in production mode, ' + 'or switching to a modern browser. If you suspect that this is ' + 'actually an issue with React, please file an issue.');
                } else if (isCrossOriginError) {
                    error = new Error("A cross-origin error was thrown. React doesn't have access to " + 'the actual error object in development. ' + 'See https://fb.me/react-crossorigin-error for more information.');
                }

                this.onError(error);
            } // Remove our event listeners


            window.removeEventListener('error', handleWindowError);
        };

        invokeGuardedCallbackImpl = invokeGuardedCallbackDev;
    }
}




Component.prototype.setState = function (partialState, callback) {
    (function () {
        if (!(typeof partialState === 'object' || typeof partialState === 'function' || partialState == null)) {
            {
                throw ReactError(Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables."));
            }
        }
    })();

    this.updater.enqueueSetState(this, partialState, callback, 'setState');
};