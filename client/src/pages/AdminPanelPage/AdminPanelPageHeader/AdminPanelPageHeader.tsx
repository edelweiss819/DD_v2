import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

const AdminPanelPageHeader: React.FC = () => {
    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" sx={{flexGrow: 1}}>
                    Панель управления
                </Typography>
                <Box sx={{
                    display: 'flex',
                    gap: 1
                }}>
                    <Button color="secondary"
                            variant="contained">Пользователи</Button>
                    <Button variant="contained"
                            color="secondary">Статьи</Button>
                    <Button color="warning" variant="contained">Выход</Button>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default AdminPanelPageHeader;
