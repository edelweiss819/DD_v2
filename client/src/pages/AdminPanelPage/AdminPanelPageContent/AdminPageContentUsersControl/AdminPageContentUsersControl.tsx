import React from 'react';
import Paper from '@mui/material/Paper';
import {DataGrid, GridColDef} from '@mui/x-data-grid';
import {useSelector} from 'react-redux';
import {RootState} from '../../../../store/store.ts';
import {
    IUser,
    useDeleteUser,
    useFetchAllUsers,
    usePatchUserData
} from '../../../../entities/users';
import {timestampToLocalDate} from '../../../../shared/utils';
import Button from '@mui/material/Button';

const roles = [
    'admin',
    'user'
];

const columns = (
    handleDelete: (userId: number) => void,
    handleRowEdit: (newRow: Partial<IUser>, oldRow: Partial<IUser>) => void
): GridColDef[] => [
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
        renderCell: (params) => {
            return <span>{timestampToLocalDate(params.value)} </span>;
        }
    },
    {
        field: 'role',
        headerName: 'Роль',
        flex: 1,
        editable: true,
        disableColumnMenu: true,
        sortable: false,
        renderEditCell: (params) => {
            return (
                <select
                    value={params.value}
                    onChange={(e) => {
                        const newRole = e.target.value;
                        params.api.setEditCellValue({
                                                        id: params.id,
                                                        field: 'role',
                                                        value: newRole,
                                                    });

                        const updatedRow = {
                            ...params.row,
                            role: newRole
                        };
                        handleRowEdit(updatedRow, params.row);
                    }}
                    style={{width: '100%'}}
                >
                    {roles.map((role) => (
                        <option key={role} value={role}>
                            {role}
                        </option>
                    ))}
                </select>
            );
        }
    },
    {
        field: 'control',
        headerName: '',
        sortable: false,
        disableColumnMenu: true,
        renderCell: (params) => (
            <Button
                variant="contained"
                color="secondary"
                onClick={() => handleDelete(params.row.id)}
                size="small"
            >
                Удалить
            </Button>
        ),
    }
];

const paginationModel = {
    page: 0,
    pageSize: 25,
};

const AdminPanelPageContentUsersControl: React.FC = () => {
    const {token} = useSelector((state: RootState) => state.user);
    const fields = 'index,firstName,lastName,email,registrationDate,role';
    const limit = 25;
    const page = 1;

    const {
        data,
        isLoading,
        error
    } = useFetchAllUsers({
                             token: token!,
                             fields,
                             limit,
                             page,
                             sortBy: 'index',
                             sortIndex: 1,
                         });

    const editUserMutation = usePatchUserData();

    const handleRowEdit = (newRow: Partial<IUser>, oldRow: Partial<IUser>) => {
        const isRowChanged = Object.keys(newRow).some(
            (key) => newRow[key as keyof IUser] !== oldRow[key as keyof IUser]
        );
        if (isRowChanged) {
            editUserMutation.mutate({
                                        token: token!,
                                        index: newRow.index!.toString(),
                                        updatedData: newRow
                                    });
        }

        return newRow;
    };

    const deleteUserMutation = useDeleteUser();
    const handleDelete = (userIndex: number) => {
        deleteUserMutation.mutate({
                                      token: token!,
                                      index: userIndex.toString()
                                  });
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
        registrationDate: user.registrationDate,
        role: user.role,
    })) || [];

    return (
        <Paper sx={{
            paddingX: 1,
            paddingY: 1,
            marginX: 3,
            marginY: 3,
        }}>
            <DataGrid
                rows={rows}
                columns={columns(handleDelete, handleRowEdit)}
                disableRowSelectionOnClick
                disableColumnResize
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

export default AdminPanelPageContentUsersControl;