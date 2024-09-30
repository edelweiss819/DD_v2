import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {IUser} from '../../../types/users';
import Cookies from 'js-cookie';

export interface UserState extends IUser {
    isAuthorized: boolean;
    token?: string;
}

const loadUserFromLocalStorage = () => {
    const user = localStorage.getItem('favoriteArticles');
    return user ? JSON.parse(user) : {
        favoriteArticles: [],
    };
};

const loadUserFromCookies = () => {
    return {
        firstName: Cookies.get('firstName'),
        lastName: Cookies.get('lastName'),
        email: Cookies.get('email'),
        token: Cookies.get('token'),
        role: undefined,
    };
};


const initialState: UserState = {
    ...loadUserFromLocalStorage(),
    ...loadUserFromCookies(),
    isAuthorized: JSON.parse(localStorage.getItem('isAuthorized') || 'false'),
};

const userSlice = createSlice({
                                  name: 'userSlice',
                                  initialState,
                                  reducers: {
                                      setUser: (state,
                                                action: PayloadAction<Partial<IUser>>) => {
                                          const user = action.payload;

                                          state.firstName = user.firstName ?? state.firstName;
                                          state.lastName = user.lastName ?? state.lastName;
                                          state.email = user.email ?? state.email;
                                          state.role = user.role ?? state.role;
                                          state.registrationDate = user.registrationDate ?? state.registrationDate;
                                          state.favoriteArticles = user.favoriteArticles ?? [];

                                          localStorage.setItem('favoriteArticles', JSON.stringify(state.favoriteArticles));

                                          Cookies.set('firstName', state.firstName || '', {
                                              expires: 7,
                                              secure: true
                                          });
                                          Cookies.set('lastName', state.lastName || '', {
                                              expires: 7,
                                              secure: true
                                          });
                                          Cookies.set('email', state.email || '', {
                                              expires: 7,
                                              secure: true
                                          });
                                          Cookies.set('role', state.role || '', {
                                              expires: 7,
                                              secure: true
                                          });
                                          Cookies.set('registrationDate', String(state.registrationDate) || '', {
                                              expires: 7,
                                              secure: true
                                          });
                                      },
                                      setAuthorized: (state,
                                                      action: PayloadAction<boolean>) => {
                                          state.isAuthorized = action.payload;
                                          localStorage.setItem('isAuthorized', JSON.stringify(state.isAuthorized));
                                      },
                                      setToken: (state,
                                                 action: PayloadAction<string>) => {
                                          state.token = action.payload;
                                          Cookies.set('token', state.token, {
                                              expires: 7,
                                              secure: true
                                          });
                                      },
                                      removeToken: () => {
                                          Cookies.remove('token');
                                      },
                                      removeUser: (state) => {
                                          state.firstName = '';
                                          state.lastName = '';
                                          state.email = '';
                                          state.token = undefined;
                                          state.role = undefined
                                          state.registrationDate = 0
                                          state.favoriteArticles = []

                                          Cookies.remove('firstName');
                                          Cookies.remove('lastName');
                                          Cookies.remove('email');
                                          Cookies.remove('token');
                                          Cookies.remove('role');
                                          Cookies.remove('registrationDate');

                                          state.isAuthorized = false;
                                          localStorage.removeItem('isAuthorized');
                                          localStorage.removeItem('favoriteArticles');
                                      },
                                      setFavoriteArticles: (state,
                                                            action: PayloadAction<IUser['favoriteArticles']>) => {
                                          state.favoriteArticles = action.payload;
                                          localStorage.setItem('favoriteArticles', JSON.stringify(state.favoriteArticles));
                                      }

                                  },
                              });

export const {
    setUser,
    setAuthorized,
    setToken,
    removeToken,
    removeUser,
    setFavoriteArticles,
} = userSlice.actions;

export default userSlice.reducer;
