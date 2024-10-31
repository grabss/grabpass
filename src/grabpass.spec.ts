import * as jwt from 'jsonwebtoken'
import {
  Grabpass,
  GrabpassConfig,
  GrabpassConstructorArgs,
  AuthTokens
} from './grabpass'

describe('Grabpass', () => {
  const defaultConfig: GrabpassConfig = {
    algorithm: 'HS256',
    accessTokenExpiresIn: '30m',
    refreshTokenExpiresIn: '30d',
    secret: 'gW9CK0A1N5WlB3JWrUvObH9IjLH8eIfq'
  }

  const constructorArgs: GrabpassConstructorArgs = {
    config: defaultConfig
  }

  let grabpass: Grabpass

  beforeEach(() => {
    grabpass = new Grabpass(constructorArgs)
  })

  it('should create auth tokens', () => {
    const accessTokenData = {
      payload: { id: 1 }
    }
    const refreshTokenData = {
      payload: { id: 1 }
    }

    const tokens: AuthTokens = grabpass.createAuthTokens({
      accessTokenData,
      refreshTokenData
    })

    expect(tokens).toHaveProperty('accessToken')
    expect(tokens).toHaveProperty('refreshToken')
  })

  it('should verify access token', () => {
    const accessTokenData = {
      payload: { id: 1 }
    }
    const refreshTokenData = {
      payload: { id: 1 }
    }

    const tokens: AuthTokens = grabpass.createAuthTokens({
      accessTokenData,
      refreshTokenData
    })

    const verifiedPayload = grabpass.verifyAccessToken(tokens.accessToken)
    expect(verifiedPayload).toHaveProperty('id', 1)
  })

  it('should verify refresh token', () => {
    const accessTokenData = {
      payload: { id: 1 }
    }
    const refreshTokenData = {
      payload: { id: 1 }
    }

    const tokens: AuthTokens = grabpass.createAuthTokens({
      accessTokenData,
      refreshTokenData
    })

    const verifiedPayload = grabpass.verifyRefreshToken(tokens.refreshToken)
    expect(verifiedPayload).toHaveProperty('id', 1)
  })

  it('should throw error for invalid algorithm', () => {
    const invalidConfig: GrabpassConfig = {
      ...defaultConfig,
      algorithm: 'none' as jwt.Algorithm
    }

    expect(() => new Grabpass({ config: invalidConfig })).toThrow(
      'Algorithm "none" is not allowed.'
    )
  })

  it('should throw error for short secret with HS256', () => {
    const invalidConfig: GrabpassConfig = {
      ...defaultConfig,
      secret: 'short'
    }

    expect(() => new Grabpass({ config: invalidConfig })).toThrow(
      'Secret must be at least 32 characters long when using HS256 algorithm.'
    )
  })
})
