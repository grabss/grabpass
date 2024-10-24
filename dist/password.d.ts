export declare function createHashedPassword(plain: string, saltRounds?: number): Promise<string>;
export declare function comparePassword(plain: string, hashed: string): Promise<boolean>;
