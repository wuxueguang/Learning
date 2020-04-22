function beginWork$1(current$$1, workInProgress, renderExpirationTime) {
    var updateExpirationTime = workInProgress.expirationTime;

    {
        if (workInProgress._debugNeedsRemount && current$$1 !== null) {
            // This will restart the begin phase with a new fiber.
            return remountFiber(current$$1, workInProgress, createFiberFromTypeAndProps(workInProgress.type, workInProgress.key, workInProgress.pendingProps, workInProgress._debugOwner || null, workInProgress.mode, workInProgress.expirationTime));
        }
    }

    if (current$$1 !== null) {
        var oldProps = current$$1.memoizedProps;
        var newProps = workInProgress.pendingProps;

        if (oldProps !== newProps || hasContextChanged() || ( // Force a re-render if the implementation changed due to hot reload:
                workInProgress.type !== current$$1.type)) {
            // If props or context changed, mark the fiber as having performed work.
            // This may be unset if the props are determined to be equal later (memo).
            didReceiveUpdate = true;
        } else if (updateExpirationTime < renderExpirationTime) {
            didReceiveUpdate = false; // This fiber does not have any pending work. Bailout without entering
            // the begin phase. There's still some bookkeeping we that needs to be done
            // in this optimized path, mostly pushing stuff onto the stack.

            switch (workInProgress.tag) {
                case HostRoot:
                    pushHostRootContext(workInProgress);
                    resetHydrationState();
                    break;

                case HostComponent:
                    pushHostContext(workInProgress);

                    if (workInProgress.mode & ConcurrentMode && renderExpirationTime !== Never && shouldDeprioritizeSubtree(workInProgress.type, newProps)) {
                        if (enableSchedulerTracing) {
                            markSpawnedWork(Never);
                        } // Schedule this fiber to re-render at offscreen priority. Then bailout.


                        workInProgress.expirationTime = workInProgress.childExpirationTime = Never;
                        return null;
                    }

                    break;

                case ClassComponent: {
                    var Component = workInProgress.type;

                    if (isContextProvider(Component)) {
                        pushContextProvider(workInProgress);
                    }

                    break;
                }

                case HostPortal:
                    pushHostContainer(workInProgress, workInProgress.stateNode.containerInfo);
                    break;

                case ContextProvider: {
                    var newValue = workInProgress.memoizedProps.value;
                    pushProvider(workInProgress, newValue);
                    break;
                }

                case Profiler:
                    if (enableProfilerTimer) {
                        workInProgress.effectTag |= Update;
                    }

                    break;

                case SuspenseComponent: {
                    var state = workInProgress.memoizedState;

                    if (state !== null) {
                        if (enableSuspenseServerRenderer) {
                            if (state.dehydrated !== null) {
                                pushSuspenseContext(workInProgress, setDefaultShallowSuspenseContext(suspenseStackCursor.current)); // We know that this component will suspend again because if it has
                                // been unsuspended it has committed as a resolved Suspense component.
                                // If it needs to be retried, it should have work scheduled on it.

                                workInProgress.effectTag |= DidCapture;
                                break;
                            }
                        } // If this boundary is currently timed out, we need to decide
                        // whether to retry the primary children, or to skip over it and
                        // go straight to the fallback. Check the priority of the primary
                        // child fragment.


                        var primaryChildFragment = workInProgress.child;
                        var primaryChildExpirationTime = primaryChildFragment.childExpirationTime;

                        if (primaryChildExpirationTime !== NoWork && primaryChildExpirationTime >= renderExpirationTime) {
                            // The primary children have pending work. Use the normal path
                            // to attempt to render the primary children again.
                            return updateSuspenseComponent(current$$1, workInProgress, renderExpirationTime);
                        } else {
                            pushSuspenseContext(workInProgress, setDefaultShallowSuspenseContext(suspenseStackCursor.current)); // The primary children do not have pending work with sufficient
                            // priority. Bailout.

                            var child = bailoutOnAlreadyFinishedWork(current$$1, workInProgress, renderExpirationTime);

                            if (child !== null) {
                                // The fallback children have pending work. Skip over the
                                // primary children and work on the fallback.
                                return child.sibling;
                            } else {
                                return null;
                            }
                        }
                    } else {
                        pushSuspenseContext(workInProgress, setDefaultShallowSuspenseContext(suspenseStackCursor.current));
                    }

                    break;
                }

                case SuspenseListComponent: {
                    var didSuspendBefore = (current$$1.effectTag & DidCapture) !== NoEffect;
                    var hasChildWork = workInProgress.childExpirationTime >= renderExpirationTime;

                    if (didSuspendBefore) {
                        if (hasChildWork) {
                            // If something was in fallback state last time, and we have all the
                            // same children then we're still in progressive loading state.
                            // Something might get unblocked by state updates or retries in the
                            // tree which will affect the tail. So we need to use the normal
                            // path to compute the correct tail.
                            return updateSuspenseListComponent(current$$1, workInProgress, renderExpirationTime);
                        } // If none of the children had any work, that means that none of
                        // them got retried so they'll still be blocked in the same way
                        // as before. We can fast bail out.


                        workInProgress.effectTag |= DidCapture;
                    } // If nothing suspended before and we're rendering the same children,
                    // then the tail doesn't matter. Anything new that suspends will work
                    // in the "together" mode, so we can continue from the state we had.


                    var renderState = workInProgress.memoizedState;

                    if (renderState !== null) {
                        // Reset to the "together" mode in case we've started a different
                        // update in the past but didn't complete it.
                        renderState.rendering = null;
                        renderState.tail = null;
                    }

                    pushSuspenseContext(workInProgress, suspenseStackCursor.current);

                    if (hasChildWork) {
                        break;
                    } else {
                        // If none of the children had any work, that means that none of
                        // them got retried so they'll still be blocked in the same way
                        // as before. We can fast bail out.
                        return null;
                    }
                }
            }

            return bailoutOnAlreadyFinishedWork(current$$1, workInProgress, renderExpirationTime);
        } else {
            // An update was scheduled on this fiber, but there are no new props
            // nor legacy context. Set this to false. If an update queue or context
            // consumer produces a changed value, it will set this to true. Otherwise,
            // the component will assume the children have not changed and bail out.
            didReceiveUpdate = false;
        }
    } else {
        didReceiveUpdate = false;
    } // Before entering the begin phase, clear the expiration time.


    workInProgress.expirationTime = NoWork;

    switch (workInProgress.tag) {
        case IndeterminateComponent: {
            return mountIndeterminateComponent(current$$1, workInProgress, workInProgress.type, renderExpirationTime);
        }

        case LazyComponent: {
            var elementType = workInProgress.elementType;
            return mountLazyComponent(current$$1, workInProgress, elementType, updateExpirationTime, renderExpirationTime);
        }

        case FunctionComponent: {
            var _Component = workInProgress.type;
            var unresolvedProps = workInProgress.pendingProps;
            var resolvedProps = workInProgress.elementType === _Component ? unresolvedProps : resolveDefaultProps(_Component, unresolvedProps);
            return updateFunctionComponent(current$$1, workInProgress, _Component, resolvedProps, renderExpirationTime);
        }

        case ClassComponent: {
            var _Component2 = workInProgress.type;
            var _unresolvedProps = workInProgress.pendingProps;

            var _resolvedProps = workInProgress.elementType === _Component2 ? _unresolvedProps : resolveDefaultProps(_Component2, _unresolvedProps);

            return updateClassComponent(current$$1, workInProgress, _Component2, _resolvedProps, renderExpirationTime);
        }

        case HostRoot:
            return updateHostRoot(current$$1, workInProgress, renderExpirationTime);

        case HostComponent:
            return updateHostComponent(current$$1, workInProgress, renderExpirationTime);

        case HostText:
            return updateHostText(current$$1, workInProgress);

        case SuspenseComponent:
            return updateSuspenseComponent(current$$1, workInProgress, renderExpirationTime);

        case HostPortal:
            return updatePortalComponent(current$$1, workInProgress, renderExpirationTime);

        case ForwardRef: {
            var type = workInProgress.type;
            var _unresolvedProps2 = workInProgress.pendingProps;

            var _resolvedProps2 = workInProgress.elementType === type ? _unresolvedProps2 : resolveDefaultProps(type, _unresolvedProps2);

            return updateForwardRef(current$$1, workInProgress, type, _resolvedProps2, renderExpirationTime);
        }

        case Fragment:
            return updateFragment(current$$1, workInProgress, renderExpirationTime);

        case Mode:
            return updateMode(current$$1, workInProgress, renderExpirationTime);

        case Profiler:
            return updateProfiler(current$$1, workInProgress, renderExpirationTime);

        case ContextProvider:
            return updateContextProvider(current$$1, workInProgress, renderExpirationTime);

        case ContextConsumer:
            return updateContextConsumer(current$$1, workInProgress, renderExpirationTime);

        case MemoComponent: {
            var _type2 = workInProgress.type;
            var _unresolvedProps3 = workInProgress.pendingProps; // Resolve outer props first, then resolve inner props.

            var _resolvedProps3 = resolveDefaultProps(_type2, _unresolvedProps3);

            {
                if (workInProgress.type !== workInProgress.elementType) {
                    var outerPropTypes = _type2.propTypes;

                    if (outerPropTypes) {
                        checkPropTypes(outerPropTypes, _resolvedProps3, // Resolved for outer only
                            'prop', getComponentName(_type2), getCurrentFiberStackInDev);
                    }
                }
            }

            _resolvedProps3 = resolveDefaultProps(_type2.type, _resolvedProps3);
            return updateMemoComponent(current$$1, workInProgress, _type2, _resolvedProps3, updateExpirationTime, renderExpirationTime);
        }

        case SimpleMemoComponent: {
            return updateSimpleMemoComponent(current$$1, workInProgress, workInProgress.type, workInProgress.pendingProps, updateExpirationTime, renderExpirationTime);
        }

        case IncompleteClassComponent: {
            var _Component3 = workInProgress.type;
            var _unresolvedProps4 = workInProgress.pendingProps;

            var _resolvedProps4 = workInProgress.elementType === _Component3 ? _unresolvedProps4 : resolveDefaultProps(_Component3, _unresolvedProps4);

            return mountIncompleteClassComponent(current$$1, workInProgress, _Component3, _resolvedProps4, renderExpirationTime);
        }

        case SuspenseListComponent: {
            return updateSuspenseListComponent(current$$1, workInProgress, renderExpirationTime);
        }

        case FundamentalComponent: {
            if (enableFundamentalAPI) {
                return updateFundamentalComponent$1(current$$1, workInProgress, renderExpirationTime);
            }

            break;
        }

        case ScopeComponent: {
            if (enableScopeAPI) {
                return updateScopeComponent(current$$1, workInProgress, renderExpirationTime);
            }

            break;
        }
    }

    (function () {
        {
            {
                throw ReactError(Error("Unknown unit of work tag (" + workInProgress.tag + "). This error is likely caused by a bug in React. Please file an issue."));
            }
        }
    })();
}



