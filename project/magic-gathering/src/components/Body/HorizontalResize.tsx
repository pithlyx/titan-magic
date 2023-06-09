import React, { useState, useRef, useCallback } from "react"

interface ResizablePanelsProps {
  height: number
  children: React.ReactNode
}

const ResizablePanels: React.FC<ResizablePanelsProps> = ({
  height,
  children,
}) => {
  const [panelWidth, setPanelWidth] = useState<number>(50) // Percent
  const [leftSliderValue, setLeftSliderValue] = useState<number>(50)
  const [rightSliderValue, setRightSliderValue] = useState<number>(50)

  const draggingRef = useRef<boolean>(false)
  const lastXRef = useRef<number>(0)
    const [cardsData, setCardsData] = useState([])
 
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault() // Prevents text selection
    draggingRef.current = true
    lastXRef.current = e.pageX
  }

  const handleMouseUp = () => {
    draggingRef.current = false
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (draggingRef.current) {
      const delta = e.pageX - lastXRef.current
      const updateWidth = panelWidth + (delta * 100) / window.innerWidth
      setPanelWidth(Math.min(100, Math.max(0, updateWidth)))
      lastXRef.current = e.pageX
    }
  }


  const handleLeftSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLeftSliderValue(Number(e.target.value))
  }

  const handleRightSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRightSliderValue(Number(e.target.value))
  }

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      style={{ height: height + "px" }}
      className={`flex border-2  overflow-y-auto border-gray-400 relative`}
    >
      <div
        id="leftDiv"
        className="flex-grow overflow-y-auto relative"
        style={{ flexBasis: `${panelWidth}%` }}
      >
        {children[0]}
      </div>
      <div
        id="handle"
        onMouseDown={handleMouseDown}
        className="absolute top-0 bg-secondary cursor-col-resize"
        style={{
          height: "100%",
          width: "10px",
          right: `${100 - panelWidth}%`,
          marginLeft: "-2px",
        }}
      />
      <div
        id="rightDiv"
        className="border-l-2 border-gray-400 bg-menu flex-grow overflow-y-auto relative"
        style={{ flexBasis: `${100 - panelWidth}%` }}
      >
        {children[1]}
      </div>
    </div>
  )
}

export default ResizablePanels
