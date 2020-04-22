function createUpdate(expirationTime, suspenseConfig) {
    var update = {
        expirationTime: expirationTime,
        suspenseConfig: suspenseConfig,
        tag: UpdateState,
        payload: null,
        callback: null,
        next: null,
        nextEffect: null
    };

    {
        update.priority = getCurrentPriorityLevel();
    }

    return update;
}