import React from 'react';
import AdminPanelPageHeader
    from './AdminPanelPageHeader/AdminPanelPageHeader.tsx';
import AdminPanelPageContent
    from './AdminPanelPageContent/AdminPanelPageContent.tsx';

const AdminPanelPage: React.FC = () => {
    return (
        <>
            <AdminPanelPageHeader/>
            <AdminPanelPageContent/>
        </>
    );
};

export default AdminPanelPage;
