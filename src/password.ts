import * as bcrypt from 'bcrypt'

export function createHashedPassword(plain: string, saltRounds: number = 10) {
  return bcrypt.hash(plain, saltRounds)
}

export function createHashedPasswordSync(
  plain: string,
  saltRounds: number = 10
) {
  return bcrypt.hashSync(plain, saltRounds)
}

export function comparePassword(plain: string, hashed: string) {
  return bcrypt.compare(plain, hashed)
}

export function comparePasswordSync(plain: string, hashed: string) {
  return bcrypt.compareSync(plain, hashed)
}
