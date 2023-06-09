import { createStore, applyMiddleware, compose } from "redux"
import rootReducer from "./deck/reducers"

// Define the initial state
const initialState = {}

// Define any middleware you want to apply
const middleware = [] // Add your middleware here

// Apply middleware and enhancers
const enhancers = [applyMiddleware(...middleware)]

// Enable Redux DevTools Extension if available
const composeEnhancers =
  (typeof window !== "undefined" &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose

// Create the Redux store
const store = createStore(
  rootReducer,
  initialState,
  composeEnhancers(...enhancers),
)

export default store
