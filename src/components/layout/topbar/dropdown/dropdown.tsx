import React, { useState } from 'react';
import './dropdown.scss';
import avatardefault from '../../../../assets/images/avatardefault.png';
import { Link, useHistory } from 'react-router-dom';
import { useAppDispatch } from '../../../../app/hooks';
import { logout } from '../../../../features/User';

const Dropdown = () => {

    const [visible, setVisible] = useState(false);
    const dispatch = useAppDispatch();
    const history = useHistory();

    const handleLogOut = () => {
        dispatch(logout());
        history.push("/");
    }

    const handleVisibility = () => {
        setVisible(prev => !prev);
    };

    return (
        <div className="topbar__dropdown">
            <ul>
                <li>
                    <a className="topbar__avatar-link" href="#" onClick={handleVisibility}><img className="topbar__avatar-img" src={avatardefault} /></a>
                    <ul className={visible ? "topbar__dropdown-menu visible" : "topbar__dropdown-menu invisible"}>
                        <li className="topbar__dropdown-menu__item"><Link to="/settings">Settings</Link></li>
                        <li className="topbar__dropdown-menu__item"><button onClick={handleLogOut}>Log Out</button></li>
                    </ul>
                </li>
            </ul>
        </div>
    );
}

export default Dropdown;