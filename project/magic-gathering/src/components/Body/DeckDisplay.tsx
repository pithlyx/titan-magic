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
  const [nameInput, setNameInput] = useState("")

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

  function handleSave() {
    console.log("SAVING DECK")

    // Extract ids as strings
    const cardIds = currentDeck.map((card) => card["_id"])

    // Create the request body
    const requestBody = {
      name: nameInput,
      cards: cardIds,
    }

    // Send the request to the API
    fetch("http://localhost:1337/api/mongo/mtg/decks/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.log(error))
  }

  return (
    <>
      <div
        id="tab-container"
        className="sticky top-0 z-50 bg-container flex justify-evenly items-center p-2"
      >
        <div
      id="search-bar-container"
      className="sticky top-0 z-50 bg-container flex justify-between items-center p-2"
    >
      <input
        type="text"
        className="w-2/3 border p-2 m-2 border-primary rounded-full bg-container text-center mx-auto"
          value={nameInput} 
          onChange={(e) => setNameInput(e.target.value)}
          placeholder="Name Input"
      />
      <NavButton label="Save" handleClick={handleSave} />
    </div>
      </div>
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
    </>
  )
}

export default DeckDisplay
