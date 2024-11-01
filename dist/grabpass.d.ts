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
};
export type AccessTokenData = {
    payload: AccessTokenPayload;
    config?: PartialGrabpassConfig;
};
export type RefreshTokenData = {
    payload: RefreshTokenPayload;
    config?: PartialGrabpassConfig;
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
    config: PartialGrabpassConfig;
};
export type PartialGrabpassConfig = Partial<GrabpassConfig>;
export declare class Grabpass {
    private config;
    constructor(args: GrabpassConstructorArgs);
    createAuthTokens({ accessTokenData, refreshTokenData }: {
        accessTokenData: AccessTokenData;
        refreshTokenData: RefreshTokenData;
    }): AuthTokens;
    verifyAccessToken(token: string, config?: PartialGrabpassConfig): AccessTokenPayload;
    verifyRefreshToken(token: string, config?: PartialGrabpassConfig): RefreshTokenPayload;
    private verifyToken;
    private getSignKey;
    private getVerifyKey;
    private validateConfig;
    private validateHmacSecretLength;
}
