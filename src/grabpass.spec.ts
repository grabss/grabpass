import { randomBytes } from 'crypto'
import { Grabpass, GrabpassConfig, AuthTokens } from './grabpass'

const DEFAULT_TEST_CONFIG: GrabpassConfig = {
  algorithm: 'HS256',
  accessTokenExpiresIn: '30m',
  refreshTokenExpiresIn: '30d',
  secret: randomBytes(32 / 2).toString('hex')
}

const DEFAULT_TEST_TOKEN_DATA = {
  payload: { id: 1 }
}

describe('Grabpass', () => {
  let grabpass: Grabpass

  beforeEach(() => {
    grabpass = new Grabpass({
      config: DEFAULT_TEST_CONFIG
    })
  })

  it('should create auth tokens', () => {
    const tokens: AuthTokens = grabpass.createAuthTokens({
      accessTokenData: DEFAULT_TEST_TOKEN_DATA,
      refreshTokenData: DEFAULT_TEST_TOKEN_DATA
    })

    expect(tokens).toHaveProperty('accessToken')
    expect(tokens).toHaveProperty('refreshToken')
  })

  it('should verify access token', () => {
    const tokens: AuthTokens = grabpass.createAuthTokens({
      accessTokenData: DEFAULT_TEST_TOKEN_DATA,
      refreshTokenData: DEFAULT_TEST_TOKEN_DATA
    })

    const verifiedPayload = grabpass.verifyAccessToken(tokens.accessToken)
    expect(verifiedPayload).toHaveProperty('id', 1)
  })

  it('should verify refresh token', () => {
    const tokens: AuthTokens = grabpass.createAuthTokens({
      accessTokenData: DEFAULT_TEST_TOKEN_DATA,
      refreshTokenData: DEFAULT_TEST_TOKEN_DATA
    })

    const verifiedPayload = grabpass.verifyRefreshToken(tokens.refreshToken)
    expect(verifiedPayload).toHaveProperty('id', 1)
  })

  it('should throw error for invalid algorithm', () => {
    const invalidConfig: GrabpassConfig = {
      ...DEFAULT_TEST_CONFIG,
      algorithm: 'none'
    }

    expect(() => new Grabpass({ config: invalidConfig })).toThrow(
      'Algorithm "none" is not allowed.'
    )
  })

  it('should throw error for short secret with HS256', () => {
    const invalidConfig: GrabpassConfig = {
      ...DEFAULT_TEST_CONFIG,
      secret: 'short'
    }

    expect(() => new Grabpass({ config: invalidConfig })).toThrow(
      'Secret must be at least 32 characters long when using HS256 algorithm.'
    )
  })

  it('should throw error for missing secret with HMAC algorithms', () => {
    const invalidConfig: GrabpassConfig = {
      ...DEFAULT_TEST_CONFIG,
      secret: undefined
    }

    expect(() => new Grabpass({ config: invalidConfig })).toThrow(
      'Secret is required when using HMAC algorithm.'
    )
  })

  it('should throw error for missing keys with RSA/ECDSA algorithms', () => {
    const invalidConfig: GrabpassConfig = {
      ...DEFAULT_TEST_CONFIG,
      algorithm: 'RS256'
    }

    expect(() => new Grabpass({ config: invalidConfig })).toThrow(
      'Both private and public keys are required for RSA/ECDSA algorithms.'
    )
  })
})
