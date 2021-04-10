import './SearchMovies.scss'
import Topbar from '../../components/layout/topbar/topbar';

const friends = {
    nextPage: 2,
    previousPage: 0,
    results: [
        { name: "Benny", displayedName: "BennyLava" },
        { name: "Benny", displayedName: "BennyLava" },
        { name: "Benny", displayedName: "BennyLava" },
    ]
}

function SearchFriends() {

    return (
        <div>
            <Topbar />
            <h1>searched movies list</h1>
        </div>
    );
}

export default SearchFriends;