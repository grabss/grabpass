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

export class Grabpass {
  private config: GrabpassConfig

  constructor(args: GrabpassConstructorArgs) {
    const defaultConfig = {
      algorithm: 'HS256' as jwt.Algorithm,
      accessTokenExpiresIn: '30m',
      refreshTokenExpiresIn: '30d'
    }

    this.config = {
      ...defaultConfig,
      ...args.config
    }
  }
}
