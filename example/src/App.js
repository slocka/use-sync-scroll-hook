import React, { useRef } from 'react'

import useSyncScroll from 'use-sync-scroll-hook'

export default function App() {
  const headerRef = useRef()
  const bodyRef = useRef()

  useSyncScroll([headerRef, bodyRef])

  return (
    <div className="table">
      <div ref={headerRef} className="table-header">
        <div className="cell"> Header 1 </div>
        <div className="cell"> Header 2 </div>
        <div className="cell"> Header 3 </div>
        <div className="cell"> Header 4 </div>
        <div className="cell"> Header 5 </div>
      </div>
      <div className="separator">
        The body & header of the table have their scroll position in sync.
      </div>
      <div ref={bodyRef} className="table-body">
          <div className="cell"> Cell 1 </div>
          <div className="cell"> Cell 2 </div>
          <div className="cell"> Cell 3 </div>
          <div className="cell"> Cell 4 </div>
          <div className="cell"> Cell 5 </div>

          <div className="cell"> Cell 1 </div>
          <div className="cell"> Cell 2 </div>
          <div className="cell"> Cell 3 </div>
          <div className="cell"> Cell 4 </div>
          <div className="cell"> Cell 5 </div>

          <div className="cell"> Cell 1 </div>
          <div className="cell"> Cell 2 </div>
          <div className="cell"> Cell 3 </div>
          <div className="cell"> Cell 4 </div>
          <div className="cell"> Cell 5 </div>

          <div className="cell"> Cell 1 </div>
          <div className="cell"> Cell 2 </div>
          <div className="cell"> Cell 3 </div>
          <div className="cell"> Cell 4 </div>
          <div className="cell"> Cell 5 </div>
      </div>
    </div>
  )
}
