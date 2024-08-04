import {combineReducers} from '@reduxjs/toolkit';
import articlesSlice from '../features/articles/slice/articlesSlice';
import singleArticleSlice
    from '../features/articles/slice/singleArticleSlice';

const rootReducer = combineReducers({
    singleArticle: singleArticleSlice,
    articles: articlesSlice,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
