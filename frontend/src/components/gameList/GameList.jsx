import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import styles from './GameList.module.scss'
import CardSkeleton from '../cardSkeleton';

function Games() {
    const [gamesList, setGamesList] = useState([])
    const [gamesReq, setGamesReq] = useState({})
    const [page, setPage] = useState(1)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        if (gamesList.length == 0) {
            window.scrollTo(0, 0);
        }

        const fetchData = async () => {
            setIsLoading(true)
            try {
                const response = await fetch(`http://localhost:3000/games?page=${page}`);
                const result = await response.json()
                setGamesList(prevGamesList => [...prevGamesList, ...result.results])

                console.log(result)
            } catch (error) {
                console.error("Error fetching JSON:", error);
            } finally {
                setTimeout(() => {
                    setIsLoading(false)
                }, 500);
            }
        }
        fetchData();

        console.log(page)
    }, [page]);


    useEffect(() => {

        function loadNewPage() {
            if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 1) {
                setPage(previous => previous + 1);
            }
        }

        window.addEventListener('scroll', loadNewPage);

        return () => {
            window.removeEventListener('scroll', loadNewPage);
        };

    }, [])

    return (
        <>
            {isLoading ? <CardSkeleton cards={8} /> : ''}
            
            <div className={styles['game-list']}>
                {gamesList.map((game) => (
                    <div key={game.id} className={styles['game-container']}>
                        <img className={styles['bg-img']} src={game.background_image} alt="" />
                        <div className={styles['game-image-container']}>
                            <img className={styles['cover-img']} src={game.background_image} alt="" />
                        </div>
                        <div className={styles['game-infos-container']}>
                            <Link to={`/games/${game.slug}`} className={styles['game-title']}>{game.name}</Link>
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
            {isLoading ? <div className={styles['loader-5']}></div> : ''}
        </>
    )
}

export default Games;