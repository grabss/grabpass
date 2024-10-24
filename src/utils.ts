import * as crypto from 'crypto'

export function createHmacToken(data: string): {
  token: string
  createdAt: Date
} {
  const createdAt = new Date()
  return {
    token: crypto
      .createHmac('sha256', String(createdAt.getTime()))
      .update(data)
      .digest('hex'),
    createdAt
  }
}
