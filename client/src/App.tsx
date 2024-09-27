import React from 'react';
import AppRoutes from './routes/routes.tsx';
import {BrowserRouter} from 'react-router-dom';
import './App.module.scss'
// import 'styles/styles.scss'

const App: React.FC = () => {
    return (
        <BrowserRouter>
            <AppRoutes/>
        </BrowserRouter>
    );
};

export default App;
