import React, { useEffect, useState, useRef, useCallback } from "react"
import SearchBar from "../reuseable/SearchBar"
import Card from "../reuseable/Card"

interface CardDisplayProps {
  cardScale: number
}

const CardDisplay: React.FC<CardDisplayProps> = ({ cardScale }) => {
  const [cardsData, setCardsData] = useState([])
  const [page, setPage] = useState(2)
  const containerRef = useRef(null)

  const fetchData = useCallback((page) => {
    fetch(
      `http://localhost:1337/api/mongo/mtg/all-cards/en/face/${page}?limit=${
        !cardsData ? "200" : "100"
      }`,
    )
      .then((res) => res.json())
      .then((data) => setCardsData((prevData) => [...prevData, ...data.data]))
      .catch((err) => console.log(err))
  }, [])

  useEffect(() => {
    fetchData(1)
  }, [fetchData])

  useEffect(() => {
    const scrollListener = () => {
      console.log("scroll")
      if (!containerRef.current) return

      if (
        containerRef.current.scrollTop >
        containerRef.current.scrollHeight - window.innerHeight - 100 * cardScale
      ) {
        setPage((prevPage) => prevPage + 1)
        fetchData(page)
      }
    }

    const containerNode = containerRef.current // Get the DOM node from the ref

    if (containerNode) {
      containerNode.addEventListener("scroll", scrollListener) // Add event listener to the DOM node

      return () => {
        containerNode.removeEventListener("scroll", scrollListener) // Remove event listener from the DOM node
      }
    }
  }, [containerRef, cardScale, fetchData, page])

  const renderCards = () => {
    return cardsData.map((card, i) => (
      <Card
        location="search"
        key={i}
        card={card}
        onClick={() => console.log(card)}
        cardScale={cardScale}
      />
    ))
  }

  return (
    <>
      <SearchBar />
      <div ref={containerRef} className="overflow-y-scroll bg-bg">
        <div className="card-display ">
          <div className=" card-container flex justify-center">
            <div className=" card-flexbox justify-evenly flex flex-wrap">
              {renderCards()}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default CardDisplay
