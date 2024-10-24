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
        const mergedConfig = {
            ...DEFAULT_GRABPASS_CONFIG,
            ...args.config
        };
        this.validateConfig(mergedConfig);
        this.config = mergedConfig;
    }
    createAuthTokens({ accessTokenPayload, refreshTokenPayload, config }) {
        const mergedConfig = {
            ...this.config,
            ...config
        };
        this.validateConfig(mergedConfig);
        return {
            accessToken: jwt.sign(accessTokenPayload, mergedConfig.secret, {
                algorithm: mergedConfig.algorithm,
                expiresIn: mergedConfig.accessTokenExpiresIn
            }),
            refreshToken: jwt.sign(refreshTokenPayload, mergedConfig.secret, {
                algorithm: mergedConfig.algorithm,
                expiresIn: mergedConfig.refreshTokenExpiresIn
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
    validateConfig(config) {
        if (process.env.NODE_ENV === 'development')
            return;
        switch (config.algorithm) {
            case 'HS256': {
                if (config.secret.length < 32) {
                    throw new Error('Secret must be at least 32 characters long when using HS256 algorithm.');
                }
                break;
            }
            case 'HS384': {
                if (config.secret.length < 48) {
                    throw new Error('Secret must be at least 48 characters long when using HS384 algorithm.');
                }
                break;
            }
            case 'HS512': {
                if (config.secret.length < 64) {
                    throw new Error('Secret must be at least 64 characters long when using HS512 algorithm.');
                }
                break;
            }
        }
    }
}
exports.Grabpass = Grabpass;
//# sourceMappingURL=grabpass.js.map