function updateClassComponent(current$$1, workInProgress, Component, nextProps, renderExpirationTime) {
    {
        if (workInProgress.type !== workInProgress.elementType) {
            // Lazy component props can't be validated in createElement
            // because they're only guaranteed to be resolved here.
            var innerPropTypes = Component.propTypes;

            if (innerPropTypes) {
                checkPropTypes(innerPropTypes, nextProps, // Resolved props
                    'prop', getComponentName(Component), getCurrentFiberStackInDev);
            }
        }
    } // Push context providers early to prevent context stack mismatches.
    // During mounting we don't know the child context yet as the instance doesn't exist.
    // We will invalidate the child context in finishClassComponent() right after rendering.


    var hasContext;

    if (isContextProvider(Component)) {
        hasContext = true;
        pushContextProvider(workInProgress);
    } else {
        hasContext = false;
    }

    prepareToReadContext(workInProgress, renderExpirationTime);
    var instance = workInProgress.stateNode;
    var shouldUpdate;

    if (instance === null) {
        if (current$$1 !== null) {
            // An class component without an instance only mounts if it suspended
            // inside a non- concurrent tree, in an inconsistent state. We want to
            // tree it like a new mount, even though an empty version of it already
            // committed. Disconnect the alternate pointers.
            current$$1.alternate = null;
            workInProgress.alternate = null; // Since this is conceptually a new fiber, schedule a Placement effect

            workInProgress.effectTag |= Placement;
        } // In the initial pass we might need to construct the instance.


        constructClassInstance(workInProgress, Component, nextProps, renderExpirationTime);
        mountClassInstance(workInProgress, Component, nextProps, renderExpirationTime);
        shouldUpdate = true;
    } else if (current$$1 === null) {
        // In a resume, we'll already have an instance we can reuse.
        shouldUpdate = resumeMountClassInstance(workInProgress, Component, nextProps, renderExpirationTime);
    } else {
        shouldUpdate = updateClassInstance(current$$1, workInProgress, Component, nextProps, renderExpirationTime);
    }

    var nextUnitOfWork = finishClassComponent(current$$1, workInProgress, Component, shouldUpdate, hasContext, renderExpirationTime);

    {
        var inst = workInProgress.stateNode;

        if (inst.props !== nextProps) {
            !didWarnAboutReassigningProps ? warning$1(false, 'It looks like %s is reassigning its own `this.props` while rendering. ' + 'This is not supported and can lead to confusing bugs.', getComponentName(workInProgress.type) || 'a component') : void 0;
            didWarnAboutReassigningProps = true;
        }
    }

    return nextUnitOfWork;
}

