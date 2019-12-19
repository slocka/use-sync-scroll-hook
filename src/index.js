import { useEffect } from 'react'

/**
 * Keep in sync the horizontal scroll position of multiple containers. If the user
 * scrolls one container to position X, the scroll position of the other containers is
 * automatically updated to X.
 *
 * TODO: The solution could probably be improved by throttling the scroll events (
 * using window.requestAninamtionFrame) and using a stack instead of setTimeout
 * to know if the scroll events are triggered programmatically or by the user.
 * @param {Array<Object>} scrollContainerRefList - List of React Refs
 */
export default function useSyncScroll(scrollContainerRefList) {

  useEffect(() => {
    // Map the list of React refs to the actual list of node.
    const containerList = scrollContainerRefList.map(ref => ref.current)
    let timeoutId

    // Updating the scrollLeft property manually will trigger a scroll event which
    // we want to ignore since it doesn't come from the user and we risk to have the
    // container programmatically updated trying to also update the scroll position of the originally
    // scrolled container.
    // We use this activeContainer state to keep track of which container originally scrolled.
    let activeContainer

    function syncContainersScroll(scrolledContainer) {
      const containersToUpdate = containerList.filter(container => container !== scrolledContainer)

      // Update scroll position of all other containers
      containersToUpdate.forEach((container) => {
        if (container) {
          container.scrollLeft = scrolledContainer.scrollLeft
        }
      })
    }

    function onScroll(e) {
      const currentlyScrolledContainer = e.target
      if (!activeContainer) {
        activeContainer = currentlyScrolledContainer
      }

      // Ignore scroll events in other containers since they
      // are very likely to be artificially triggered.
      if (currentlyScrolledContainer === activeContainer) {
        syncContainersScroll(activeContainer)

        // Delay the removal of the active container.
        if (timeoutId) {
          clearTimeout(timeoutId)
        }

        // After 200ms without scroll events on the active container
        // we reset the state to no containers active.
        // We use this window of 200ms without any scroll events to make
        // sure that all manually triggered scroll events have already been
        // sent before listening to scroll events in all containers again.
        timeoutId = setTimeout(() => {
          activeContainer = undefined
        }, 200)
      }
    }

    function removeScrollListeners() {
      containerList.forEach((scrollContainer) => {
        if (scrollContainer) {
          scrollContainer.removeEventListener('scroll', onScroll)
        }
      })
    }

    function addScrollListeners() {
      containerList.forEach((scrollContainer) => {
        if (scrollContainer) {
          scrollContainer.addEventListener('scroll', onScroll)
        }
      })
    }

    addScrollListeners()

    return removeScrollListeners
  }, [scrollContainerRefList])
}
