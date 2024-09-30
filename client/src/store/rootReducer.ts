import {combineReducers} from '@reduxjs/toolkit';
import articlesListSlice from '../features/articles/slice/articlesListSlice.ts';
import singleArticleSlice
    from '../features/articles/slice/singleArticleSlice';
import userSlice from '../features/auth/slice/userSlice.ts';

const rootReducer = combineReducers({
                                        singleArticle: singleArticleSlice,
                                        articlesList: articlesListSlice,
                                        user: userSlice,
                                    });

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
