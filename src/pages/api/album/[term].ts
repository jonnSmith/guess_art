import type { NextApiRequest, NextApiResponse } from 'next'

import type {
  ErrorMessage,
  ResponseCodeValue,
  ArtistRequest
} from '~/lib/contracts/types'
import { iTunesAPI } from '~/lib/services/itunes'
import { ResponseCode } from '~/lib/settings/enums'

async function guessAlbumArtist(req: NextApiRequest, res: NextApiResponse) {
  let result: ArtistRequest | ErrorMessage
  let statusCode: ResponseCodeValue
  try {
    result = await iTunesAPI.guessAlbumArtist(req.query as ArtistRequest)
    statusCode = ResponseCode.success
  } catch (e: unknown) {
    statusCode = ResponseCode.error
    result = {
      error: (e as Error)?.message ?? 'QUERY ARTIST ALBUM DATA FAILED'
    }
  }
  res.statusCode = statusCode
  res.json(result)
}

export default guessAlbumArtist
