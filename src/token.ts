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

export function createAuthToken({
  accessTokenPayload,
  refreshTokenPayload
}: {
  accessTokenPayload: AccessTokenPayload
  refreshTokenPayload: RefreshTokenPayload
}): AuthTokens {
  return {
    accessToken: jwt.sign(accessTokenPayload, 'default_secret', {
      algorithm: 'HS256',
      expiresIn: '30m'
    }),
    refreshToken: jwt.sign(refreshTokenPayload, 'default_secret', {
      algorithm: 'HS256',
      expiresIn: '30d'
    })
  }
}

export function verifyAccessToken(token: string): AccessTokenPayload {
  return jwt.verify(token, 'default_secret') as AccessTokenPayload
}

export function verifyRefreshToken(token: string): RefreshTokenPayload {
  return jwt.verify(token, 'default_secret') as RefreshTokenPayload
}
