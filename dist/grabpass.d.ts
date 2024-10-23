import * as jwt from 'jsonwebtoken';
export type AuthTokens = {
    accessToken: string;
    refreshToken: string;
};
export type AccessTokenPayload = {
    id: number;
};
export type RefreshTokenPayload = {
    id: number;
    reauthKey: string;
};
export type GrabpassConfig = {
    algorithm: jwt.Algorithm;
    accessTokenExpiresIn: string;
    refreshTokenExpiresIn: string;
    secret: string;
};
export type GrabpassConstructorArgs = {
    config: Partial<Omit<GrabpassConfig, 'secret'>> & {
        secret: string;
    };
};
export declare class Grabpass {
    private config;
    constructor(args: GrabpassConstructorArgs);
    createAuthTokens({ accessTokenPayload, refreshTokenPayload }: {
        accessTokenPayload: AccessTokenPayload;
        refreshTokenPayload: RefreshTokenPayload;
    }): AuthTokens;
    verifyAccessToken(token: string): AccessTokenPayload;
    verifyRefreshToken(token: string): RefreshTokenPayload;
    private verifyToken;
}
