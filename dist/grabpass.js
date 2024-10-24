"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Grabpass = void 0;
const jwt = __importStar(require("jsonwebtoken"));
const DEFAULT_GRABPASS_CONFIG = {
    algorithm: 'HS256',
    accessTokenExpiresIn: '30m',
    refreshTokenExpiresIn: '30d'
};
class Grabpass {
    constructor(args) {
        this.config = {
            ...DEFAULT_GRABPASS_CONFIG,
            ...args.config
        };
    }
    createAuthTokens({ accessTokenPayload, refreshTokenPayload, config }) {
        const { algorithm, accessTokenExpiresIn, refreshTokenExpiresIn, secret } = {
            ...this.config,
            ...config
        };
        return {
            accessToken: jwt.sign(accessTokenPayload, secret, {
                algorithm,
                expiresIn: accessTokenExpiresIn
            }),
            refreshToken: jwt.sign(refreshTokenPayload, secret, {
                algorithm,
                expiresIn: refreshTokenExpiresIn
            })
        };
    }
    verifyAccessToken(token) {
        return this.verifyToken(token);
    }
    verifyRefreshToken(token) {
        return this.verifyToken(token);
    }
    verifyToken(token) {
        return jwt.verify(token, this.config.secret);
    }
}
exports.Grabpass = Grabpass;
//# sourceMappingURL=grabpass.js.map