import { baseApiURL } from '../constants/env'
import request from '../helpers/request'

class Api {
  constructor(apiKey) {
    this.apiKey = apiKey
  }

  getCurrencyList() {
    return request(`${baseApiURL}/currencies?active=true`)
  }

  /**
   * @param pair {Array<String>}
   * @returns {Promise<unknown>}
   */
  getMinAmount(pair) {
    return request(`${baseApiURL}/min-amount/${pair[0]}_${pair[1]}`)
  }

  /**
   * @param pair{Array<String>}
   * @param amount{[String, Number]}
   * @returns {Promise<unknown>}
   */
  estimated(pair, amount) {
    const url = `${baseApiURL}/exchange-amount/${amount}/${pair[0]}_${pair[1]}?api_key=${this.apiKey}`
    return request(url)
  }
}

export default Api
