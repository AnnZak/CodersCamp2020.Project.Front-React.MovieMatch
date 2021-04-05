import React from 'react';
import './topbar.scss';
import Navigation from './navigation/navigation';
import Dropdown from './dropdown/dropdown';
import TopLogo from '../../ui/topLogo/topLogo';

const Topbar = () => {
    return (
        <div className="topbar">
            <TopLogo />
            <Navigation />
            <Dropdown />
        </div>
    );
}

export default Topbar;