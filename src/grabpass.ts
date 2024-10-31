import * as jwt from 'jsonwebtoken'

export type AuthTokens = {
  accessToken: string
  refreshToken: string
}

export type AccessTokenPayload = {
  id: number
}

export type AccessTokenData = {
  payload: AccessTokenPayload
  config?: Partial<GrabpassConfig>
}

export type RefreshTokenPayload = {
  id: number
}

export type RefreshTokenData = {
  payload: RefreshTokenPayload
  config?: Partial<GrabpassConfig>
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
    const config = {
      ...DEFAULT_GRABPASS_CONFIG,
      ...args.config
    }
    this.validateConfig(config)
    this.config = config
  }

  createAuthTokens({
    accessTokenData,
    refreshTokenData
  }: {
    accessTokenData: AccessTokenData
    refreshTokenData: RefreshTokenData
  }): AuthTokens {
    const accessTokenConfig = {
      ...this.config,
      ...accessTokenData.config
    }
    const refreshTokenConfig = {
      ...this.config,
      ...refreshTokenData.config
    }
    this.validateConfig([accessTokenConfig, refreshTokenConfig])

    return {
      accessToken: jwt.sign(accessTokenData.payload, accessTokenConfig.secret, {
        algorithm: accessTokenConfig.algorithm,
        expiresIn: accessTokenConfig.accessTokenExpiresIn
      }),
      refreshToken: jwt.sign(refreshTokenData, refreshTokenConfig.secret, {
        algorithm: refreshTokenConfig.algorithm,
        expiresIn: refreshTokenConfig.refreshTokenExpiresIn
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

  private validateConfig(config: GrabpassConfig | GrabpassConfig[]) {
    if (process.env.NODE_ENV === 'development') return

    if (Array.isArray(config)) {
      for (const c of config) {
        this.validateConfig(c)
      }
      return
    }

    if (config.algorithm === 'none') {
      throw new Error('Algorithm "none" is not allowed.')
    }

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
