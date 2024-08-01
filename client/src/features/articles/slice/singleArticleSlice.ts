import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {IArticle} from '../../../types';
import {fetchArticleByIndex} from '../api';

export interface ISingleArticleState {
    article: IArticle | null,
    isLoading: boolean;
    isError: boolean;
    errorMessage: string;
}

const initialState: ISingleArticleState = {
    article: {},
    isLoading: false,
    isError: false,
    errorMessage: '',
}

export const loadSingleArticleByIndex = createAsyncThunk<IArticle, string, {
    rejectValue: string
}>(
    'singleArticle/loadSingleArticleById',
    async (index: string, {rejectWithValue}) => {
        try {
            const article = await fetchArticleByIndex(index);
            return article;
        } catch (error) {
            console.error('Error fetching article:', error);
            return rejectWithValue('Failed to fetch article');
        }
    }
);

const singleArticleSlice = createSlice({
    name: 'singleArticle',
    initialState,
    reducers: {
        setArticle: (state, action: PayloadAction<IArticle>) => {
            state.article = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(loadSingleArticleByIndex.pending, (state) => {
            state.isLoading = true;
            state.isError = false;
            state.errorMessage = '';
        }).addCase(loadSingleArticleByIndex.fulfilled, (state, action: PayloadAction<IArticle>) => {
            state.isLoading = false;
            state.article = action.payload;

        }).addCase(loadSingleArticleByIndex.rejected, (state, action) => {
            state.isError = true;
            state.errorMessage = action.payload as string || 'Failed to fetch article';
        });
    },
})

export const {setArticle} = singleArticleSlice.actions;
export default singleArticleSlice.reducer;