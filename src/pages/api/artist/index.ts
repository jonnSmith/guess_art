import type { NextApiRequest, NextApiResponse } from 'next'

import type { EnvSettings } from '~/lib/contracts/types'
import { Artists } from '~/lib/services/artists'
import { ResponseCode } from '~/lib/settings/enums'

async function reqArtist(req: NextApiRequest, res: NextApiResponse) {
  const artist = Artists.getArtist({ ...process.env } as EnvSettings)
  res.statusCode = ResponseCode.success
  res.json({ artist })
}

export default reqArtist
