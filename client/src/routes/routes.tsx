import React, {Suspense} from 'react';
import {Routes, Route} from 'react-router-dom';
import {GENRES, GENRES_DIR, HEADER_NAVIGATION_PAGES} from '../constants';

const MainPage = React.lazy(() => import('../pages/MainPage/MainPage.tsx'));
const SingleArticlePage = React.lazy(() => import('../pages/SingleArticlePage/SingleArticlePage.tsx'));
const GenresPage = React.lazy(() => import('../pages/GenresPage/GenresPage.tsx'));
const SingleGenrePage = React.lazy(() => import('../pages/SingleGenrePage/SingleGenrePage.tsx'));

const AppRoutes: React.FC = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Routes>
                <Route path={HEADER_NAVIGATION_PAGES['Главная']}
                       element={<MainPage/>}/>
                <Route path="articles/:index" element={<SingleArticlePage/>}/>
                <Route path={HEADER_NAVIGATION_PAGES['Жанры']}
                       element={<GenresPage/>}/>
                <Route path="/genres/:genre" element={<SingleGenrePage/>}/>
                {/*{Object.entries(GENRES).map(([genre, route]) => (*/}
                {/*    <Route*/}
                {/*        path={`${GENRES_DIR}${route}`}*/}
                {/*        key={genre}*/}
                {/*        element={<SingleGenrePage />}*/}
                {/*    />*/}
                {/*))}*/}
            </Routes>
        </Suspense>
    );
};

export default AppRoutes;
