
import './App.css'
import {useEffect, useState} from "react";

function App() {

    const [scores, setScores] = useState(null)

    useEffect(() => {
        fetch('data/data.json')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log('JSON data:', data);
                setScores(data)
            })
            .catch(error => {
                console.error('Fetch error:', error);
            });
    }, []);


    if(!scores) {
        return (
            <div>Loading Data</div>
        )
    }

    const calculatePoints = (player, weights) => {
        return (
            (player.first * weights.first) +
            (player.second * weights.second) +
            (player.third * weights.third) +
            (player.style * weights.style)
        );
    };

    const calculateGames = (player) => {
        return player.first + player.second + player.third;
    };

    const sortedPlayers = [...scores.players].sort((a, b) => {
        const pointsA = calculatePoints(a, scores);
        const pointsB = calculatePoints(b, scores);

        if (pointsB !== pointsA) return pointsB - pointsA;       // Sort by score
        if (b.first !== a.first) return b.first - a.first;       // Then by firsts
        if (b.second !== a.second) return b.second - a.second;   // Then by seconds
        return b.third - a.third;                                // Then by thirds
    });


    return (
        <div className={`flex flex-col items-center`}>
            <div className={`text-3xl font-bold my-10`}>Magic The Gathering League</div>
            <div className="overflow-x-auto w-full">
                <table className="table text-center w-full">
                    <thead>
                    <tr>
                        <th>Player</th>
                        <th>Win</th>
                        <th>Second</th>
                        <th>Third</th>
                        <th>Style</th>
                        <th>Points</th>
                        <th>Games</th>
                    </tr>
                    </thead>
                    <tbody>
                    {sortedPlayers.map((player, idx) => (
                        <tr key={idx} className={player.starts ? 'text-success/90' : ''}>
                            <td>{player.name}</td>
                            <td>{player.first}</td>
                            <td>{player.second}</td>
                            <td>{player.third}</td>
                            <td>{player.style}</td>
                            <td>{calculatePoints(player, scores)}</td>
                            <td>{calculateGames(player)}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
            <div className={`mt-10 text-2xl font-bold`}>Rules</div>
            <div className={`text-center mt-2`}>
                <p className={`mb-2`}>The first player to reach or exceed {scores.win_points} is the league champion.</p>
                <p>
                    In the case of a tie the player with more style points is the winner.
                    If it is still a tie then the player with the most second places is the winner,
                    if it is still a tie at this point the player with the most third places is the winner.
                </p>

                <div className={`text-center mt-8 mb-4 text-2xl font-bold`} >Points Breakdown</div>

                <table className="table text-center w-full">
                    <thead>
                    <tr>
                        <th>First Place</th>
                        <th>Second Place</th>
                        <th>Third Place</th>
                        <th>Style Point</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>{scores.first}</td>
                        <td>{scores.second}</td>
                        <td>{scores.third}</td>
                        <td>{scores.style}</td>
                    </tr>
                    </tbody>
                </table>

            </div>
        </div>
    );
}

export default App
