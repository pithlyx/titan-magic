import React, { useState } from "react"
import { useDispatch } from "react-redux"
import { addCard, removeCard } from "../../features/deck/actions"

const cardBack = "https://i.redd.it/qnnotlcehu731.jpg"

interface CardProps {
  onClick: () => void
  cardScale: number
  card: any
  location: string
  index: number
}

const Card: React.FC<CardProps> = ({
  onClick,
  cardScale = 2,
  card,
  location,
  index,
}) => {
  const cardAspectRatio = 0.714
  const cornerRadius = 8

  const cardWidth = 100 * cardScale
  const cardHeight = cardWidth * cardAspectRatio

  const cardStyle = {
    width: `${cardWidth}px`,
    borderRadius: `${cornerRadius}px`,
  }

  const [src, setSrc] = useState(
    card.image_uris?.large ||
      card.image_uris?.normal ||
      card.image_uris?.small ||
      "",
  )

  const dispatch = useDispatch()

  const handleCardClick = () => {
    if (location === "search") {
      dispatch(addCard(card))
    } else if (location === "deck") {
      dispatch(removeCard(index))
    }
    onClick()
  }

  return (
    <div style={cardStyle} onClick={handleCardClick}>
      <img
        src={src}
        alt={`Card`}
        className="w-full p-1"
        onError={() => setSrc(cardBack)}
      />
    </div>
  )
}

export default Card
