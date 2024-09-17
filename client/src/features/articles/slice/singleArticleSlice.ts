import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {IArticle} from '../../../types';


export interface ISingleArticleState {
    singleArticle: IArticle,
    currentArticleIndex: number;

}

const initialState: ISingleArticleState = {
    singleArticle: {},
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
                                               resetSingleArticle: (state,) => {
                                                   state.singleArticle = {};
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