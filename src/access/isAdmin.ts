import { Access } from 'payload/types'

export const isAdmin: Access = ({ req: { user } }) => {
  if (user && user?.role === 'admin') {
    return true
  }

  return {
    id: {
      equals: user?.id,
    },
  }
}
