function flushPassiveEffectsImpl() {
    if (rootWithPendingPassiveEffects === null) {
        return false;
    }

    var root = rootWithPendingPassiveEffects;
    var expirationTime = pendingPassiveEffectsExpirationTime;
    rootWithPendingPassiveEffects = null;
    pendingPassiveEffectsExpirationTime = NoWork;

    (function () {
        if (!((executionContext & (RenderContext | CommitContext)) === NoContext)) {
            {
                throw ReactError(Error("Cannot flush passive effects while already rendering."));
            }
        }
    })();

    var prevExecutionContext = executionContext;
    executionContext |= CommitContext;
    var prevInteractions = pushInteractions(root); // Note: This currently assumes there are no passive effects on the root
    // fiber, because the root is not part of its own effect list. This could
    // change in the future.

    var effect = root.current.firstEffect;

    while (effect !== null) {
        {
            setCurrentFiber(effect);
            invokeGuardedCallback(null, commitPassiveHookEffects, null, effect);

            if (hasCaughtError()) {
                (function () {
                    if (!(effect !== null)) {
                        {
                            throw ReactError(Error("Should be working on an effect."));
                        }
                    }
                })();

                var error = clearCaughtError();
                captureCommitPhaseError(effect, error);
            }

            resetCurrentFiber();
        }

        var nextNextEffect = effect.nextEffect; // Remove nextEffect pointer to assist GC

        effect.nextEffect = null;
        effect = nextNextEffect;
    }

    if (enableSchedulerTracing) {
        popInteractions(prevInteractions);
        finishPendingInteractions(root, expirationTime);
    }

    executionContext = prevExecutionContext;
    flushSyncCallbackQueue(); // If additional passive effects were scheduled, increment a counter. If this
    // exceeds the limit, we'll fire a warning.

    nestedPassiveUpdateCount = rootWithPendingPassiveEffects === null ? 0 : nestedPassiveUpdateCount + 1;
    return true;
}