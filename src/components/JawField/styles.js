import styled from 'styled-components'
import { Field } from '../Input/styles'
import { BACKGROUND, BRAND_COLOR, LIGHT_GRAY } from '../../constants/colors'
import ImageClose from '../../assets/icon-close.png'

export const Component = styled.div`
  position: relative;
  min-width: 250px;
  max-width: 360px;
  display: flex;
  flex: 2;
`

export const FieldWrapper = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
`

export const JawInput = styled(Field)`
  width: 70%;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  ${(props) => props.withDropdown && 'border-bottom-left-radius: 0px; border-right: 0;'}
`
export const JawDropdown = styled.div`
  z-index: 9999;
  max-height: 225px;
  overflow-y: scroll;
  width: 100%;
  border: 1px solid ${LIGHT_GRAY};
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
  position: absolute;
  padding-top: 10px;
  top: 58px;
  background-color: #fff;
`

export const JawCloseButton = styled.button``

export const JawAdditional = styled.div`
  width: 125px;
`

export const JawTicker = styled.div`
  display: flex;
  align-items: center;
`

export const JawTickerButton = styled.button`
  background-color: #fff;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  border: 1px solid ${LIGHT_GRAY};
  height: 59px;
  cursor: pointer;
  width: 100%;
  border-left: none;
  outline: none;
  display: flex;
  justify-content: center;
  align-items: center;
  ${(props) => props.withDropdown && 'border-bottom-right-radius: 0px;'}
`

export const JawDropdownRow = styled.div`
  transition: .3s ease-in-out;
  cursor: pointer;
  display: flex;
  align-items: center;
  padding: 10px;
  &:hover {
    background-color: ${BACKGROUND};
  }
  ${(props) => props.disabled && 'pointer-events: none; opacity: .6;'}
`
export const CurrencyName = styled.div`
  font-size: 1.4rem;
`
export const CurrencyRowTicker = styled.div`
  width: 40%;
  display: flex;
  align-items: center;
  margin-right: 10px;
`
export const CurrencyRowName = styled.div`
  color: ${LIGHT_GRAY};
  width: 60%
`

export const CurrencyIcon = styled.img`
  fill: ${BRAND_COLOR};
  margin-right: 5px;
  width: 32px;
  height: 32px;
  filter: invert(35%) sepia(83%) saturate(415%) hue-rotate(121deg) brightness(94%) contrast(93%);
`

export const CloseIcon = styled.i`
  background-image: url(${ImageClose});
  background-color: transparent;
  width: 28px;
  height: 28px;
  background-size: cover;
  display: block;
`
