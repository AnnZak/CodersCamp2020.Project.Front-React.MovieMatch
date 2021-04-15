import './SearchFriends.scss'
import Topbar from '../../components/layout/topbar/topbar';
import avatardefault from '../../assets/images/avatardefault.png';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { friendsSelector, getAll, Friend, invite, getInvitations, accept, decline } from '../../features/Friends/FriendSlice';
import { Link, useHistory } from 'react-router-dom';
import { searchUsers } from '../../features/User/api';
import Form from '../../components/layout/form/form';

function SearchFriends() {

    const history = useHistory();
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
                <div className="friend-card-main"> 
                    <h1>Search new MovieMatch friends!</h1>
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
                                    <img className="avatar" src={avatardefault} alt="friend's profile picture" />
                                    <p className="friend-name">{friend.name}</p>
                                    <p className="friend-name">{friend.displayedName}</p>
                                </div>
                            </Link>
                        )}
                    </div>
                    
                    <div className="friend-cards-container">
                        
                        {dispUsers.map((user) =>{

                            let friendsStatus;

                            if (allFriends.map(friend => friend._id).includes(user._id)) { //you are already friends
                                friendsStatus = (<h3>You Are Friends with this person</h3>);
                            } else if (invitations.sent.map(invite => invite.receiver._id).includes(user._id)) { //you already invited this person
                                friendsStatus = <h3>You have already invited this person</h3>
                            } else if (invitations.received.map(invite => invite.sender._id).includes(user._id)) { //User already invited you
                                friendsStatus = <h3>Check your invitations, this person sent you one</h3>
                            } else {    //you are not yet friends nor are you two invited
                                friendsStatus = <button onClick={() => {dispatch(invite(user._id))}}>Invite to Friends</button>
                            }

                            return (
                            <div className="friend-card">
                                {/* <img className="avatar" src={avatardefault} alt="friend's profile picture" />
                                <p className="friend-name">{user.name}</p>
                                <p className="friend-name">{user.displayedName}</p> */}
                                    <img className="avatar" src={avatardefault} alt="friend's profile picture" />
                                    <p className="friend-name">{user.name}</p>
                                    <p className="friend-name">{user.displayedName}</p>
                                {friendsStatus}
                            </div>
                            )}
                            
                        )}
                    </div>
                </div>
                <div className="friend-cards-right">
                    <div className="friend-cards-right-pending">
                        <h1>Pending invitations:</h1>
                        <div className="friend-cards-container">
                            {invitations.received.map((invitation) =>{

                                const user = invitation.sender;
                                return (
                                <div className="friend-card">
                                        <img className="avatar" src={avatardefault} alt="friend's profile picture" />
                                        <p className="friend-name">{user.name}</p>
                                        <p className="friend-name">{user.displayedName}</p>
                                        <div className="friend-cardbutton">
                                            <button onClick={() => {dispatch(accept(user._id))}}>Accept</button>
                                            <button onClick={() => {dispatch(decline(user._id))}}>Decline</button>
                                        </div>
                                    </div>
                                
                                )}
                                
                            )}
                        </div>
                    </div> 
                    <div className="friend-cards-right-sent">
                        <h1>Sent invitations:</h1>
                        <div className="friend-cards-container">
                            {invitations.sent.map((invitation) =>{
                                const user = invitation.receiver;
                                return (
                                <div className="friend-card">
                                        <img className="avatar" src={avatardefault} alt="friend's profile picture" />
                                        <p className="friend-name">{user.name}</p>
                                        <p className="friend-name">{user.displayedName}</p>
                                    </div>
                                )}
                                
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SearchFriends;