import {
  createHashedPassword,
  createHashedPasswordSync,
  comparePassword,
  comparePasswordSync
} from './password'

describe('Password utilities', () => {
  const plainPassword = 'password'
  const saltRounds = 10

  describe('createHashedPassword', () => {
    it('should create a hashed password asynchronously', async () => {
      const hashedPassword = await createHashedPassword(
        plainPassword,
        saltRounds
      )
      expect(hashedPassword).toBeDefined()
      expect(hashedPassword).not.toBe(plainPassword)
    })
  })

  describe('createHashedPasswordSync', () => {
    it('should create a hashed password synchronously', () => {
      const hashedPassword = createHashedPasswordSync(plainPassword, saltRounds)
      expect(hashedPassword).toBeDefined()
      expect(hashedPassword).not.toBe(plainPassword)
    })
  })

  describe('comparePassword', () => {
    it('should compare passwords asynchronously', async () => {
      const hashedPassword = await createHashedPassword(
        plainPassword,
        saltRounds
      )
      const isMatch = await comparePassword(plainPassword, hashedPassword)
      expect(isMatch).toBe(true)
    })

    it('should return false for non-matching passwords asynchronously', async () => {
      const hashedPassword = await createHashedPassword(
        plainPassword,
        saltRounds
      )
      const isMatch = await comparePassword('wrongPassword', hashedPassword)
      expect(isMatch).toBe(false)
    })
  })

  describe('comparePasswordSync', () => {
    it('should compare passwords synchronously', () => {
      const hashedPassword = createHashedPasswordSync(plainPassword, saltRounds)
      const isMatch = comparePasswordSync(plainPassword, hashedPassword)
      expect(isMatch).toBe(true)
    })

    it('should return false for non-matching passwords synchronously', () => {
      const hashedPassword = createHashedPasswordSync(plainPassword, saltRounds)
      const isMatch = comparePasswordSync('wrongPassword', hashedPassword)
      expect(isMatch).toBe(false)
    })
  })
})
