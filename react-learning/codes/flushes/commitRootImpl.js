function commitRootImpl(root, renderPriorityLevel) {
    flushPassiveEffects();
    flushRenderPhaseStrictModeWarningsInDEV();

    (function () {
        if (!((executionContext & (RenderContext | CommitContext)) === NoContext)) {
            {
                throw ReactError(Error("Should not already be working."));
            }
        }
    })();

    var finishedWork = root.finishedWork;
    var expirationTime = root.finishedExpirationTime;

    if (finishedWork === null) {
        return null;
    }

    root.finishedWork = null;
    root.finishedExpirationTime = NoWork;

    (function () {
        if (!(finishedWork !== root.current)) {
            {
                throw ReactError(Error("Cannot commit the same tree as before. This error is likely caused by a bug in React. Please file an issue."));
            }
        }
    })(); // commitRoot never returns a continuation; it always finishes synchronously.
    // So we can clear these now to allow a new callback to be scheduled.


    root.callbackNode = null;
    root.callbackExpirationTime = NoWork;
    root.callbackPriority = NoPriority;
    root.nextKnownPendingLevel = NoWork;
    startCommitTimer(); // Update the first and last pending times on this root. The new first
    // pending time is whatever is left on the root fiber.

    var remainingExpirationTimeBeforeCommit = getRemainingExpirationTime(finishedWork);
    markRootFinishedAtTime(root, expirationTime, remainingExpirationTimeBeforeCommit);

    if (root === workInProgressRoot) {
        // We can reset these now that they are finished.
        workInProgressRoot = null;
        workInProgress = null;
        renderExpirationTime = NoWork;
    } else {} // This indicates that the last root we worked on is not the same one that
    // we're committing now. This most commonly happens when a suspended root
    // times out.
    // Get the list of effects.


    var firstEffect;

    if (finishedWork.effectTag > PerformedWork) {
        // A fiber's effect list consists only of its children, not itself. So if
        // the root has an effect, we need to add it to the end of the list. The
        // resulting list is the set that would belong to the root's parent, if it
        // had one; that is, all the effects in the tree including the root.
        if (finishedWork.lastEffect !== null) {
            finishedWork.lastEffect.nextEffect = finishedWork;
            firstEffect = finishedWork.firstEffect;
        } else {
            firstEffect = finishedWork;
        }
    } else {
        // There is no effect on the root.
        firstEffect = finishedWork.firstEffect;
    }

    if (firstEffect !== null) {
        var prevExecutionContext = executionContext;
        executionContext |= CommitContext;
        var prevInteractions = pushInteractions(root); // Reset this to null before calling lifecycles

        ReactCurrentOwner$2.current = null; // The commit phase is broken into several sub-phases. We do a separate pass
        // of the effect list for each phase: all mutation effects come before all
        // layout effects, and so on.
        // The first phase a "before mutation" phase. We use this phase to read the
        // state of the host tree right before we mutate it. This is where
        // getSnapshotBeforeUpdate is called.

        startCommitSnapshotEffectsTimer();
        prepareForCommit(root.containerInfo);
        nextEffect = firstEffect;

        do {
            {
                invokeGuardedCallback(null, commitBeforeMutationEffects, null);

                if (hasCaughtError()) {
                    (function () {
                        if (!(nextEffect !== null)) {
                            {
                                throw ReactError(Error("Should be working on an effect."));
                            }
                        }
                    })();

                    var error = clearCaughtError();
                    captureCommitPhaseError(nextEffect, error);
                    nextEffect = nextEffect.nextEffect;
                }
            }
        } while (nextEffect !== null);

        stopCommitSnapshotEffectsTimer();

        if (enableProfilerTimer) {
            // Mark the current commit time to be shared by all Profilers in this
            // batch. This enables them to be grouped later.
            recordCommitTime();
        } // The next phase is the mutation phase, where we mutate the host tree.


        startCommitHostEffectsTimer();
        nextEffect = firstEffect;

        do {
            {
                invokeGuardedCallback(null, commitMutationEffects, null, root, renderPriorityLevel);

                if (hasCaughtError()) {
                    (function () {
                        if (!(nextEffect !== null)) {
                            {
                                throw ReactError(Error("Should be working on an effect."));
                            }
                        }
                    })();

                    var _error = clearCaughtError();

                    captureCommitPhaseError(nextEffect, _error);
                    nextEffect = nextEffect.nextEffect;
                }
            }
        } while (nextEffect !== null);

        stopCommitHostEffectsTimer();
        resetAfterCommit(root.containerInfo); // The work-in-progress tree is now the current tree. This must come after
        // the mutation phase, so that the previous tree is still current during
        // componentWillUnmount, but before the layout phase, so that the finished
        // work is current during componentDidMount/Update.

        root.current = finishedWork; // The next phase is the layout phase, where we call effects that read
        // the host tree after it's been mutated. The idiomatic use case for this is
        // layout, but class component lifecycles also fire here for legacy reasons.

        startCommitLifeCyclesTimer();
        nextEffect = firstEffect;

        do {
            {
                invokeGuardedCallback(null, commitLayoutEffects, null, root, expirationTime);

                if (hasCaughtError()) {
                    (function () {
                        if (!(nextEffect !== null)) {
                            {
                                throw ReactError(Error("Should be working on an effect."));
                            }
                        }
                    })();

                    var _error2 = clearCaughtError();

                    captureCommitPhaseError(nextEffect, _error2);
                    nextEffect = nextEffect.nextEffect;
                }
            }
        } while (nextEffect !== null);

        stopCommitLifeCyclesTimer();
        nextEffect = null; // Tell Scheduler to yield at the end of the frame, so the browser has an
        // opportunity to paint.

        requestPaint();

        if (enableSchedulerTracing) {
            popInteractions(prevInteractions);
        }

        executionContext = prevExecutionContext;
    } else {
        // No effects.
        root.current = finishedWork; // Measure these anyway so the flamegraph explicitly shows that there were
        // no effects.
        // TODO: Maybe there's a better way to report this.

        startCommitSnapshotEffectsTimer();
        stopCommitSnapshotEffectsTimer();

        if (enableProfilerTimer) {
            recordCommitTime();
        }

        startCommitHostEffectsTimer();
        stopCommitHostEffectsTimer();
        startCommitLifeCyclesTimer();
        stopCommitLifeCyclesTimer();
    }

    stopCommitTimer();
    var rootDidHavePassiveEffects = rootDoesHavePassiveEffects;

    if (rootDoesHavePassiveEffects) {
        // This commit has passive effects. Stash a reference to them. But don't
        // schedule a callback until after flushing layout work.
        rootDoesHavePassiveEffects = false;
        rootWithPendingPassiveEffects = root;
        pendingPassiveEffectsExpirationTime = expirationTime;
        pendingPassiveEffectsRenderPriority = renderPriorityLevel;
    } else {
        // We are done with the effect chain at this point so let's clear the
        // nextEffect pointers to assist with GC. If we have passive effects, we'll
        // clear this in flushPassiveEffects.
        nextEffect = firstEffect;

        while (nextEffect !== null) {
            var nextNextEffect = nextEffect.nextEffect;
            nextEffect.nextEffect = null;
            nextEffect = nextNextEffect;
        }
    } // Check if there's remaining work on this root


    var remainingExpirationTime = root.firstPendingTime;

    if (remainingExpirationTime !== NoWork) {
        if (enableSchedulerTracing) {
            if (spawnedWorkDuringRender !== null) {
                var expirationTimes = spawnedWorkDuringRender;
                spawnedWorkDuringRender = null;

                for (var i = 0; i < expirationTimes.length; i++) {
                    scheduleInteractions(root, expirationTimes[i], root.memoizedInteractions);
                }
            }

            schedulePendingInteractions(root, remainingExpirationTime);
        }
    } else {
        // If there's no remaining work, we can clear the set of already failed
        // error boundaries.
        legacyErrorBoundariesThatAlreadyFailed = null;
    }

    if (enableSchedulerTracing) {
        if (!rootDidHavePassiveEffects) {
            // If there are no passive effects, then we can complete the pending interactions.
            // Otherwise, we'll wait until after the passive effects are flushed.
            // Wait to do this until after remaining work has been scheduled,
            // so that we don't prematurely signal complete for interactions when there's e.g. hidden work.
            finishPendingInteractions(root, expirationTime);
        }
    }

    if (remainingExpirationTime === Sync) {
        // Count the number of times the root synchronously re-renders without
        // finishing. If there are too many, it indicates an infinite update loop.
        if (root === rootWithNestedUpdates) {
            nestedUpdateCount++;
        } else {
            nestedUpdateCount = 0;
            rootWithNestedUpdates = root;
        }
    } else {
        nestedUpdateCount = 0;
    }

    onCommitRoot(finishedWork.stateNode, expirationTime); // Always call this before exiting `commitRoot`, to ensure that any
    // additional work on this root is scheduled.

    ensureRootIsScheduled(root);

    if (hasUncaughtError) {
        hasUncaughtError = false;
        var _error3 = firstUncaughtError;
        firstUncaughtError = null;
        throw _error3;
    }

    if ((executionContext & LegacyUnbatchedContext) !== NoContext) {
        // This is a legacy edge case. We just committed the initial mount of
        // a ReactDOM.render-ed root inside of batchedUpdates. The commit fired
        // synchronously, but layout updates should be deferred until the end
        // of the batch.
        return null;
    } // If layout work was scheduled, flush it now.


    flushSyncCallbackQueue();
    return null;
}