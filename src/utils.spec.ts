import { createHmacToken } from './utils'

describe('Utils', () => {
  describe('createHmacToken', () => {
    it('should create a HMAC token with default algorithm and encoding', () => {
      const data = 'test'
      const result = createHmacToken(data)

      expect(result).toHaveProperty('token')
      expect(result).toHaveProperty('createdAt')
      expect(result.token).toHaveLength(64)
      expect(result.createdAt).toBeInstanceOf(Date)
    })

    it('should create a HMAC token with specified algorithm and encoding', () => {
      const data = 'test'
      const algorithm = 'sha512'
      const encoding = 'base64'
      const result = createHmacToken(data, algorithm, encoding)

      expect(result).toHaveProperty('token')
      expect(result).toHaveProperty('createdAt')
      expect(result.token).toMatch(/^[A-Za-z0-9+/=]+$/)
      expect(result.createdAt).toBeInstanceOf(Date)
    })

    it('should create different tokens for different timestamps', () => {
      const data = 'test'
      const originalDate = Date

      global.Date = jest.fn(
        () => new originalDate('2023-01-01T00:00:00Z')
      ) as never
      const result1 = createHmacToken(data)

      global.Date = jest.fn(
        () => new originalDate('2023-01-01T00:00:01Z')
      ) as never
      const result2 = createHmacToken(data)

      global.Date = originalDate

      expect(result1.token).not.toBe(result2.token)
    })

    it('should create different tokens for different data', () => {
      const data1 = 'test1'
      const data2 = 'test2'
      const result1 = createHmacToken(data1)
      const result2 = createHmacToken(data2)

      expect(result1.token).not.toBe(result2.token)
    })
  })
})
