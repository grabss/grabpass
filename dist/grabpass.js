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
        const config = {
            ...DEFAULT_GRABPASS_CONFIG,
            ...args.config
        };
        this.validateConfig(config);
        this.config = config;
    }
    createAuthTokens({ accessTokenData, refreshTokenData }) {
        const accessTokenConfig = {
            ...this.config,
            ...accessTokenData.config
        };
        const refreshTokenConfig = {
            ...this.config,
            ...refreshTokenData.config
        };
        this.validateConfig([accessTokenConfig, refreshTokenConfig]);
        return {
            accessToken: jwt.sign(accessTokenData.payload, this.getSignKey(accessTokenConfig), {
                algorithm: accessTokenConfig.algorithm,
                expiresIn: accessTokenConfig.accessTokenExpiresIn
            }),
            refreshToken: jwt.sign(refreshTokenData.payload, this.getSignKey(refreshTokenConfig), {
                algorithm: refreshTokenConfig.algorithm,
                expiresIn: refreshTokenConfig.refreshTokenExpiresIn
            })
        };
    }
    verifyAccessToken(token, config) {
        return this.verifyToken(token, config);
    }
    verifyRefreshToken(token, config) {
        return this.verifyToken(token, config);
    }
    verifyToken(token, config) {
        const verifyConfig = {
            ...this.config,
            ...config
        };
        this.validateConfig(verifyConfig);
        return jwt.verify(token, this.getVerifyKey(verifyConfig));
    }
    getSignKey(config) {
        if (config.algorithm.startsWith('HS')) {
            if (!config.secret) {
                throw new Error('Secret is required for HMAC algorithms.');
            }
            return config.secret;
        }
        else {
            if (!config.privateKey) {
                throw new Error('Private key is required for RSA/ECDSA algorithms.');
            }
            return config.privateKey;
        }
    }
    getVerifyKey(config) {
        if (config.algorithm.startsWith('HS')) {
            if (!config.secret) {
                throw new Error('Secret is required for HMAC algorithms.');
            }
            return config.secret;
        }
        else {
            if (!config.publicKey) {
                throw new Error('Public key is required for RSA/ECDSA algorithms.');
            }
            return config.publicKey;
        }
    }
    validateConfig(config) {
        if (process.env.NODE_ENV === 'development')
            return;
        if (Array.isArray(config)) {
            for (const c of config) {
                this.validateConfig(c);
            }
            return;
        }
        if (config.algorithm === 'none') {
            throw new Error('Algorithm "none" is not allowed.');
        }
        switch (config.algorithm) {
            case 'HS256':
            case 'HS384':
            case 'HS512': {
                if (!config.secret) {
                    throw new Error('Secret is required when using HMAC algorithm.');
                }
                else if (typeof config.secret === 'string') {
                    this.validateHmacSecretLength(config.secret, config.algorithm);
                }
                break;
            }
            case 'RS256':
            case 'RS384':
            case 'RS512':
            case 'ES256':
            case 'ES384':
            case 'ES512': {
                if (!config.privateKey || !config.publicKey) {
                    throw new Error('Both private and public keys are required for RSA/ECDSA algorithms.');
                }
                break;
            }
        }
    }
    validateHmacSecretLength(secret, algorithm) {
        switch (algorithm) {
            case 'HS256': {
                if (secret.length < 32) {
                    throw new Error('Secret must be at least 32 characters long when using HS256 algorithm.');
                }
                break;
            }
            case 'HS384': {
                if (secret.length < 48) {
                    throw new Error('Secret must be at least 48 characters long when using HS384 algorithm.');
                }
                break;
            }
            case 'HS512': {
                if (secret.length < 64) {
                    throw new Error('Secret must be at least 64 characters long when using HS512 algorithm.');
                }
                break;
            }
        }
    }
}
exports.Grabpass = Grabpass;
//# sourceMappingURL=grabpass.js.map