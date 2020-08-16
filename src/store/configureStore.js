import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import exchange from './exchange/reducer'
import { apiKey } from '../constants/env'
import Api from '../services/Api'

const reducers = combineReducers({ exchange })

export default function configureStore() {
  const store = createStore(
    reducers,
    composeWithDevTools(
      applyMiddleware(thunk.withExtraArgument(new Api(apiKey))),
    ),
  )

  return { store }
}
