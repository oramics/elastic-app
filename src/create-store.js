import rootReducer from './reducers'
import { applyMiddleware, createStore } from 'redux'
import createLogger from 'redux-logger'
import thunk from 'redux-thunk'

const logger = createLogger()

export default (initialState) => createStore(
  rootReducer,
  applyMiddleware(logger),
  applyMiddleware(thunk)
)
