import React from 'react';
import './dropdown.scss';
import avatardefault from '../../../../assets/images/avatardefault.png';
import { Link, useHistory } from 'react-router-dom';
import { useAppDispatch } from '../../../../app/hooks';
import { logout } from '../../../../features/User/UserSlice';

const Dropdown = () => {

    const dispatch = useAppDispatch();
    const history = useHistory();

    const handleLogOut = ()=> {
        dispatch(logout());
        history.push("/");
    }

    return (
        <div className="topbar-dropdown">
            <ul>
                <li>
                    <a className="avatar-a" href="#"><img className="avatar" src={avatardefault} /></a>
                    <ul>
                        <li><Link to="/settings">Settings</Link></li>
                        <li><button onClick={handleLogOut}>Log Out</button></li>
                    </ul>
                </li>
            </ul>
        </div>
    );
}

export default Dropdown;