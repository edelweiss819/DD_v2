import React, {useEffect} from 'react';
import AppRoutes from './routes/routes.tsx';
import {BrowserRouter} from 'react-router-dom';
import './App.module.scss';
import {useDispatch} from 'react-redux';
import {AppDispatch} from './store/store.ts';
import {setAuthorized} from './features/auth/slice/userSlice.ts';

const App: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        const isAuthorized = JSON.parse(localStorage.getItem('isAuthorized') || 'false');
        dispatch(setAuthorized(isAuthorized));

    }, [dispatch]);

    return (
        <BrowserRouter>
            <AppRoutes/>
        </BrowserRouter>
    );
};

export default App;
