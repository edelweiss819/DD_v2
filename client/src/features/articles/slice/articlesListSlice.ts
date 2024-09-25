import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {IArticle} from '../../../types';
import {IFetchArticlesListByGenreAndWordsParams} from '../../search/api';

export interface IArticlesState {
    articlesList: IArticle[];
    totalPages: number;
    currentPage: number;
    isError: boolean;
    errorMessage: string;
    searchParams: IFetchArticlesListByGenreAndWordsParams,
    lastCursor: number;
    updatedLastCursor: number,
    sortOrder: number,
}

const initialState: IArticlesState = {
    articlesList: [],
    totalPages: 1,
    currentPage: 1,
    isError: false,
    errorMessage: '',
    searchParams: {
        page: 1,
    },
    lastCursor: 0,
    updatedLastCursor: 0,
    sortOrder: 1
};


const articlesListSlice = createSlice({
                                          name: 'articlesList',
                                          initialState,
                                          reducers: {
                                              setArticlesList: (state,
                                                                action: PayloadAction<IArticle[]>) => {
                                                  state.errorMessage = '';
                                                  state.isError = false;
                                                  state.articlesList = action.payload;
                                              },
                                              resetArticlesList: (state) => {
                                                  state.articlesList = [];
                                                  state.isError = true;
                                                  state.currentPage = 1;
                                              },
                                              setTotalPages: (state,
                                                              action: PayloadAction<number>) => {
                                                  state.totalPages = action.payload;
                                              },
                                              setCurrentPage: (state,
                                                               action: PayloadAction<number>) => {
                                                  state.currentPage = action.payload;
                                              },
                                              setSearchParams: (state,
                                                                action: PayloadAction<IFetchArticlesListByGenreAndWordsParams>) => {
                                                  state.searchParams = action.payload;
                                              },
                                              setLastCursor: (state,
                                                              action: PayloadAction<number>) => {
                                                  state.lastCursor = action.payload;
                                              },
                                              updateLastCursor: (state,
                                                                 action: PayloadAction<number>) => {
                                                  state.updatedLastCursor = action.payload;
                                              },
                                              setSortOrder: (state,
                                                             action: PayloadAction<number>) => {
                                                  state.sortOrder = action.payload;
                                              },
                                          },
                                      });

export const {
    setArticlesList,
    resetArticlesList,
    setTotalPages,
    setCurrentPage,
    setSearchParams,
    setLastCursor,
    updateLastCursor,
    setSortOrder,
} = articlesListSlice.actions;

export default articlesListSlice.reducer;
