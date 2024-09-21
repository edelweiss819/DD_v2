import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {IArticle} from '../../../types';


export interface ISingleArticleState {
    singleArticle: IArticle,
    title: string,
    genres: string[],
    content: string,
    index: number,
    publishedDate: number,
    estimatedReadingTime: number,
    characterCount: number,
    currentArticleIndex: number;

}

const initialState: ISingleArticleState = {
    singleArticle: {
        title: '',
        genres: [],
        content: '',
        index: 0,
        publishedDate: 0,
        characterCount: 0,
        estimatedReadingTime: 0,
    },

}


const singleArticleSlice = createSlice({
                                           name: 'singleArticle',
                                           initialState,
                                           reducers: {
                                               setSingleArticle: (state,
                                                                  action: PayloadAction<IArticle>) => {
                                                   state.singleArticle = action.payload;
                                               },
                                               resetSingleArticle: (state,) => {
                                                   state.singleArticle = initialState;
                                               },
                                               setCurrentArticleIndex: (state,
                                                                        action: PayloadAction<number>) => {
                                                   state.currentArticleIndex = action.payload;
                                               }
                                           },

                                       })

export const {
    setSingleArticle,
    resetSingleArticle,
    setCurrentArticleIndex,
} = singleArticleSlice.actions;
export default singleArticleSlice.reducer;