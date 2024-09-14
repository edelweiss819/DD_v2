import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {IArticle} from '../../../types';

export interface IArticlesState {
    articlesList: IArticle[];
    isLoading: boolean;
    isError: boolean;
    totalPages: number;
    currentPage: number;
}

const initialState: IArticlesState = {
    articlesList: [],
    isLoading: false,
    isError: false,
    totalPages: 0,
    currentPage: 0,
};


const articleListSlice = createSlice({
                                         name: 'articlesList',
                                         initialState,
                                         reducers: {
                                             setArticles: (state,
                                                           action: PayloadAction<IArticle[]>) => {
                                                 state.articlesList = action.payload;
                                             },
                                             resetArticles: (state) => {
                                                 state.articlesList = [];
                                                 state.isLoading = false;
                                                 state.isError = false;
                                             },
                                             setTotalPages: (state,
                                                             action: PayloadAction<number>) => {
                                                 state.totalPages = action.payload;
                                             },
                                             setCurrentPage: (state,
                                                              action: PayloadAction<number>) => {
                                                 state.currentPage = action.payload
                                             }

                                         },

                                     });

export const {
    setArticles,
    resetArticles,
    setTotalPages,
    setCurrentPage,
} = articleListSlice.actions;

export default articleListSlice.reducer;
