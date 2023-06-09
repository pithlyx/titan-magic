import { combineReducers } from "redux"
import { ADD_CARD, REMOVE_CARD } from "./actions"

// Define the initial state
const initialDeckState = []

// Reducer for deck
const deckReducer = (state = initialDeckState, action) => {
  switch (action.type) {
    case ADD_CARD:
      return [...state, action.payload]
    case REMOVE_CARD:
      return state.filter((_, index) => index !== action.payload)
    default:
      return state
  }
}

// Combine reducers
const rootReducer = combineReducers({
  deck: deckReducer,
  // Add more reducers here if needed
})

export default rootReducer
