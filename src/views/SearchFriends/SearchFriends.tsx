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
    const {allFriends} = useAppSelector(friendsSelector);


    const [searchVal, setSearchVal] = useState<string>();
    const [dispUsers, setDispUsers] = useState<Friend[]>([]);


    useEffect(() => {
        dispatch(getAll())
    }, [])

    const handleEnterPress = async (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && searchVal && searchVal !== "") {
            history.push(`/search-friends?dispName=${searchVal}`);
            try {
                const response = await searchUsers(searchVal);
                if(response.status === 200) {
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
                    className="navbar__search-input"
                    placeholder="Search friends..."
                    type="text"
                    value={searchVal}
                    onChange={(e) => { setSearchVal(e.target.value) }}
                    onKeyDown={(e) => { handleEnterPress(e) }}
                />
                <div className="friend-cards-container">

                    {dispUsers.map((user) =>
                        <div className="friend-card">
                            <img className="avatar" src={avatardefault} alt="friend's profile picture" />
                            <p className="friend-name">{user.name}</p>
                            <p className="friend-name">{user.displayedName}</p>
                        </div>
                    )}

                    {allFriends.map((friend) =>
                        <Link to={`/collection/${friend._id}`}>
                            <div className="friend-card">
                                <img className="avatar" src={avatardefault} alt="friend's profile picture" />
                                <p className="friend-name">{friend.name}</p>
                                <p className="friend-name">{friend.displayedName}</p>
                            </div>
                        </Link>

                    )}
                </div>
            </div>
        </div>
    );
}

export default SearchFriends;