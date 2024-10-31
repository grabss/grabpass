import * as jwt from 'jsonwebtoken';
export type AuthTokens = {
    accessToken: string;
    refreshToken: string;
};
export type AccessTokenPayload = {
    id: number;
};
export type AccessTokenData = {
    payload: AccessTokenPayload;
    config?: Partial<GrabpassConfig>;
};
export type RefreshTokenPayload = {
    id: number;
};
export type RefreshTokenData = {
    payload: RefreshTokenPayload;
    config?: Partial<GrabpassConfig>;
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
    createAuthTokens({ accessTokenData, refreshTokenData }: {
        accessTokenData: AccessTokenData;
        refreshTokenData: RefreshTokenData;
    }): AuthTokens;
    verifyAccessToken(token: string): AccessTokenPayload;
    verifyRefreshToken(token: string): RefreshTokenPayload;
    private verifyToken;
    private validateConfig;
}
