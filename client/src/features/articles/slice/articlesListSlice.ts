import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {IArticle} from '../../../types';
import {IFetchArticlesListByGenreAndWordsParams} from '../../search/api';

export interface IArticlesState {
    articlesList: IArticle[];
    totalPages: number;
    currentPage: number;
    isError: boolean;
    errorMessage: string;
    isSearchActive: boolean;
    searchParams: IFetchArticlesListByGenreAndWordsParams | null,
}

const initialState: IArticlesState = {
    articlesList: [],
    totalPages: 1,
    currentPage: 1,
    isError: false,
    errorMessage: '',
    isSearchActive: false,
    searchParams: null,
};


const articlesListSlice = createSlice({
                                          name: 'articlesList',
                                          initialState,
                                          reducers: {
                                              setArticlesList: (state,
                                                                action: PayloadAction<IArticle[]>) => {
                                                  state.errorMessage = ''
                                                  state.isError = false
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
                                                  state.currentPage = action.payload
                                              },
                                              setActiveSearch(state,
                                                              action: PayloadAction<boolean>) {
                                                  state.isSearchActive = action.payload;
                                              },
                                              setSearchParams(state,
                                                              action: PayloadAction<IFetchArticlesListByGenreAndWordsParams>) {
                                                  state.searchParams = action.payload;
                                              }

                                          },

                                      });

export const {
    setArticlesList,
    resetArticlesList,
    setTotalPages,
    setCurrentPage,
    setActiveSearch,
    setSearchParams
} = articlesListSlice.actions;

export default articlesListSlice.reducer;
