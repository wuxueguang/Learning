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