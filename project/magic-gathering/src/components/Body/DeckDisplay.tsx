import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import Card from "../reuseable/Card"
import { removeCard } from "../../features/deck/actions"
import NavButton from "../reuseable/Button"

interface CardDisplayProps {
  cardScale: number
}

const DeckDisplay: React.FC<CardDisplayProps> = ({ cardScale }) => {
  const deck = useSelector((state: { deck: any[] }) => state.deck)

  const [currentDeck, setCurrentDeck] = useState(deck)

  useEffect(() => {
    setCurrentDeck(deck)
  }, [deck])

  const renderCards = () => {
    return currentDeck.map((card, i) => (
      <Card
        key={i}
        index={i}
        card={card}
        onClick={() => console.log("click")}
        cardScale={cardScale}
        location="deck"
      />
    ))
  }

  function handleSave(){
    console.log("SAVING DECK")
  }

  return (
    <>
      
      <div className=" bg-bg">
        <div className="card-display">
          <div className="card-container flex justify-center">
            <div className="card-flexbox justify-evenly flex flex-wrap">
              {renderCards()}
            </div>
          </div>
        </div>
      </div>
      {/* sort button, save button, new deck, tabs for decks? */}
      <div
        id="tab-container"
        className="sticky bottom-0 z-50 bg-container flex justify-evenly items-center p-2"
      >
        <NavButton label="Save" handleClick={handleSave}/>
        <NavButton label="Save"/>
        <NavButton label="Save"/>
      </div>
    </>
    
  )
}

export default DeckDisplay
