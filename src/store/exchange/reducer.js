import createLogger from '../../helpers/createLogger'

const logger = createLogger('redux/exchange')

export const START_REQUEST = 'exchange/START_REQUEST'
export const END_REQUEST = 'exchange/END_REQUEST'
export const SET_LOADING = 'exchange/SET_LOADING'
export const SET_SEND_AMOUNT = 'exchange/SET_SEND_AMOUNT'
export const SET_GET_AMOUNT = 'exchange/SET_GET_AMOUNT'
export const SET_PAIR = 'exchange/SET_PAIR'
export const SET_PROP = 'exchange/SET_PROP'
export const SET_CURRENCY_LIST = 'exchange/SET_CURRENCY_LIST'
export const SET_LAST_ERROR = 'exchange/SET_LAST_ERROR'
export const SET_MIN_SEND_AMOUNT = 'exchange/SET_MIN_SEND_AMOUNT'

export const initialState = {
  currencyList: [],
  pair: ['btc', 'eth'],
  minSendAmount: 0,
  sendAmount: 0,
  getAmount: 0,
  loading: false,
  lastError: null,
}

export default function exchange(state = initialState, action) {
  logger.debug(`${JSON.stringify(action)}`)
  switch (action.type) {
    case START_REQUEST: {
      return { ...state, loading: true }
    }
    case END_REQUEST: {
      return { ...state, loading: false }
    }
    case SET_LOADING: {
      return { ...state, loading: action.payload }
    }
    case SET_PAIR: {
      return { ...state, pair: action.payload }
    }
    case SET_SEND_AMOUNT: {
      return { ...state, sendAmount: action.payload }
    }
    case SET_GET_AMOUNT: {
      return { ...state, getAmount: action.payload }
    }
    case SET_CURRENCY_LIST: {
      return { ...state, currencyList: action.payload }
    }
    case SET_PROP: {
      const { field, value } = action.payload
      return { ...state, [field]: value }
    }
    case SET_LAST_ERROR: {
      return { ...state, lastError: action.payload }
    }
    case SET_MIN_SEND_AMOUNT: {
      return { ...state, minSendAmount: action.payload }
    }
    default:
      return state
  }
}
