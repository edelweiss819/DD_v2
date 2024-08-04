import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {IArticle} from '../../../types';
import {fetchArticles} from '../api';
import {fetchFilteredArticles} from '../../search/api';

export interface IArticlesState {
    articles: IArticle[];
    isLoading: boolean;
    isError: boolean;
    hasNextPage: boolean;
    nextPage: number;
    filteredHasNextPage: boolean;
    filteredNextPage: number;
    isFirstFilteredRequest: boolean;
    searchParameters?: string;
    isSearchParamsChanged: boolean;
}

const initialState: IArticlesState = {
    articles: [],
    isLoading: false,
    isError: false,
    hasNextPage: true,
    nextPage: 1,
    filteredHasNextPage: true,
    filteredNextPage: 1,
    isFirstFilteredRequest: true,
    searchParameters: undefined,
    isSearchParamsChanged: false,
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

export const loadFilteredArticles = createAsyncThunk<IArticle[], {
    p: string;
    page: number
}>(
    'articles/loadFilteredArticles',
    async ({p, page}) => {
        try {
            const filteredArticles = await fetchFilteredArticles({p, page});
            return filteredArticles;
        } catch (error) {
            console.error('Error fetching filtered articles:', error);
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
            state.filteredHasNextPage = true;
            state.filteredNextPage = 1;
            state.isFirstFilteredRequest = true;
            state.searchParameters = undefined;
        },
        setSearchParameters: (state, action: PayloadAction<string>) => {
            state.searchParameters = action.payload;
            state.isSearchParamsChanged = true;
            state.filteredHasNextPage = true;
            state.filteredNextPage = 1;
            state.isFirstFilteredRequest = true;
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
                state.hasNextPage = action.payload.length >= 10;
                if (state.hasNextPage) {
                    state.nextPage += 1;
                }
            })
            .addCase(loadArticles.rejected, (state) => {
                state.isLoading = false;
                state.isError = true;
            })
            .addCase(loadFilteredArticles.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(loadFilteredArticles.fulfilled, (state, action) => {
                state.isLoading = false;
                if (state.isSearchParamsChanged) {
                    state.articles = action.payload; // Обновляем статьи для новых параметров
                    state.isSearchParamsChanged = false; // Сбрасываем флаг
                } else if (state.isFirstFilteredRequest) {
                    state.articles = action.payload;
                    state.isFirstFilteredRequest = false;
                } else {
                    state.articles = [...state.articles, ...action.payload];
                }
                state.filteredHasNextPage = action.payload.length >= 10;
                if (state.filteredHasNextPage) {
                    state.filteredNextPage += 1;
                }
            })
            .addCase(loadFilteredArticles.rejected, (state) => {
                state.isLoading = false;
                state.isError = true;
            });
    }
});

export const {
    setArticles,
    resetArticles,
    setSearchParameters
} = articlesSlice.actions;

export default articlesSlice.reducer;
