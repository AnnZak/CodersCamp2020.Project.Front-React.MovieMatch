import './SearchFriends.scss'
import Topbar from '../../components/layout/topbar/topbar';
import avatardefault from '../../assets/images/avatardefault.png';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { friendsSelector, getAll, Friend } from '../../features/Friends/FriendSlice';
import { Link, useHistory } from 'react-router-dom';
import { searchUsers } from '../../features/User/api';

function SearchFriends() {

    const history = useHistory();
    const dispatch = useAppDispatch();
    const { allFriends } = useAppSelector(friendsSelector);


    const [searchVal, setSearchVal] = useState<string>();
    const [dispUsers, setDispUsers] = useState<Friend[]>([]);


    useEffect(() => {
        dispatch(getAll())
    }, [searchVal])

    const handleEnterPress = async (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && searchVal && searchVal !== "") {
            history.push(`/search-friends?dispName=${searchVal}`);
            try {
                const response = await searchUsers(searchVal);
                if (response.status === 200) {
                    setDispUsers(response.data.users);
                } else {
                    setDispUsers([]);
                }
            } catch (error) {
                setDispUsers([])
            }
        }
    }

    return (
        <div>
            <Topbar />
            <div className="container-search-friends">
                <input
                    className="user-search__search-input"
                    placeholder="Search friends..."
                    type="text"
                    value={searchVal}
                    onChange={(e) => { setSearchVal(e.target.value) }}
                    onKeyDown={(e) => { handleEnterPress(e) }}
                />
                <div className="friend-cards-container">
                    {allFriends.map((friend) =>
                        <Link to={`/collection/${friend._id}`}>
                            <div className="friend-card">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-star"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                                <img className="avatar" src={avatardefault} alt="friend's profile picture" />
                                <p className="friend-name">{friend.name}</p>
                                <p className="friend-name">{friend.displayedName}</p>
                            </div>
                        </Link>
                    )}
                </div>
                <h1>Search new MovieMatch friends!</h1>
                <div className="friend-cards-container">
                    {dispUsers.map((user) =>
                        <div className="friend-card">
                            <img className="avatar" src={avatardefault} alt="friend's profile picture" />
                            <p className="friend-name">{user.name}</p>
                            <p className="friend-name">{user.displayedName}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default SearchFriends;