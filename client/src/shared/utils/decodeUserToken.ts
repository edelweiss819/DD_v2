import {jwtDecode} from 'jwt-decode';
import {DecodedUserToken} from '../../types';

export const decodeUserToken = (token: string): DecodedUserToken => {
    return jwtDecode<DecodedUserToken>(token);
};
