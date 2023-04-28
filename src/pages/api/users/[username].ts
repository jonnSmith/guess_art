import type { NextApiRequest, NextApiResponse } from 'next'

import type {
  ErrorMessage,
  UserRequest,
  UserStateData
} from '~/lib/contracts/types'
import { User } from '~/lib/services/user'
import { ResponseCode } from '~/lib/settings/enums'

async function queryUser(req: NextApiRequest, res: NextApiResponse) {
  let result: UserStateData | ErrorMessage = {
    error: 'USER CHANGE REQUEST CANCELLED'
  }
  let user: UserStateData | undefined
  try {
    user = JSON.parse(req.body) as UserStateData
  } catch (e) {
    result = { error: typeof e === 'object' ? JSON.stringify(e) : `${e}` }
  }
  if (
    req.method === 'POST' &&
    user?.username !== undefined &&
    user.username === req.query?.username
  ) {
    result = await User.setUserScore({ ...user })
  }
  if (req.method === 'GET' && req.query?.username !== undefined) {
    result = await User.getUserData({ ...req.query } as UserRequest)
  }
  res.statusCode = !(result as UserStateData)?.id
    ? ResponseCode.error
    : ResponseCode.success
  res.json({ ...result })
}

export default queryUser
