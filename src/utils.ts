import * as crypto from 'crypto'

export function createHmacToken(
  data: string,
  algorithm = 'sha256',
  encoding: crypto.BinaryToTextEncoding = 'hex'
): {
  token: string
  createdAt: Date
} {
  const createdAt = new Date()
  return {
    token: crypto
      .createHmac(algorithm, String(createdAt.getTime()))
      .update(data)
      .digest(encoding),
    createdAt
  }
}
