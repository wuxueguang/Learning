function flushDiscreteUpdatesIfNeeded(timeStamp) {
    // event.timeStamp isn't overly reliable due to inconsistencies in
    // how different browsers have historically provided the time stamp.
    // Some browsers provide high-resolution time stamps for all events,
    // some provide low-resolution time stamps for all events. FF < 52
    // even mixes both time stamps together. Some browsers even report
    // negative time stamps or time stamps that are 0 (iOS9) in some cases.
    // Given we are only comparing two time stamps with equality (!==),
    // we are safe from the resolution differences. If the time stamp is 0
    // we bail-out of preventing the flush, which can affect semantics,
    // such as if an earlier flush removes or adds event listeners that
    // are fired in the subsequent flush. However, this is the same
    // behaviour as we had before this change, so the risks are low.
    if (!isInsideEventHandler && (!enableFlareAPI || timeStamp === 0 || lastFlushedEventTimeStamp !== timeStamp)) {
        lastFlushedEventTimeStamp = timeStamp;
        flushDiscreteUpdatesImpl();
    }
}