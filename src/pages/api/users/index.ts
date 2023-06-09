import type { NextApiRequest, NextApiResponse } from 'next'

import { User } from '~/lib/services/user'
import { ResponseCode } from '~/lib/settings/enums'

async function reqUsers(req: NextApiRequest, res: NextApiResponse) {
  const users = await User.getUsersData()
  res.statusCode = ResponseCode.success
  res.json({ users: users ? users.sort((a, b) => b.score - a.score) : [] })
}

export default reqUsers
