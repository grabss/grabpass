import * as bcrypt from 'bcrypt'

export function createHashedPassword({
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
  hashed
}: {
  plain: string
  hashed: string
}) {
  return bcrypt.compare(plain, hashed)
}
