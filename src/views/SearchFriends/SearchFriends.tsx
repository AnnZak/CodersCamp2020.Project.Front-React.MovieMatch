import './SearchFriends.scss'
import Topbar from '../../components/layout/topbar/topbar';
import avatardefault from '../../assets/images/avatardefault.png';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { friendsSelector, getAll, Friend, invite, getInvitations, accept, decline } from '../../features/Friends/FriendSlice';
import { Link } from 'react-router-dom';
import { searchUsers } from '../../features/User/api';

function SearchFriends() {

    const dispatch = useAppDispatch();
    const { allFriends, invitations } = useAppSelector(friendsSelector);

    const [searchVal, setSearchVal] = useState<string>();
    const [dispUsers, setDispUsers] = useState<Friend[]>([]);

    useEffect(() => {
        dispatch(getAll());
        dispatch(getInvitations());
    }, [])

    const handleEnterPress = async (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && searchVal && searchVal !== "") {
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
                        <Link to={`/collection/${friend._id}`} key={`friendcard${friend._id}`}>
                            <div className="friend-card" >
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-star"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                                <img className="avatar" src={avatardefault} alt="friend's profile avatar" />
                                <p className="friend-name">{friend.name}</p>
                                <p className="friend-name">{friend.displayedName}</p>
                            </div>
                        </Link>
                    )}
                </div>
                <h1>Search new MovieMatch friends!</h1>
                <div className="friend-cards-container">
                    {dispUsers.map((user) => {

                        let friendsStatus;

                        if (allFriends.map(friend => friend._id).includes(user._id)) { //you are already friends
                            friendsStatus = (<h3>You Are Friends with this person</h3>);
                        } else if (invitations.sent.map(invite => invite.receiver._id).includes(user._id)) { //you already invited this person
                            friendsStatus = <h3>You have already invited this person</h3>
                        } else if (invitations.received.map(invite => invite.sender._id).includes(user._id)) { //User already invited you
                            friendsStatus = <h3>Check your invitations, this person sent you one</h3>
                        } else {    //you are not yet friends nor are you two invited
                            friendsStatus = <button onClick={() => { dispatch(invite(user._id)) }}>Invite to Friends</button>
                        }

                        return (
                            <div className="friend-card" >
                                {/* <img className="avatar" src={avatardefault} alt="friend's profile avatar" />
                            <p className="friend-name">{user.name}</p>
                            <p className="friend-name">{user.displayedName}</p> */}
                                <div className="friend-card">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-star"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                                    <img className="avatar" src={avatardefault} alt="friend's profile avatar" />
                                    <p className="friend-name">{user.name}</p>
                                    <p className="friend-name">{user.displayedName}</p>
                                </div>
                                {friendsStatus}
                            </div>
                        )
                    })}
                </div>
                <h1>Pending invitations:</h1>
                <div className="friend-cards-container">
                    {invitations.received.map((invitation) => {

                        const user = invitation.sender;
                        return (
                            <div className="friend-card" key={`invpending${user._id}`}>
                                <div className="friend-card">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-star"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                                    <img className="avatar" src={avatardefault} alt="friend's profile avatar" />
                                    <p className="friend-name">{user.name}</p>
                                    <p className="friend-name">{user.displayedName}</p>
                                    <button onClick={() => { dispatch(accept(user._id)) }}>Accept</button>
                                    <button onClick={() => { dispatch(decline(user._id)) }}>Decline</button>
                                </div>
                            </div>
                        )
                    }

                    )}
                </div>
                <h1>Sent invitations:</h1>
                <div className="friend-cards-container">
                    {invitations.sent.map((invitation) => {

                        const user = invitation.receiver;
                        return (
                            <div className="friend-card" key={`invsent${user._id}`}>
                                <div className="friend-card">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-star"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                                    <img className="avatar" src={avatardefault} alt="friend's profile avatar" />
                                    <p className="friend-name">{user.name}</p>
                                    <p className="friend-name">{user.displayedName}</p>
                                </div>
                            </div>
                        )
                    }

                    )}
                </div>
            </div>
        </div>
    );
}

export default SearchFriends;