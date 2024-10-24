import * as jwt from 'jsonwebtoken'

export type AuthTokens = {
  accessToken: string
  refreshToken: string
}

export type AccessTokenPayload = {
  id: number
}

export type RefreshTokenPayload = {
  id: number
  reauthKey: string
}

export type GrabpassConfig = {
  algorithm: jwt.Algorithm
  accessTokenExpiresIn: string
  refreshTokenExpiresIn: string
  secret: string
}

export type GrabpassConstructorArgs = {
  config: Partial<Omit<GrabpassConfig, 'secret'>> & {
    secret: string
  }
}

const DEFAULT_GRABPASS_CONFIG = {
  algorithm: 'HS256' as jwt.Algorithm,
  accessTokenExpiresIn: '30m',
  refreshTokenExpiresIn: '30d'
}

export class Grabpass {
  private config: GrabpassConfig

  constructor(args: GrabpassConstructorArgs) {
    this.config = {
      ...DEFAULT_GRABPASS_CONFIG,
      ...args.config
    }
  }

  createAuthTokens({
    accessTokenPayload,
    refreshTokenPayload,
    config
  }: {
    accessTokenPayload: AccessTokenPayload
    refreshTokenPayload: RefreshTokenPayload
    config?: Partial<GrabpassConfig>
  }): AuthTokens {
    const { algorithm, accessTokenExpiresIn, refreshTokenExpiresIn, secret } = {
      ...this.config,
      ...config
    }
    return {
      accessToken: jwt.sign(accessTokenPayload, secret, {
        algorithm,
        expiresIn: accessTokenExpiresIn
      }),
      refreshToken: jwt.sign(refreshTokenPayload, secret, {
        algorithm,
        expiresIn: refreshTokenExpiresIn
      })
    }
  }

  verifyAccessToken(token: string) {
    return this.verifyToken<AccessTokenPayload>(token)
  }

  verifyRefreshToken(token: string) {
    return this.verifyToken<RefreshTokenPayload>(token)
  }

  private verifyToken<T>(token: string) {
    return jwt.verify(token, this.config.secret) as T
  }
}
