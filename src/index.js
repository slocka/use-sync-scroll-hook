import { useEffect } from 'react'

/**
 * For improve the performance, we are using requestAnimationFrame to throttle
 * the number of scrolling events we process to be only 1 per frame.
 * @param {Array<Object>} scrollContainerRefList - List of React Refs
 */
export default function useSyncScroll(scrollContainerRefList) {
  useEffect(() => {
    // Map the list of React ref to the actual list of node.
    const containerList = scrollContainerRefList.map(ref => ref.current)
    let requestAnimId

    function onScroll(e) {
      const scrolledContainer = e.target

      containerList.forEach((container) => {
        // Update all containers except the one currently
        // scrolling.
        if (container && container !== scrolledContainer) {
          container.scrollLeft = scrolledContainer.scrollLeft
        }
      })
      // Stop listening to scroll events until next frame
      removeScrollListeners()
      window.requestAnimationFrame(() => {
        // Start listening again to scroll events on the
        // next frame.
        addScrollListeners()
      })
    }

    function removeScrollListeners() {
      if (requestAnimId) {
        window.cancelAnimationFrame(requestAnimId)
      }
      containerList.forEach((scrollContainer) => {
        if (scrollContainer) {
          scrollContainer.removeEventListener('scroll', onScroll)
        }
      })
    }

    function addScrollListeners() {
      requestAnimId = window.requestAnimationFrame(() => {
        containerList.forEach((scrollContainer) => {
          if (scrollContainer) {
            scrollContainer.addEventListener('scroll', onScroll)
          }
        })

        requestAnimId = null
      })
    }

    addScrollListeners()

    return removeScrollListeners
  }, [scrollContainerRefList])
}
