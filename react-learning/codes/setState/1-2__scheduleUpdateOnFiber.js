function scheduleUpdateOnFiber(fiber, expirationTime) {
    checkForNestedUpdates();
    warnAboutInvalidUpdatesOnClassComponentsInDEV(fiber);
    var root = markUpdateTimeFromFiberToRoot(fiber, expirationTime);

    if (root === null) {
        warnAboutUpdateOnUnmountedFiberInDEV(fiber);
        return;
    }

    checkForInterruption(fiber, expirationTime);
    recordScheduleUpdate(); // TODO: computeExpirationForFiber also reads the priority. Pass the
    // priority as an argument to that function and this one.

    var priorityLevel = getCurrentPriorityLevel();

    if (expirationTime === Sync) {
        if ( // Check if we're inside unbatchedUpdates
            (executionContext & LegacyUnbatchedContext) !== NoContext && // Check if we're not already rendering
            (executionContext & (RenderContext | CommitContext)) === NoContext) {
            // Register pending interactions on the root to avoid losing traced interaction data.
            schedulePendingInteractions(root, expirationTime); // This is a legacy edge case. The initial mount of a ReactDOM.render-ed
            // root inside of batchedUpdates should be synchronous, but layout updates
            // should be deferred until the end of the batch.

            performSyncWorkOnRoot(root);
        } else {
            ensureRootIsScheduled(root);
            schedulePendingInteractions(root, expirationTime);

            if (executionContext === NoContext) {
                // Flush the synchronous work now, unless we're already working or inside
                // a batch. This is intentionally inside scheduleUpdateOnFiber instead of
                // scheduleCallbackForFiber to preserve the ability to schedule a callback
                // without immediately flushing it. We only do this for user-initiated
                // updates, to preserve historical behavior of sync mode.
                flushSyncCallbackQueue();
            }
        }
    } else {
        ensureRootIsScheduled(root);
        schedulePendingInteractions(root, expirationTime);
    }

    if ((executionContext & DiscreteEventContext) !== NoContext && ( // Only updates at user-blocking priority or greater are considered
            // discrete, even inside a discrete event.
            priorityLevel === UserBlockingPriority$2 || priorityLevel === ImmediatePriority)) {
        // This is the result of a discrete event. Track the lowest priority
        // discrete update per root so we can flush them early, if needed.
        if (rootsWithPendingDiscreteUpdates === null) {
            rootsWithPendingDiscreteUpdates = new Map([
                [root, expirationTime]
            ]);
        } else {
            var lastDiscreteTime = rootsWithPendingDiscreteUpdates.get(root);

            if (lastDiscreteTime === undefined || lastDiscreteTime > expirationTime) {
                rootsWithPendingDiscreteUpdates.set(root, expirationTime);
            }
        }
    }
}