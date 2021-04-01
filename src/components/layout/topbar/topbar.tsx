import React from 'react';
import './topbar.scss';
import Navigation from './navigation/navigation';
import Dropdown from './dropdown/dropdown';

const Topbar = () => {
    return (
        <div className="topbar">
            <h1 className="logo"><a href="#">MovieMatch</a></h1>
            <Navigation />
            <Dropdown />
        </div>
    );
}

export default Topbar;