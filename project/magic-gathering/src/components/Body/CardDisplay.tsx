import React, { useRef } from "react"
import SearchBar from "../reuseable/SearchBar"
import Card from "../reuseable/Card"

const CardDisplay= ({ cardScale, fetchData, cardsData }) => {
  const containerRef = useRef(null)




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
      <div className="bg-bg">
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
