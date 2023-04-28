import type { NextApiRequest, NextApiResponse } from 'next'

import type { EnvSettings } from '~/lib/contracts/types'
import { Artist } from '~/lib/services/artist'
import { ResponseCode } from '~/lib/settings/enums'

async function reqArtist(req: NextApiRequest, res: NextApiResponse) {
  const artist = Artist.getArtist({ ...process.env } as EnvSettings)
  res.statusCode = ResponseCode.success
  res.json({ artist })
}

export default reqArtist
