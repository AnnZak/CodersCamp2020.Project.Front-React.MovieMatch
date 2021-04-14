import React from 'react';
import { Link } from 'react-router-dom';
import './topLogo.scss';

const TopLogo = () => {
    return (
        <div className="logoNav">
            <Link to="/"><h1 className="logo">MovieMatch</h1></Link>
        </div>
    );
}

export default TopLogo;