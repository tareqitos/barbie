import { useState, useEffect, use } from 'react'
import styles from './Games.module.scss'

function Games() {
    const [gamesList, setGamesList] = useState([])
    const [nextPage, setNextPage] = useState('')
    const [isLoading, setIsLoading] = useState(true)

    const API_KEY = 'e80d9fdbcf3947059727685ad06c5f1e'

    useEffect(() => {
        const fetchData = async () => {
            try {
                let response = await fetch(`https://api.rawg.io/api/games?key=${API_KEY}&dates=2020-01-01,2025-01-01`)
                const result = await response.json()

                setNextPage(result.next)
                setGamesList(result.results)
                setIsLoading(false)


            } catch (error) {
                console.error('Error fetching JSON:', error);
                setIsLoading(false)
            }
        };

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
                                    <h2>{game.name}</h2>
                                    {game.genres.map((genre) => (
                                        <p key={genre.id}>{genre.name}</p>
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