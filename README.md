<div align="center">

# grabpass

*A simple and minimal token-based stateless authentication for Node.js*

[![Test Status](https://github.com/grabss/grabpass/actions/workflows/test.yml/badge.svg)](https://github.com/grabss/grabpass/actions/workflows/test.yml)
[![NPM Version](https://img.shields.io/npm/v/grabpass.svg)](https://www.npmjs.com/package/grabpass)
[![License](https://img.shields.io/npm/l/grabpass.svg)](https://www.npmjs.com/package/grabpass)

</div>

## Installation

```bash
npm install grabpass
```

## How to use
***grabpass*** provides a simple way to generate and verify access and refresh tokens with customizable configuration options.

```ts
import { Grabpass } from 'grabpass'

// Create a new instance of Grabpass
const grabpass = new Grabpass({
  // config: PartialGrabpassConfig
  config: {
    algorithm: 'HS256',
    accessTokenExpiresIn: '30m',
    refreshTokenExpiresIn: '30d',
    secret: 'your-secret-4a1425c50f8b84148a39'
  }
})

// Create auth tokens
const tokens = grabpass.createAuthTokens({
  accessTokenData: {
    payload: { userId: 123 }
  },
  refreshTokenData: {
    payload: { userId: 123 }
  }
})

// Verify access token
try {
  const payload = grabpass.verifyAccessToken(tokens.accessToken)
  console.log('Verified Payload:', payload)
} catch (e) {
  console.error('Invalid Token:', e)
}

// Verify refresh token
try {
  const payload = grabpass.verifyRefreshToken(tokens.refreshToken)
  console.log('Verified Payload:', payload)
} catch (e) {
  console.error('Invalid Token:', e)
}
```

## Configuration
Configuration can be defined globally via the constructor's `config` option and overridden for specific operations when using methods like `createAuthTokens`, `verifyAccessToken`, and `verifyRefreshToken`.

```ts
type GrabpassConfig = {
  algorithm: jwt.Algorithm
  accessTokenExpiresIn: ms.StringValue
  refreshTokenExpiresIn: ms.StringValue
  secret?: jwt.Secret
  publicKey?: jwt.PublicKey
  privateKey?: jwt.PrivateKey
}
```

|Property|Type|Default|Description|
|---|---|---|---|
|**algorithm**|`jwt.Algorithm`|`HS256`|The algorithm used for signing the JWT.<br>See [Algorithms Supported](https://github.com/auth0/node-jsonwebtoken#algorithms-supported) for more details.|
|**accessTokenExpiresIn**|`ms.StringValue`|`30m`| Expiration time for access token.|
|**refreshTokenExpiresIn**|`ms.StringValue`|`30d`| Expiration time for refresh token.|
|**secret**|`jwt.Secret`|-|The secret key used for signing tokens. Required if algorithm is symmetric (e.g., HS256).|
|**publicKey**|`jwt.PublicKey`|-|The public key used for verifying tokens. Required if algorithm is asymmetric (e.g., RS256).|
|**privateKey**|`jwt.PublicKey`|-|The private key used for signing tokens. Required if algorithm is asymmetric (e.g., RS256).|

### Overriding configuration per operation
Customize settings for individual operations by passing a config object to the method:
```ts
import { Grabpass } from 'grabpass'

const tokens = grabpass.createAuthTokens({
  accessTokenData: {
    payload: { userId: 123 },
    config: {
      accessTokenExpiresIn: '15m', // Override the expiration time
      secret: 'custom-secret-key-1fa03e3bd39f1f' // Use a different secret
    }
  },
  refreshTokenData: {
    payload: { userId: 123 },
    config: {
      refreshTokenExpiresIn: '15m', // Override the expiration time
      secret: 'custom-secret-key-bf21899e3f6b70' // Use a different secret
    }
  }
})

try {
  const payload = grabpass.verifyAccessToken(tokens.accessToken, {
    secret: 'custom-secret-key-1fa03e3bd39f1f' // Use a different secret
  })
  console.log('Verified Payload:', payload)
} catch (e) {
  console.error('Invalid Token:', e)
}

try {
  const payload = grabpass.verifyRefreshToken(tokens.refreshToken, {
    secret: 'custom-secret-key-bf21899e3f6b70' // Use a different secret
  })
  console.log('Verified Payload:', payload)
} catch (e) {
  console.error('Invalid Token:', e)
}
```

## License

MIT License - see [LICENSE](./LICENSE) file for details.
