import styled from 'styled-components'
import ExchangeImage from '../../assets/icon-exchange.png'
import {BACKGROUND, BRAND_COLOR, ERROR_COLOR} from '../../constants/colors'
import { Field } from '../../components/Input/styles'

export const WrapperExchange = styled.div`
  width: 100%;
  max-width: 940px;
  display: flex;
  flex-direction: column;
`

export const SendAndGetsFields = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
`

export const ExchangeArrowsButton = styled.button`
  background-image: url(${ExchangeImage});
  background-size: contain;
  background-color: transparent;
  background-repeat: no-repeat;
  cursor: pointer;
  padding: 10px;
  flex: 1;
  border: none;
  transform: scale(.65);
  outline: none;
  margin: 0 20px;
  width: 50px;
  height: 50px;
  background-position: center;
  transition: .3s ease-in-out;
  &:hover {
    background-color: ${BACKGROUND};
  }
`

export const Submiters = styled.div`
  margin-top: 25px;
  display: flex;
  align-items: flex-end;
  flex-wrap: wrap;
`

export const WithdrawField = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 300px;
  flex: 3
`

export const WithdrawFieldLabel = styled.label`
  margin-bottom: 10px;
  font-size: 1rem;
`

export const WithdrawFieldInput = styled(Field)`
`

export const SubmitFormButton = styled.button`
  border: none;
  outline: none;
  border: 1px solid ${BRAND_COLOR};
  cursor: pointer;
  background-color: ${BRAND_COLOR};
  transition: .3s ease-in-out;
  margin-left: 40px;
  margin-top: 15px;
  border-radius: 5px;
  padding: 5px 25px;
  color: #fff;
  height: 58px;
  transition: .3s ease-in-out;
  font-weight: 400;
  font-size: 1.6rem;
  &:hover {
    background-color: #fff;
    color: ${BRAND_COLOR};
  }
  ${(props) => props.disabled && 'opacity: .6; pointer-events: none;'}
`

export const ExchangeError = styled.div`
  margin-top: 15px;
  text-align: left;
`

export const ErrorText = styled.span`
  color: ${ERROR_COLOR};
  font-size: 1.4rem;
`
