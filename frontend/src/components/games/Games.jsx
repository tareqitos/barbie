import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import styles from './Games.module.scss'
import CardSkeleton from '../cardSkeleton';




function Games() {
    const [gamesList, setGamesList] = useState([])
    const [gamesReq, setGamesReq] = useState({})
    const [nextPage, setNextPage] = useState('')
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:3000/games');
                const result = await response.json()
                setGamesList(result.results)
                setIsLoading(false);
                console.log(result)
            } catch (error) {
                console.error("Error fetching JSON:", error);
                setIsLoading(false);
            }
        }
        fetchData();
    }, []);

    if (isLoading) {
        return <CardSkeleton cards={12}/>
    }

    return (
        <>
            <div className={styles['game-list']}>
                {gamesList.map((game) => (
                    <div key={game.id} className={styles['game-container']}>
                        <img className={styles['bg-img']} src={game.background_image} alt="" />
                        <div className={styles['game-image-container']}>
                            <img className={styles['cover-img']} src={game.background_image} alt="" />
                        </div>
                        <div className={styles['game-infos-container']}>
                            <Link to={`/games/${game.name}`} className={styles['game-title']}>{game.name}</Link>
                            <div className={styles['game-infos']}>
                                <div className={styles['game-genres']}>
                                    {game.genres.slice(0, 3).map((genre) => (
                                        <p key={genre.id}>{genre.name}</p>
                                    ))}
                                </div>
                                <div className={styles['game-requirements']}>
                                    <p>CPU</p>
                                    <hr />
                                    <p>GPU</p>
                                    <hr />
                                    <p>RAM</p>
                                </div>
                            </div>

                        </div>


                    </div>
                ))}

            </div>
        </>
    )
}

export default Games;