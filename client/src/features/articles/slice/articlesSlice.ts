import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {IArticle} from '../../../types';
import {fetchArticles} from '../api';

export interface IArticlesState {
    articles: IArticle[];
    isLoading: boolean;
    isError: boolean;
    hasNextPage: boolean;
    nextPage: number;
}

const initialState: IArticlesState = {
    articles: [],
    isLoading: false,
    isError: false,
    hasNextPage: true,
    nextPage: 1,
};

export const loadArticles = createAsyncThunk<IArticle[], number>(
    'articles/loadArticles',
    async (page: number) => {
        try {
            const articles: IArticle[] = await fetchArticles({pageParam: page});
            return articles;
        } catch (error) {
            console.error('Error fetching articles:', error);
            throw error;
        }
    }
);


const articlesSlice = createSlice({
    name: 'articles',
    initialState,
    reducers: {
        setArticles: (state, action: PayloadAction<IArticle[]>) => {
            state.articles = action.payload;
        },
        resetArticles: (state) => {
            state.articles = [];
            state.isLoading = false;
            state.isError = false;
            state.hasNextPage = true;
            state.nextPage = 1;
        },
        appendArticles: (state, action: PayloadAction<IArticle[]>) => {
            state.articles = [...state.articles, ...action.payload];
        },
        setNextPage: (state, action: PayloadAction<number>) => {
            state.nextPage = action.payload;
        },
        setHasNextPage: (state, action: PayloadAction<boolean>) => {
            state.hasNextPage = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loadArticles.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(loadArticles.fulfilled, (state, action) => {
                state.isLoading = false;
                state.articles = [...state.articles, ...action.payload];
                state.nextPage += 1;
            })
            .addCase(loadArticles.rejected, (state) => {
                state.isLoading = false;
                state.isError = true;
            })
        ;
    }
});

export const {
    setArticles,
    resetArticles,
    appendArticles,
    setNextPage,
    setHasNextPage,
} = articlesSlice.actions;

export default articlesSlice.reducer;
