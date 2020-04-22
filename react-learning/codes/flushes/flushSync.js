function flushSync(fn, a) {
    if ((executionContext & (RenderContext | CommitContext)) !== NoContext) {
        (function () {
            {
                {
                    throw ReactError(Error("flushSync was called from inside a lifecycle method. It cannot be called when React is already rendering."));
                }
            }
        })();
    }

    var prevExecutionContext = executionContext;
    executionContext |= BatchedContext;

    try {
        return runWithPriority$2(ImmediatePriority, fn.bind(null, a));
    } finally {
        executionContext = prevExecutionContext; // Flush the immediate callbacks that were scheduled during this batch.
        // Note that this will happen even if batchedUpdates is higher up
        // the stack.

        flushSyncCallbackQueue();
    }
}