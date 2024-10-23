import React from 'react';
import Paper from '@mui/material/Paper';
import {DataGrid, GridColDef} from '@mui/x-data-grid';
import {useSelector} from 'react-redux';
import {RootState} from '../../../store/store.ts';
import {useGetAllUsers} from '../../../features/auth/hooks';
import {timestampToLocalDate} from '../../../shared/utils';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

const columns: (handleEdit: (user: any) => void,
                handleDelete: (userId: number) => void) => GridColDef[] = (handleEdit,
                                                                           handleDelete) => [
    {
        field: 'index',
        headerName: 'Index',
        width: 70,
        editable: false,
        disableColumnMenu: true,
        sortable: false
    },
    {
        field: 'firstName',
        headerName: 'Имя',
        flex: 1,
        editable: true,
        disableColumnMenu: true,
        sortable: false
    },
    {
        field: 'lastName',
        headerName: 'Фамилия',
        flex: 1,
        editable: true,
        disableColumnMenu: true,
        sortable: false
    },
    {
        field: 'email',
        headerName: 'Email',
        flex: 1,
        editable: true,
        disableColumnMenu: true,
        sortable: false
    },
    {
        field: 'registrationDate',
        headerName: 'Дата регистрации',
        flex: 1,
        editable: false,
        sortable: false,
        disableColumnMenu: true,
    },
    {
        field: 'role',
        headerName: 'Роль',
        flex: 1,
        editable: true,
        disableColumnMenu: true,
        sortable: false
    },
    {
        field: 'control',
        headerName: '',
        flex: 1,
        sortable: false,
        disableColumnMenu: true,
        renderCell: (params) => (
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    height: '100%',
                }}
            >
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleEdit(params.row)}
                    sx={{marginRight: 1}}
                    size="small"
                >
                    Изменить
                </Button>
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleDelete(params.row.id)}
                    size="small"
                >
                    Удалить
                </Button>
            </Box>
        ),
    }
];

const paginationModel = {
    page: 0,
    pageSize: 25,
};

const AdminPanelPageContent: React.FC = () => {
    const {token} = useSelector((state: RootState) => state.user);
    const fields = 'index,firstName,lastName,email,registrationDate,role';
    const limit = 25;
    const page = 1;

    const {
        data,
        isLoading,
        error
    } = useGetAllUsers({
                           token,
                           fields,
                           limit,
                           page,
                           sortBy: 'index',
                           sortIndex: 1,
                       });

    const handleRowEdit = async (newRow: any) => {
        return newRow;
    };

    const handleEdit = (user: any) => {
        console.log('Редактировать пользователя:', user);
    };

    const handleDelete = (userId: number) => {
        console.log('Удалить пользователя с ID:', userId);
    };

    if (isLoading) {
        return <div>Загрузка...</div>;
    }

    if (error) {
        return <div>Ошибка: {error.message}</div>;
    }

    const rows = data?.users.map((user) => ({
        id: user.index,
        index: user.index,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        registrationDate: timestampToLocalDate(user.registrationDate!),
        role: user.role,
    })) || [];

    return (
        <Paper sx={{
            paddingX: 1,
            paddingY: 1
        }}>
            <DataGrid
                rows={rows}
                columns={columns(handleEdit, handleDelete)}
                disableRowSelectionOnClick
                paginationModel={paginationModel}
                pageSizeOptions={[
                    25,
                    50,
                    100
                ]}
                sx={{paddingY: 1}}
                processRowUpdate={handleRowEdit}
            />
        </Paper>
    );
};

export default AdminPanelPageContent;
