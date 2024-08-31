export interface UserModelInterface {

    id?: number;

    email: string;

    name: string;

    password: string;

    is_banned: boolean;

}

export type FilterUser = Partial<Pick<UserModelInterface, "email" | "id">>;