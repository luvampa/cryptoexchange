/**
 * @param url {String}
 * @returns {Promise<unknown>}
 */
export default (url) => new Promise((resolve, reject) => {
  fetch(url)
    .then((res) => res.json())
    .then((json) => {
      if ('error' in json) reject(json)
      else resolve(json)
    }).catch((error) => { reject(error) })
})
