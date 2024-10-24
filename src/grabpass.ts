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
    const mergedConfig = {
      ...DEFAULT_GRABPASS_CONFIG,
      ...args.config
    }
    this.validateConfig(mergedConfig)
    this.config = mergedConfig
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
    const mergedConfig = {
      ...this.config,
      ...config
    }
    this.validateConfig(mergedConfig)

    return {
      accessToken: jwt.sign(accessTokenPayload, mergedConfig.secret, {
        algorithm: mergedConfig.algorithm,
        expiresIn: mergedConfig.accessTokenExpiresIn
      }),
      refreshToken: jwt.sign(refreshTokenPayload, mergedConfig.secret, {
        algorithm: mergedConfig.algorithm,
        expiresIn: mergedConfig.refreshTokenExpiresIn
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

  private validateConfig(config: GrabpassConfig) {
    if (process.env.NODE_ENV === 'development') return

    switch (config.algorithm) {
      case 'HS256': {
        if (config.secret.length < 32) {
          throw new Error(
            'Secret must be at least 32 characters long when using HS256 algorithm.'
          )
        }
        break
      }
      case 'HS384': {
        if (config.secret.length < 48) {
          throw new Error(
            'Secret must be at least 48 characters long when using HS384 algorithm.'
          )
        }
        break
      }
      case 'HS512': {
        if (config.secret.length < 64) {
          throw new Error(
            'Secret must be at least 64 characters long when using HS512 algorithm.'
          )
        }
        break
      }
    }
  }
}
