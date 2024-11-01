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
}

export type AccessTokenData = {
  payload: AccessTokenPayload
  config?: PartialGrabpassConfig
}

export type RefreshTokenData = {
  payload: RefreshTokenPayload
  config?: PartialGrabpassConfig
}

export type GrabpassConfig = {
  algorithm: jwt.Algorithm
  accessTokenExpiresIn: string
  refreshTokenExpiresIn: string
  secret?: jwt.Secret
  publicKey?: jwt.PublicKey
  privateKey?: jwt.PrivateKey
}

export type GrabpassConstructorArgs = {
  config: PartialGrabpassConfig
}

type PartialGrabpassConfig = Partial<GrabpassConfig>

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
      accessToken: jwt.sign(
        accessTokenData.payload,
        this.getSignKey(accessTokenConfig),
        {
          algorithm: accessTokenConfig.algorithm,
          expiresIn: accessTokenConfig.accessTokenExpiresIn
        }
      ),
      refreshToken: jwt.sign(
        refreshTokenData.payload,
        this.getSignKey(refreshTokenConfig),
        {
          algorithm: refreshTokenConfig.algorithm,
          expiresIn: refreshTokenConfig.refreshTokenExpiresIn
        }
      )
    }
  }

  verifyAccessToken(token: string, config?: PartialGrabpassConfig) {
    return this.verifyToken<AccessTokenPayload>(token, config)
  }

  verifyRefreshToken(token: string, config?: PartialGrabpassConfig) {
    return this.verifyToken<RefreshTokenPayload>(token, config)
  }

  private getSignKey(config: GrabpassConfig): jwt.Secret | jwt.PrivateKey {
    if (config.algorithm.startsWith('HS')) {
      if (!config.secret) {
        throw new Error('Secret is required for HMAC algorithms.')
      }
      return config.secret
    } else {
      if (!config.privateKey) {
        throw new Error('Private key is required for RSA/ECDSA algorithms.')
      }
      return config.privateKey
    }
  }

  private getVerifyKey(config: GrabpassConfig): jwt.Secret | jwt.PublicKey {
    if (config.algorithm.startsWith('HS')) {
      if (!config.secret) {
        throw new Error('Secret is required for HMAC algorithms.')
      }
      return config.secret
    } else {
      if (!config.publicKey) {
        throw new Error('Public key is required for RSA/ECDSA algorithms.')
      }
      return config.publicKey
    }
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
      case 'HS256':
      case 'HS384':
      case 'HS512': {
        if (!config.secret) {
          throw new Error('Secret is required when using HMAC algorithm.')
        } else if (typeof config.secret === 'string') {
          this.validateHmacSecretLength(config.secret, config.algorithm)
        }
        break
      }
      case 'RS256':
      case 'RS384':
      case 'RS512':
      case 'ES256':
      case 'ES384':
      case 'ES512': {
        if (!config.privateKey || !config.publicKey) {
          throw new Error(
            'Both private and public keys are required for RSA/ECDSA algorithms.'
          )
        }
        break
      }
    }
  }

  private validateHmacSecretLength(
    secret: string,
    algorithm: 'HS256' | 'HS384' | 'HS512'
  ) {
    switch (algorithm) {
      case 'HS256': {
        if (secret.length < 32) {
          throw new Error(
            'Secret must be at least 32 characters long when using HS256 algorithm.'
          )
        }
        break
      }
      case 'HS384': {
        if (secret.length < 48) {
          throw new Error(
            'Secret must be at least 48 characters long when using HS384 algorithm.'
          )
        }
        break
      }
      case 'HS512': {
        if (secret.length < 64) {
          throw new Error(
            'Secret must be at least 64 characters long when using HS512 algorithm.'
          )
        }
        break
      }
    }
  }

  private verifyToken<T>(token: string, config?: PartialGrabpassConfig) {
    const verifyConfig = {
      ...this.config,
      ...config
    }
    this.validateConfig(verifyConfig)

    return jwt.verify(token, this.getVerifyKey(verifyConfig)) as T
  }
}
