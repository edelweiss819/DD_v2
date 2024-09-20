import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {IArticle} from '../../../types';

export interface IArticlesState {
    articlesList: IArticle[];
    totalPages: number;
    currentPage: number;
    isError: boolean;
    errorMessage: string;
}

const initialState: IArticlesState = {
    articlesList: [],
    totalPages: 1,
    currentPage: 1,
    isError: false,
    errorMessage: ''
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


                                          },

                                      });

export const {
    setArticlesList,
    resetArticlesList,
    setTotalPages,
    setCurrentPage,
} = articlesListSlice.actions;

export default articlesListSlice.reducer;
