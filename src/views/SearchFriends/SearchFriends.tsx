import './SearchFriends.scss'
import Topbar from '../../components/layout/topbar/topbar';
import avatardefault from '../../assets/images/avatardefault.png';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { friendsSelector, getAll } from '../../features/Friends/FriendSlice';
import { Link } from 'react-router-dom';

function SearchFriends() {

    const dispatch = useAppDispatch();
    const {allFriends} = useAppSelector(friendsSelector);

    useEffect(() => {
        dispatch(getAll())
    }, [])

    return (
        <div>
            <Topbar />
            <div className="container-search-friends">
                <div className="friend-cards-container">

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