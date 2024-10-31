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
})
