import React, {useEffect} from 'react';
import AppRoutes from './routes/routes.tsx';
import {BrowserRouter} from 'react-router-dom';
import styles from './App.module.scss'
import {useDispatch} from 'react-redux';
import {AppDispatch} from './store/store.ts';
import {setAuthorized} from './features/auth/slice/userSlice.ts';
import TokenManager from './features/tokenManager/TokenManager.ts';


const App: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();


    useEffect(() => {
        const isAuthorized = JSON.parse(localStorage.getItem('isAuthorized') || 'false');
        dispatch(setAuthorized(isAuthorized));

    }, [dispatch]);


    return (
        <BrowserRouter>
            <TokenManager/>
            <div className={styles['app']}>
                <AppRoutes/>
            </div>
        </BrowserRouter>
    );
};

export default App;
