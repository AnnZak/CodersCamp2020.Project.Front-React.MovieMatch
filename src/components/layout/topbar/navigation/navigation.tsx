import React, { useState } from 'react';
import './navigation.scss';

const Navigation = () => {
    const [visible, setVisible] = useState(false);

    const handleVisibility = () => {
        setVisible(prev => !prev);
    };

    return (
        <div className="topbar-navigation">
            <ul>
                <li>
                    <a href="#"><i className="fas fa-users"></i></a>
                </li>
                <li>
                    <a href="#"><i className="fas fa-heart"></i></a>
                </li>
                <li>
                    <a href="#"><i className="fas fa-border-all"></i></a>
                </li>
                <li className="search">
                    <a href="#"><i className="fas fa-search" onClick={handleVisibility}></i></a>
                    <input className={visible ? "search-input visible" : "invisible"} placeholder="Search..." type="text" />
                </li>
            </ul>
        </div>
    );
}

export default Navigation;