import { action, decorate, observable } from 'mobx'
import { baseApiURL } from '../constants/env'
import {useLocalStore} from "mobx-react-lite";

class Exchange {
  constructor() {
    this.send = 0
    this.receive = 0
    this.pair = ['btc', 'eth']
    this.currencyList = []
    this.fetchCurrencyListError = null
    this.receiveCalcError = null
    this.apiKey = ''
  }

  fetchCurrencyList() {
    fetch(`${baseApiURL}/currencies?active=true`)
      .then((r) => { r.json() })
      .then((json) => {
        this.currencyList = json
      }).catch((error) => {
        this.fetchCurrencyListError = error
      })
  }

  receiveCalc() {
    const url = `${baseApiURL}/exchange-amount/${this.send}/${this.pair[0]}_${this.pair[1]}?api_key=${this.apiKey}`
    fetch(url).then((r) => r.json()).then((json) => {
      this.receive = json
    }).catch((error) => {
      this.receiveCalcError = error
    })
  }
}

const ExchangeStore = decorate(Exchange, {
  price: observable,
  amount: observable,
  pair: observable,
  currencyList: observable,
  fetchCurrencyListError: observable,
  receiveCalcError: observable,
  receiveCalc: action,
  fetchCurrencyList: action,
})

export default ExchangeStore

const storeContext = React.createContext(null)

export const StoreProvider = ({ children }) => {
  const store = useLocalStore(createStore)
  return <storeContext.Provider value={store}>{children}</storeContext.Provider>
}
