import {
  END_REQUEST,
  // eslint-disable-next-line import/named
  SET_CURRENCY_LIST,
  // eslint-disable-next-line import/named
  SET_GET_AMOUNT, SET_LAST_ERROR, SET_MIN_SEND_AMOUNT, SET_PAIR, SET_SEND_AMOUNT, START_REQUEST,
} from './reducer'

const startRequest = () => (dispatch) => dispatch({ type: START_REQUEST })
const endRequest = () => (dispatch) => dispatch({ type: END_REQUEST })
export const setLastError = (error) => (dispatch) => dispatch({
  type: SET_LAST_ERROR,
  payload: error,
})
const setCurrencyList = (list) => (dispatch) => dispatch({
  type: SET_CURRENCY_LIST,
  payload: list,
})
export const setMinSendAmount = (value) => (dispatch) => {
  dispatch({
    type: SET_MIN_SEND_AMOUNT,
    payload: value,
  })
}

export const setSendAmount = (value) => (dispatch) => {
  dispatch({
    type: SET_SEND_AMOUNT,
    payload: value,
  })
}

export const setGetAmount = (value) => (dispatch) => dispatch({
  type: SET_GET_AMOUNT,
  payload: value,
})

export const setPair = (pair) => (dispatch) => dispatch({
  type: SET_PAIR,
  payload: pair,
})

export const fetchCurrencyList = () => async (dispatch, getState, API) => {
  await dispatch(startRequest())
  API.getCurrencyList()
    .then(async (result) => {
      const formatList = result.map((item) => ({
        name: item.name,
        shortName: item.ticker,
        icon: item.image,
      }))
      await dispatch(setLastError(null))
      await dispatch(setCurrencyList(formatList))
    })
    .catch(async (error) => { await dispatch(setLastError(error)) })
    .finally(async () => { await dispatch(endRequest()) })
}

/**
 * минимальная сумма сделки
 * @param pair {Array<String>}
 * @returns {function(...[*]=)}
 */
export const fetchMinAmount = (pair) => async (dispatch, getState, API) => {
  await dispatch(setSendAmount(0))
  await dispatch(setMinSendAmount(0))
  await dispatch(startRequest())
  API.getMinAmount(pair)
    .then(async (result) => {
      await dispatch(setLastError(null))
      await dispatch(setSendAmount(result.minAmount))
      await dispatch(setMinSendAmount(result.minAmount))
    })
    .catch((error) => { dispatch(setLastError(error)) })
    .finally(() => { dispatch(endRequest()) })
}

/**
 * сколько получаем
 * @param pair {Array<String>}
 * @param amount {[String, Number]}
 * @returns {function(...[*]=)}
 */
export const fetchGetAmount = (pair, amount) => (dispatch, getState, API) => {
  dispatch(startRequest())
  API.estimated(pair, amount)
    .then(async (result) => {
      await dispatch(setLastError(null))
      await dispatch(setGetAmount(result.estimatedAmount))
    })
    .catch((error) => { dispatch(setLastError(error)) })
    .finally(() => { dispatch(endRequest()) })
}
