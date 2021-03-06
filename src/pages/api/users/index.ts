import { NextApiRequest, NextApiResponse } from 'next'
import serverContext from '@/serverContext'
import { User } from '@/types'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { user, done, database } = await serverContext(req, res)

  if (!user || !user.isAdmin) {
    return await done(403, {
      message: 'You are not allowed to do that.',
    })
  }

  if (req.method === 'GET') {
    const { findAll, EntityType } = database
    const users = await findAll<User>(EntityType.User)
    return await done(200, users)
  }

  return await done(404, { message: 'Page not found.' })
}
