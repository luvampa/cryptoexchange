import styled from 'styled-components'
import { BRAND_COLOR, DARK_GRAY } from './constants/colors'

export const AppWrapper = styled.div`
  display: flex;
  height: 100vh;
  padding: 15px;
`

export const Title = styled.h1`
  color: ${BRAND_COLOR};
  font-size: 2.1rem;
`

export const Subtitle = styled.h2`
  color: ${DARK_GRAY};
  font-weight: 100;
`

export const Container = styled.div`
  margin: 10% auto;
  width: 100%;
  max-width: 720px;
`
