function unbatchedUpdates(fn, a) {
    var prevExecutionContext = executionContext;
    executionContext &= ~BatchedContext;
    executionContext |= LegacyUnbatchedContext;

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