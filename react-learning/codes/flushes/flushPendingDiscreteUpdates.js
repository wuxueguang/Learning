function flushPendingDiscreteUpdates() {
    if (rootsWithPendingDiscreteUpdates !== null) {
        // For each root with pending discrete updates, schedule a callback to
        // immediately flush them.
        var roots = rootsWithPendingDiscreteUpdates;
        rootsWithPendingDiscreteUpdates = null;
        roots.forEach(function (expirationTime, root) {
            markRootExpiredAtTime(root, expirationTime);
            ensureRootIsScheduled(root);
        }); // Now flush the immediate queue.

        flushSyncCallbackQueue();
    }
}