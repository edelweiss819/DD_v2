import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {IArticle} from '../../../types';


export interface ISingleArticleState {
    article: IArticle,
    isLoading: boolean;
    isError: boolean;
}

const initialState: ISingleArticleState = {
    article: {},
    isLoading: false,
    isError: false,
}


const singleArticleSlice = createSlice({
                                           name: 'singleArticle',
                                           initialState,
                                           reducers: {
                                               setArticle: (state,
                                                            action: PayloadAction<IArticle>) => {
                                                   state.article = action.payload;
                                               }
                                           },

                                       })

export const {setArticle} = singleArticleSlice.actions;
export default singleArticleSlice.reducer;