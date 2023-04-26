import type { NextApiRequest, NextApiResponse } from 'next'

import type {
  ArtistRequest,
  ResponseCodeValue,
  ErrorMessage,
  ArtistData
} from '~/lib/contracts/types'
import { iTunesAPI } from '~/lib/services/itunes'
import { ResponseCode } from '~/lib/settings/enums'

async function reqArtistAlbums(req: NextApiRequest, res: NextApiResponse) {
  let result: ArtistData | ErrorMessage
  let statusCode: ResponseCodeValue
  try {
    result = await iTunesAPI.requestArtistAlbums(req.query as ArtistRequest)
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

export default reqArtistAlbums
