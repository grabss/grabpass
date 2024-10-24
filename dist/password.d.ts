export declare function createHashedPassword({ plain, saltRounds }: {
    plain: string;
    saltRounds?: number;
}): Promise<string>;
export declare function comparePassword({ plain, hashed }: {
    plain: string;
    hashed: string;
}): Promise<boolean>;
