import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {IArticle} from '../../../types';

export interface ISingleArticleState {
    singleArticle: Partial<IArticle>;
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
        author: {
            index: 0,
            authorName: '',
        },
    },
    currentArticleIndex: 0,
};

const singleArticleSlice = createSlice({
                                           name: 'singleArticle',
                                           initialState,
                                           reducers: {
                                               setSingleArticle: (
                                                   state,
                                                   action: PayloadAction<Omit<IArticle, 'author'>>
                                               ) => {
                                                   const {
                                                       title,
                                                       genres,
                                                       content,
                                                       index,
                                                       publishedDate,
                                                       characterCount,
                                                       estimatedReadingTime
                                                   } = action.payload;

                                                   if (title !== undefined) state.singleArticle.title = title;
                                                   if (genres !== undefined) state.singleArticle.genres = genres;
                                                   if (content !== undefined) state.singleArticle.content = content;
                                                   if (index !== undefined) state.singleArticle.index = index;
                                                   if (publishedDate !== undefined) state.singleArticle.publishedDate = publishedDate;
                                                   if (characterCount !== undefined) state.singleArticle.characterCount = characterCount;
                                                   if (estimatedReadingTime !== undefined) state.singleArticle.estimatedReadingTime = estimatedReadingTime;
                                               },
                                               setArticleAuthor: (state,
                                                                  action: PayloadAction<Pick<IArticle, 'author'>>) => {
                                                   const {author} = action.payload;
                                                   if (author && state.singleArticle.author) {
                                                       state.singleArticle.author.authorName = author.authorName;
                                                       state.singleArticle.author.index = author.index;
                                                   }

                                               },
                                               setCurrentArticleIndex: (state,
                                                                        action: PayloadAction<number>) => {
                                                   state.currentArticleIndex = action.payload;
                                               },
                                           },
                                       });

export const {
    setSingleArticle,
    setCurrentArticleIndex,
    setArticleAuthor
} = singleArticleSlice.actions;
export default singleArticleSlice.reducer;
