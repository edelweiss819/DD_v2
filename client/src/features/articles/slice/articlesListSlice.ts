import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {IArticle} from '../../../types';

export interface IArticlesState {
    articlesList: IArticle[];
    totalPages: number;
    currentPage: number;
}

const initialState: IArticlesState = {
    articlesList: [],
};


const articlesListSlice = createSlice({
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
} = articlesListSlice.actions;

export default articlesListSlice.reducer;
