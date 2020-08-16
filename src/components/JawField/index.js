import React, {
  useEffect, useRef, useState, useMemo,
} from 'react'
import PropTypes from 'prop-types'
import {
  Component,
  JawDropdown,
  FieldWrapper,
  CurrencyIcon,
  CurrencyName,
  JawDropdownRow,
  CurrencyRowTicker,
  CurrencyRowName,
  JawAdditional,
  JawTicker,
  JawTickerButton,
  CloseIcon, JawInput,
} from './styles'
import cutText from '../../helpers/cutText'

const JawField = (props) => {
  const {
    options = [],
    value,
    optionKey = '',
    readonly = false,
    onSelectOption,
    onChangeValue,
  } = props

  const [opened, setOpened] = useState(false)
  const [searchValue, setSearchValue] = useState('')
  const option = useMemo(
    () => options.find((cfg) => cfg.shortName === optionKey) || {},
    [optionKey, options],
  )
  const displayOptions = useMemo(() => {
    const lowerSearch = searchValue.toLowerCase()
    return options.filter(({ shortName, name }) => name.toLowerCase().includes(lowerSearch) || shortName.toLowerCase().includes(lowerSearch))
  }, [searchValue, options])

  const mainEl = useRef(null)
  const inputEl = useRef(null)

  const closeDropdown = () => {
    setOpened(false)
    setSearchValue('')
  }

  const handleClickOutside = (event) => {
    const component = mainEl.current
    if (!event.path.includes(component)) closeDropdown()
  }
  useEffect(() => {
    document.addEventListener('click', handleClickOutside, false)
    return () => {
      document.removeEventListener('click', handleClickOutside, false)
    }
  }, [])

  const RenderTicker = ({ icon = '', shortName = '' }) => (
    <JawTicker>
      <CurrencyIcon src={icon} alt={shortName} />
      <CurrencyName>
        <span>{cutText(shortName.toUpperCase(), 4)}</span>
      </CurrencyName>
    </JawTicker>
  )

  const handleClickCurrencyRow = (shortName) => {
    setOpened(false)
    setSearchValue('')
    onSelectOption(shortName)
  }
  const DropdownRow = ({ icon, shortName, name }) => (
    <JawDropdownRow
      onClick={() => handleClickCurrencyRow(shortName)}
      disabled={shortName === optionKey}
    >
      <CurrencyRowTicker>
        <RenderTicker icon={icon} shortName={shortName} />
      </CurrencyRowTicker>
      <CurrencyRowName>
        <span>{cutText(name, 15)}</span>
      </CurrencyRowName>
    </JawDropdownRow>
  )

  const Dropdown = () => (
    <JawDropdown>
      {displayOptions.map((option) => (
        <DropdownRow {...option} key={option.shortName} />
      ))}
    </JawDropdown>
  )

  const handleChangeInput = (event) => {
    const { value } = event.target
    if (opened) {
      setSearchValue(value)
    } else {
      const re = /^[0-9\b]+$/
      if (value !== '' && !re.test(value.replace('.', ''))) return false
      onChangeValue(value)
    }
  }

  const onClickTickerButton = () => {
    setOpened(true)
    if (inputEl) inputEl.current.focus()
  }
  const TickerButton = () => (
    <JawTickerButton onClick={onClickTickerButton}>
      <RenderTicker
        shortName={option.shortName}
        icon={option.icon}
      />
    </JawTickerButton>
  )

  return (
    <Component ref={mainEl}>
      <FieldWrapper>
        <JawInput
          ref={inputEl}
          value={opened ? searchValue : value}
          placeholder={opened ? 'Search' : 'Amount'}
          onChange={handleChangeInput}
          withDropdown={opened}
          readonly={opened ? false : readonly}
        />
        <JawAdditional>
          { opened ? (
              <JawTickerButton
                onClick={() => setOpened(false)}
                withDropdown={opened}
              >
                <CloseIcon />
              </JawTickerButton>
          ) : <TickerButton />
          }
        </JawAdditional>
      </FieldWrapper>
      {opened ? <Dropdown /> : null}
    </Component>
  )
}

JawField.propTypes = {
  options: PropTypes.array,
  value: PropTypes.string,
  optionKey: PropTypes.string,
  readonly: PropTypes.bool,
  onSelectOption: PropTypes.func,
  onChangeValue: PropTypes.func,
}

export default JawField
