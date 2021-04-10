import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
// import { searchMovie } from '../../features/Movie/MovieSlice';
import { useAppSelector, useAppDispatch } from '../../../../app/hooks';
import './navigation.scss';

const Navigation = () => {
    const [visible, setVisible] = useState(false);
    const [searchValue, setSearchValue] = useState("");
    const [submitValue, setSubmitValue] = useState("");

    const dispatch = useAppDispatch();
    const history = useHistory();

    const handleVisibility = () => {
        setVisible(prev => !prev);
    };

    function handleEnterPress(e: React.KeyboardEvent<HTMLInputElement>) {
        if (e.key === "Enter") {
            setSubmitValue(searchValue);
            // setSearchValue("");
            // dispatch(searchMovie(submitValue));
            history.push('/search-movies'); // TODO
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