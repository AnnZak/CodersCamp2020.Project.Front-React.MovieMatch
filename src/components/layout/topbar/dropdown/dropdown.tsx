import React from 'react';
import './dropdown.scss';
import avatardefault from '../../../../assets/images/avatardefault.png';

const Dropdown = () => {
    return (
        <div className="topbar-dropdown">
            <ul>
                <li>
                    <a className="avatar-a" href="#"><img className="avatar" src={avatardefault} /></a>
                    <ul>
                        <li><a href="#">Night Mode</a></li>
                        <li><a href="#">Settings</a></li>
                        <li><a href="#">Log Out</a></li>
                    </ul>
                </li>
            </ul>
        </div>
    );
}

export default Dropdown;