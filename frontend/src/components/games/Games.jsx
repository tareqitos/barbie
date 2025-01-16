import { useState, useEffect, use } from 'react'
import styles from './Games.module.scss'
import { getGameApi } from '../../utils/fetch-api'


function Games() {
    const [gamesList, setGamesList] = useState([])
    const [gamesReq, setGamesReq] = useState({})
    const [nextPage, setNextPage] = useState('')
    const [isLoading, setIsLoading] = useState(true)



    useEffect(() => {
        const fetchData = async () => {
            try {
                const games_result = await getGameApi();
                setNextPage(games_result.next);
                setGamesList(games_result.results);
                setIsLoading(false);



                console.log(games_result)
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
                                    <p>{game.minimum ? game.minimum['Processor'] : 'No minimum requirements available'}</p>
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