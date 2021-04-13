import React from 'react';
import './topbar.scss';
import Navigation from './navigation/navigation';
import Dropdown from './dropdown/dropdown';
import { Link } from 'react-router-dom';

const Topbar = () => {
    return (
        <div className="topbar">
            <Link to="/"><h1 className="topbar__logo">MovieMatch</h1></Link>
            <Navigation />
            <Dropdown />
        </div>
    );
}

export default Topbar;