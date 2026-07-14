import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import DashboardPage from '@/pages/Dashboard';
import HomePage from '@/pages/Home';
import NotFoundPage from '@/pages/NotFound';
import SettingsPage from '@/pages/Settings';

const Router = (): React.JSX.Element => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<HomePage />} />

                <Route path='/dashboard' element={<DashboardPage />} />

                <Route path='/settings' element={<SettingsPage />} />

                <Route path='/home' element={<Navigate to='/' replace />} />

                <Route path='*' element={<NotFoundPage />} />
            </Routes>
        </BrowserRouter>
    );
};

export default Router;
