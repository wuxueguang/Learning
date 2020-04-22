function enqueueUpdate(fiber, update) {
    // Update queues are created lazily.
    var alternate = fiber.alternate;
    var queue1;
    var queue2;

    if (alternate === null) {
        // There's only one fiber.
        queue1 = fiber.updateQueue;
        queue2 = null;

        if (queue1 === null) {
            queue1 = fiber.updateQueue = createUpdateQueue(fiber.memoizedState);
        }
    } else {
        // There are two owners.
        queue1 = fiber.updateQueue;
        queue2 = alternate.updateQueue;

        if (queue1 === null) {
            if (queue2 === null) {
                // Neither fiber has an update queue. Create new ones.
                queue1 = fiber.updateQueue = createUpdateQueue(fiber.memoizedState);
                queue2 = alternate.updateQueue = createUpdateQueue(alternate.memoizedState);
            } else {
                // Only one fiber has an update queue. Clone to create a new one.
                queue1 = fiber.updateQueue = cloneUpdateQueue(queue2);
            }
        } else {
            if (queue2 === null) {
                // Only one fiber has an update queue. Clone to create a new one.
                queue2 = alternate.updateQueue = cloneUpdateQueue(queue1);
            } else { // Both owners have an update queue.
            }
        }
    }

    if (queue2 === null || queue1 === queue2) {
        // There's only a single queue.
        appendUpdateToQueue(queue1, update);
    } else {
        // There are two queues. We need to append the update to both queues,
        // while accounting for the persistent structure of the list — we don't
        // want the same update to be added multiple times.
        if (queue1.lastUpdate === null || queue2.lastUpdate === null) {
            // One of the queues is not empty. We must add the update to both queues.
            appendUpdateToQueue(queue1, update);
            appendUpdateToQueue(queue2, update);
        } else {
            // Both queues are non-empty. The last update is the same in both lists,
            // because of structural sharing. So, only append to one of the lists.
            appendUpdateToQueue(queue1, update); // But we still need to update the `lastUpdate` pointer of queue2.

            queue2.lastUpdate = update;
        }
    }

    {
        if (fiber.tag === ClassComponent && (currentlyProcessingQueue === queue1 || queue2 !== null && currentlyProcessingQueue === queue2) && !didWarnUpdateInsideUpdate) {
            warningWithoutStack$1(false, 'An update (setState, replaceState, or forceUpdate) was scheduled ' + 'from inside an update function. Update functions should be pure, ' + 'with zero side-effects. Consider using componentDidUpdate or a ' + 'callback.');
            didWarnUpdateInsideUpdate = true;
        }
    }
}