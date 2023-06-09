// Action types
export const ADD_CARD = "ADD_CARD"
export const REMOVE_CARD = "REMOVE_CARD"

// Action creators
export const addCard = (card) => ({
  type: ADD_CARD,
  payload: card,
})

export const removeCard = (index) => ({
  type: REMOVE_CARD,
  payload: index,
})
