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
    secret?: jwt.Secret;
    publicKey?: jwt.PublicKey;
    privateKey?: jwt.PrivateKey;
};
export type GrabpassConstructorArgs = {
    config: Partial<GrabpassConfig>;
};
export declare class Grabpass {
    private config;
    constructor(args: GrabpassConstructorArgs);
    createAuthTokens({ accessTokenData, refreshTokenData }: {
        accessTokenData: AccessTokenData;
        refreshTokenData: RefreshTokenData;
    }): AuthTokens;
    verifyAccessToken(token: string, config?: Partial<GrabpassConfig>): AccessTokenPayload;
    verifyRefreshToken(token: string, config?: Partial<GrabpassConfig>): RefreshTokenPayload;
    private getSignKey;
    private getVerifyKey;
    private validateConfig;
    private validateHmacSecretLength;
    private verifyToken;
}
