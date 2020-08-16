import { useState } from 'react'
import { useDispatch } from 'react-redux'

const initialState = {
  data: null,
  loading: false,
  lastError: null,
}

export default (action) => {
  const [state, setState] = useState(initialState)
  const dispatch = useDispatch()

  function mergeState(newState) {
    setState((prevState) => ({ ...prevState, ...newState }))
  }

  const requestData = async (params) => {
    const { payload: { request } } = await dispatch(action())
    const url = request.url
    const method = request.method || 'GET'
    if (method === 'GET' && params) {
      Object.keys(params).forEach((key) => url.searchParams.append(key, params[key]))
    }
    mergeState({ loading: true })
    fetch(url, { method, body: params })
      .then((res) => res.json()).then((data) => {
        if ('error' in data) {
          mergeState({ loading: false, lastError: data })
        } else {
          mergeState({ data, loading: false, lastError: null })
        }
      }).catch((error) => {
        mergeState({ lastError: error, loading: false })
      })
  }

  const result = [
    requestData,
    state.loading,
    state.data,
    state.lastError,
  ]

  result.requestData = state.requestData
  result.loading = state.loading
  result.data = state.data
  result.lastError = state.lastError

  return result
}
