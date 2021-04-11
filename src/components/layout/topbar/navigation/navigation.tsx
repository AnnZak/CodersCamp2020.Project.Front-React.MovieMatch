import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { searchMovies } from '../../../../features/Movie/MovieSlice';
import { useAppDispatch } from '../../../../app/hooks';
import './navigation.scss';

const Navigation = () => {
    const [visible, setVisible] = useState(false);
    const [searchValue, setSearchValue] = useState("");

    const dispatch = useAppDispatch();
    const history = useHistory();

    const handleVisibility = () => {
        setVisible(prev => !prev);
    };

    function handleEnterPress(e: React.KeyboardEvent<HTMLInputElement>) {
        if (e.key === "Enter") {
            history.push(`/movies?title=${searchValue}`);
            dispatch(searchMovies(searchValue));
        }
    }

    return (
        <div className="topbar-navigation">
            <ul>
                <li>
                    <Link to="dashboard"><i className="fas fa-border-all"></i></Link>
                </li>
                <li>
                    <Link to="register"><i className="fas fa-heart"></i></Link>
                </li>
                <li>
                    <Link to="register"><i className="fas fa-users"></i></Link>
                </li>
                <li>
                    <a><i className="fas fa-search" onClick={handleVisibility}></i></a>
                </li>
                <li className="search-bar">
                    <input
                        className={visible ? "search-input visible" : "search-input invisible"}
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