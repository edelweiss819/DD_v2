import {combineReducers} from '@reduxjs/toolkit';
import searchReducer from '../features/search/slice/searchSlice';
import articlesSlice from '../features/articles/slice/articlesSlice';
import singleArticleSlice
    from '../features/articles/slice/singleArticleSlice';

const rootReducer = combineReducers({
    search: searchReducer,
    singleArticle: singleArticleSlice,
    articles: articlesSlice,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
