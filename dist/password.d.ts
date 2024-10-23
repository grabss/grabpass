export declare function createHashedPassword({ plain, saltRounds }: {
    plain: string;
    saltRounds?: number;
}): Promise<string>;
export declare function comparePassword({ plain, encrypted }: {
    plain: string;
    encrypted: string;
}): Promise<boolean>;
