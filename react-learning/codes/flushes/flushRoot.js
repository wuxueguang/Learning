function flushRoot(root, expirationTime) {
    if ((executionContext & (RenderContext | CommitContext)) !== NoContext) {
        (function () {
            {
                {
                    throw ReactError(Error("work.commit(): Cannot commit while already rendering. This likely means you attempted to commit from inside a lifecycle method."));
                }
            }
        })();
    }

    markRootExpiredAtTime(root, expirationTime);
    ensureRootIsScheduled(root);
    flushSyncCallbackQueue();
}