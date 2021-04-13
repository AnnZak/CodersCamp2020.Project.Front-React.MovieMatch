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
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-star"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
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