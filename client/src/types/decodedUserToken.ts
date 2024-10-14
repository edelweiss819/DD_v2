import {IUser} from './users.ts';

export type DecodedUserToken = Pick<IUser, 'index' | 'role'> & {
    exp: number;
    iat: number;
};
