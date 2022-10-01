import { Outlet } from 'react-router-dom';

import './Root.css';
import SidebarWithHeader from '../components/SidebarWithHeader';

export default function Root() {
    return (
        <SidebarWithHeader>
            <Outlet />
        </SidebarWithHeader>
    );
}
