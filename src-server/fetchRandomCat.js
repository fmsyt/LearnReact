/**
 * @typedef { Object } Cat
 * @property { string } _id
 * @property { string } createdAt
 * @property { string } editedAt
 * @property { string } mimetype
 * @property { number } size
 * @property { string[] } tags
 */

/**
 * @returns { Promise<Cat> }
 */
async function fetchRandomCat() {
  const res = await fetch('https://cataas.com/cat?json=true')
  const json = await res.json()
  return json
}

export default fetchRandomCat

fetchRandomCat().then((json) => {
  console.log(json)
})
