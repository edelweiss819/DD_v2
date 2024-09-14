import React from 'react';
import {Routes, Route} from 'react-router-dom';
import MainPage from '../pages/MainPage/MainPage.tsx';
import SingleArticlePage
    from '../pages/SingleArticlePage/SingleArticlePage.tsx';


const AppRoutes: React.FC = () => {
    return (
        <Routes>
            <Route path="/" element={<MainPage/>}/>
            <Route path="articles/:index" element={<SingleArticlePage/>}/>
        </Routes>
    );
};

export default AppRoutes;
