function flushControlled(fn) {
    var prevExecutionContext = executionContext;
    executionContext |= BatchedContext;

    try {
        runWithPriority$2(ImmediatePriority, fn);
    } finally {
        executionContext = prevExecutionContext;

        if (executionContext === NoContext) {
            // Flush the immediate callbacks that were scheduled during this batch
            flushSyncCallbackQueue();
        }
    }
}