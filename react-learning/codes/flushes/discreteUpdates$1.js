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