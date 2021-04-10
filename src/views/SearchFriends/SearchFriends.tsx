import './SearchFriends.scss'
import Topbar from '../../components/layout/topbar/topbar';
import avatardefault from '../../assets/images/avatardefault.png';

const friends = {
    nextPage: 2,
    previousPage: 0,
    results: [
        { name: "Benny", displayedName: "BennyLava" },
        { name: "Benny", displayedName: "BennyLava" },
        { name: "Benny", displayedName: "BennyLava" },
        { name: "Benny", displayedName: "BennyLava" },
        { name: "Benny", displayedName: "BennyLava" },
        { name: "Benny", displayedName: "BennyLava" },
        { name: "Benny", displayedName: "BennyLava" },
        { name: "Benny", displayedName: "BennyLava" },
        { name: "Benny", displayedName: "BennyLava" },
        { name: "Benny", displayedName: "BennyLava" },
        { name: "Benny", displayedName: "BennyLava" },
        { name: "Benny", displayedName: "BennyLava" },
        { name: "Benny", displayedName: "BennyLava" },
        { name: "Benny", displayedName: "BennyLava" },
        { name: "Benny", displayedName: "BennyLava" },
    ]
}

function SearchFriends() {

    return (
        <div>
            <Topbar />
            <div className="container-search-friends">
                <div className="friend-cards-container">

                    {friends.results.map((friend) =>
                        <div className="friend-card">
                            <img className="avatar" src={avatardefault} alt="friend's profile picture" />
                            <p className="friend-name">{friend.name}</p>
                            <p className="friend-name">{friend.displayedName}</p>
                        </div>

                    )}
                </div>
            </div>
        </div>
    );
}

export default SearchFriends;