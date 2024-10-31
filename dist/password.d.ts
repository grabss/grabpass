export declare function createHashedPassword(plain: string, saltRounds?: number): Promise<string>;
export declare function createHashedPasswordSync(plain: string, saltRounds?: number): string;
export declare function comparePassword(plain: string, hashed: string): Promise<boolean>;
export declare function comparePasswordSync(plain: string, hashed: string): boolean;
