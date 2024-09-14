import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {IArticle} from '../../../types';

export interface IArticlesState {
    articlesList: IArticle[];
    totalPages: number;
    currentPage: number;
}

const initialState: IArticlesState = {
    articlesList: [],
    totalPages: 0,
    currentPage: 1,
};


const articleListSlice = createSlice({
                                         name: 'articlesList',
                                         initialState,
                                         reducers: {
                                             setArticlesList: (state,
                                                               action: PayloadAction<IArticle[]>) => {
                                                 state.articlesList = action.payload;
                                             },
                                             resetArticlesList: (state) => {
                                                 state.articlesList = [];
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
    setArticlesList,
    resetArticlesList,
    setTotalPages,
    setCurrentPage,
} = articleListSlice.actions;

export default articleListSlice.reducer;
