import { useState, useEffect } from 'react'
import styles from './Games.module.scss'


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
        return <div>Loading...</div>
    }

    return (
        <>
            <div className={styles['game-list']}>
                {gamesList.map((game) => (
                    <div key={game.id} className={styles['game-container']}>
                        <div className={styles['game-container']}>
                            <img className={styles['bg-img']} src={game.background_image} alt="" />
                            <div className={styles['game-image-container']}>
                                <img className={styles['cover-img']} src={game.background_image} alt="" />
                            </div>
                            <div className={styles['game-infos-container']}>
                                <div className={styles['game-infos']}>
                                    <h2 className={styles['game-title']}>{game.name}</h2>
                                    {game.genres.slice(0, 3).map((genre) => (
                                        <p className={styles['game-genres']} key={genre.id}>{genre.name}</p>
                                    ))}
                                </div>
                                <div className={styles['game-requirements']}>
                                   
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