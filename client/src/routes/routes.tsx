import React from 'react';
import {Routes, Route} from 'react-router-dom';
import MainPage from '../pages/MainPage/MainPage.tsx';
import ArticlePage from '../pages/ArticlePage/ArticlePage.tsx';

const AppRoutes: React.FC = () => {
    return (
        <Routes>
            <Route path="/" element={<MainPage/>}/>
            <Route path="articles/:index" element={<ArticlePage/>}/>
        </Routes>
    );
};

export default AppRoutes;
