import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {IArticle} from '../../../types';


export interface ISingleArticleState {
    singleArticle: IArticle,
    currentArticleIndex: number;
    authorName: string;

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
    authorName: '',
    currentArticleIndex: 0,

}


const singleArticleSlice = createSlice({
                                           name: 'singleArticle',
                                           initialState,
                                           reducers: {
                                               setSingleArticle: (state,
                                                                  action: PayloadAction<IArticle>) => {
                                                   state.singleArticle = action.payload;
                                               },
                                               setAuthorName: (state,
                                                               action: PayloadAction<string>) => {
                                                   state.authorName = action.payload;
                                               },
                                               setCurrentArticleIndex: (state,
                                                                        action: PayloadAction<number>) => {
                                                   state.currentArticleIndex = action.payload;
                                               }
                                           },

                                       })

export const {
    setSingleArticle,
    setCurrentArticleIndex,
    setAuthorName
} = singleArticleSlice.actions;
export default singleArticleSlice.reducer;