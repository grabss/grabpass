import * as crypto from 'crypto';
export declare function createHmacToken(data: string, algorithm?: string, encoding?: crypto.BinaryToTextEncoding): {
    token: string;
    createdAt: Date;
};
