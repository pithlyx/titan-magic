import React, { useState, useRef } from "react"

const VerticalResize = ({ height }) => {
  const [panelSize, setPanelSize] = useState(50) // Percent
  const draggingRef = useRef(false)
  const lastPosRef = useRef(0)

  const handleMouseDown = (e) => {
    draggingRef.current = true
    lastPosRef.current = e.pageY
  }

  const handleMouseUp = () => {
    draggingRef.current = false
  }

  const handleMouseMove = (e) => {
    if (draggingRef.current) {
      const delta = e.pageY - lastPosRef.current
      const updateSize = panelSize + (delta * 100) / window.innerHeight
      setPanelSize(Math.min(100, Math.max(0, updateSize)))
      lastPosRef.current = e.pageY
    }
  }

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      style={{ height: height + "px" }}
      className="flex flex-col border-2 border-gray-400 relative"
    >
      <div
        className="border-r-2 border-gray-400 bg-gray-200 flex-grow"
        style={{ flexBasis: `${panelSize}%` }}
      />
      <div
        onMouseDown={handleMouseDown}
        className="absolute left-0 right-0 bottom-0 bg-black cursor-row-resize"
        style={{
          height: "4px",
          bottom: `${100 - panelSize}%`,
          marginBottom: "-2px",
        }}
      />
      <div
        className="border-l-2 border-gray-400 bg-gray-300 flex-grow"
        style={{ flexBasis: `${100 - panelSize}%` }}
      />
    </div>
  )
}

export default VerticalResize
