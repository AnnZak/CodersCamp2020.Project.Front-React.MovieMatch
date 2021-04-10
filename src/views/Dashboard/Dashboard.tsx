import React from 'react';
import './Dashboard.scss'
import Topbar from '../../components/layout/topbar/topbar';

function Dashboard() {

    return (
        <div className="dashboard">
            <Topbar />
            <h1>We good, dawg!</h1>
        </div>
    );
}

export default Dashboard;