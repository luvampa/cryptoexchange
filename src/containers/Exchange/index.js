import React, { useState, useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  fetchCurrencyList,
  fetchGetAmount,
  fetchMinAmount,
  setGetAmount,
  setLastError,
  setPair,
  setSendAmount,
} from '../../store/exchange/actions'
import JawField from '../../components/JawField'
import {
  ErrorText,
  ExchangeArrowsButton, ExchangeError,
  SendAndGetsFields,
  Submiters, SubmitFormButton,
  WithdrawField, WithdrawFieldInput,
  WithdrawFieldLabel,
  WrapperExchange,
} from './styles'

const Exchange = () => {
  const {
    loading,
    currencyList,
    pair,
    minSendAmount,
    sendAmount,
    getAmount,
    lastError,
  } = useSelector((state) => state.exchange)

  const acceptedCurrency = useMemo(
    () => currencyList.find(({ shortName }) => shortName === pair[1]) || {
      name: '...',
    },
    [currencyList, pair],
  )

  const displayError = useMemo(() => {
    if (lastError) {
      if (lastError.error) {
        if (lastError.error === 'pair_is_inactive') return 'this pair is disabled now'
        return lastError.error
      }
      return 'unknown error'
    }
    return null
  }, [lastError])

  const dispatch = useDispatch()

  const changePair = async (newPair) => {
    await dispatch(setPair(newPair))
    console.log('test', newPair)
    await dispatch(fetchMinAmount(newPair))
  }

  const load = async () => {
    await dispatch(fetchCurrencyList())
    await changePair(pair)
  }
  useEffect(() => {
    load()
  }, [])

  useEffect(() => {
    if (lastError) dispatch(setGetAmount('-'))
  }, [lastError])

  // useEffect(() => {
  //   changePair(pair)
  // }, [pair])

  useEffect(() => {
    dispatch(setSendAmount(minSendAmount))
  }, [minSendAmount])

  const [timeoutFetchGetAmount, setTimeoutFetchGetAmount] = useState(null)
  useEffect(() => {
    if (timeoutFetchGetAmount) clearTimeout(timeoutFetchGetAmount)
    if (parseFloat(sendAmount) < parseFloat(minSendAmount)) {
      dispatch(setLastError({
        error: `Minimum transaction amount - ${minSendAmount}${pair[0]}`,
      }))
    } else {
      setTimeoutFetchGetAmount(setTimeout(() => {
        if (sendAmount) dispatch(fetchGetAmount(pair, sendAmount))
        else dispatch(setGetAmount('-'))
      }, 400))
    }
  }, [sendAmount])

  const onChangeSendAmount = (value) => {
    dispatch(setSendAmount(value))
  }

  const ErrorBlock = () => (
    <ExchangeError>
      <ErrorText>{displayError}</ErrorText>
    </ExchangeError>
  )

  return (
    <WrapperExchange>
      <SendAndGetsFields>
        <JawField
          value={`${sendAmount}`}
          optionKey={pair[0]}
          options={currencyList}
          onChangeValue={onChangeSendAmount}
          onSelectOption={(value) => changePair([value, pair[1]])}
        />
        <ExchangeArrowsButton
          disabled={loading}
          onClick={() => changePair([pair[1], pair[0]])}
        />
        <JawField
          value={`${getAmount}`}
          optionKey={pair[1]}
          options={currencyList}
          onChangeValue={onChangeSendAmount}
          onSelectOption={(value) => changePair([pair[0], value])}
        />
      </SendAndGetsFields>
      <Submiters>
        <WithdrawField>
          <WithdrawFieldLabel>
            Your {acceptedCurrency.name} address
          </WithdrawFieldLabel>
          <WithdrawFieldInput />
        </WithdrawField>
        <SubmitFormButton
          disabled={loading || displayError}
        >{'exchange'.toUpperCase()}</SubmitFormButton>
      </Submiters>
      {displayError && !loading ? <ErrorBlock /> : null}
    </WrapperExchange>
  )
}

export default Exchange
