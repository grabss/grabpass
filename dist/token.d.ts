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
export declare function createAuthToken({ accessTokenPayload, refreshTokenPayload }: {
    accessTokenPayload: AccessTokenPayload;
    refreshTokenPayload: RefreshTokenPayload;
}): AuthTokens;
export declare function verifyAccessToken(token: string): AccessTokenPayload;
export declare function verifyRefreshToken(token: string): RefreshTokenPayload;