function finishClassComponent(current$$1, workInProgress, Component, shouldUpdate, hasContext, renderExpirationTime) {
    // Refs should update even if shouldComponentUpdate returns false
    markRef(current$$1, workInProgress);
    var didCaptureError = (workInProgress.effectTag & DidCapture) !== NoEffect;

    if (!shouldUpdate && !didCaptureError) {
        // Context providers should defer to sCU for rendering
        if (hasContext) {
            invalidateContextProvider(workInProgress, Component, false);
        }

        return bailoutOnAlreadyFinishedWork(current$$1, workInProgress, renderExpirationTime);
    }

    var instance = workInProgress.stateNode; // Rerender

    ReactCurrentOwner$3.current = workInProgress;
    var nextChildren;

    if (didCaptureError && typeof Component.getDerivedStateFromError !== 'function') {
        // If we captured an error, but getDerivedStateFrom catch is not defined,
        // unmount all the children. componentDidCatch will schedule an update to
        // re-render a fallback. This is temporary until we migrate everyone to
        // the new API.
        // TODO: Warn in a future release.
        nextChildren = null;

        if (enableProfilerTimer) {
            stopProfilerTimerIfRunning(workInProgress);
        }
    } else {
        {
            ('render');
            nextChildrsetCurrentPhaseen = instance.render();

            if (debugRenderPhaseSideEffects || debugRenderPhaseSideEffectsForStrictMode && workInProgress.mode & StrictMode) {
                instance.render();
            }

            setCurrentPhase(null);
        }
    } // React DevTools reads this flag.


    workInProgress.effectTag |= PerformedWork;

    if (current$$1 !== null && didCaptureError) {
        // If we're recovering from an error, reconcile without reusing any of
        // the existing children. Conceptually, the normal children and the children
        // that are shown on error are two different sets, so we shouldn't reuse
        // normal children even if their identities match.
        forceUnmountCurrentAndReconcile(current$$1, workInProgress, nextChildren, renderExpirationTime);
    } else {
        reconcileChildren(current$$1, workInProgress, nextChildren, renderExpirationTime);
    } // Memoize state using the values we just used to render.
    // TODO: Restructure so we never read values from the instance.


    workInProgress.memoizedState = instance.state; // The context might have changed so we need to recalculate it.

    if (hasContext) {
        invalidateContextProvider(workInProgress, Component, true);
    }

    return workInProgress.child;
}