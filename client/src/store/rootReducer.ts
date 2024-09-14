import {combineReducers} from '@reduxjs/toolkit';
import articlesListSlice from '../features/articles/slice/articleListSlice.ts';
import singleArticleSlice
    from '../features/articles/slice/singleArticleSlice';

const rootReducer = combineReducers({
                                        singleArticle: singleArticleSlice,
                                        articlesList: articlesListSlice,
                                    });

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
