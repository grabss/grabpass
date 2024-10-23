import * as bcrypt from 'bcrypt'

export function createEncryptedPassword({
  plain,
  saltRounds = 10
}: {
  plain: string
  saltRounds?: number
}) {
  return bcrypt.hash(plain, saltRounds)
}

export function comparePassword({
  plain,
  encrypted
}: {
  plain: string
  encrypted: string
}) {
  return bcrypt.compare(plain, encrypted)
}
