import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import './navigation.scss';
import { userSelector } from '../../../../features/User/UserSlice';
import { useAppSelector } from '../../../../app/hooks';

const Navigation = () => {
    const [searchValue, setSearchValue] = useState("");

    const history = useHistory();
    const { _id } = useAppSelector(userSelector);

    function handleEnterPress(e: React.KeyboardEvent<HTMLInputElement>) {
        if (e.key === "Enter" && searchValue !== "") {
            history.push(`/movies?title=${searchValue}`);
        }
    }

    return (
        <div className="topbar__navigation">
            <ul>
                <li>
                    <Link to="/dashboard"><i className="fas fa-border-all"></i></Link>
                </li>
                <li>
                    <Link to={`/collection/${_id}`}><i className="fas fa-heart"></i></Link>
                </li>
                <li>
                    <Link to="/search-friends"><i className="fas fa-users"></i></Link>
                </li>
                <li className="navbar__search-icon">
                    <i className="fas fa-search"></i>
                </li>
                <li className="navbar__search-bar">
                    <input
                        className="navbar__search-input"
                        placeholder="Search movie..."
                        type="text"
                        value={searchValue}
                        onChange={(e) => { setSearchValue(e.target.value) }}
                        onKeyDown={(e) => { handleEnterPress(e) }}
                    />
                </li>
            </ul>
        </div>
    );
}

export default Navigation;
