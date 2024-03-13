import axios from 'axios'
import { md5 } from 'js-md5'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function getCharacters(req: NextApiRequest, res: NextApiResponse) {
  const ts = Date.now()
  const apikey = process.env.PUBLIC_API_KEY
  const privateApikey = process.env.PRIVATE_API_KEY
  const hash = md5(`${ts}${privateApikey}${apikey}`)
  const characterId = req.query.id || null
  const limit = req.query.limit || null

  let apiUrl = 'https://gateway.marvel.com/v1/public/characters'
  if (characterId) {
    apiUrl += `/${characterId}`
  }

  axios
    .get(apiUrl, {
      params: {
        ts,
        apikey,
        hash,
        limit
      }
    })
    .then((response: { data: { data: { results: object } } }) => {
      res.status(200).json({
        data: response.data.data.results,
      })
    })
    .catch((error: any) => {
      res.status(200).send(error)
    })
}

export const config = {
  api: {
    externalResolver: true
  },
}
