<h3 align="center">grabpass</h3>

<p align="center">
  A simple and minimal token-based stateless authentication for Node.js.
</p>

<p align="center">
  <a href="https://github.com/grabss/grabpass/actions/workflows/test.yml" target="_blank"><img src="https://github.com/grabss/grabpass/actions/workflows/test.yml/badge.svg" alt="Test Status" /></a>
  <a href="https://www.npmjs.com/package/grabpass" target="_blank"><img src="https://img.shields.io/npm/v/grabpass.svg" alt="NPM Version" /></a>
  <a href="https://www.npmjs.com/package/grabpass" target="_blank"><img src="https://img.shields.io/npm/l/grabpass.svg" alt="Package License" /></a>
</p>

---

## Installation
```console
npm i grabpass
```

## How to use
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
```

## Configuration
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
|`algorithm`|`jwt.Algorithm`|`HS256`|The algorithm used for signing the JWT.<br>See [Algorithms Supported](https://github.com/auth0/node-jsonwebtoken#algorithms-supported) for more details.|
|`accessTokenExpiresIn`|`ms.StringValue`|`30m`| Expiration time for access token.|
|`refreshTokenExpiresIn`|`ms.StringValue`|`30d`| Expiration time for refresh token.|
