import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom';
import styles from './GameList.module.scss'
import CardSkeleton from '../cardSkeleton';

function Games({ date, setDate, gamesList, isLoading, setPage, error }) {
    const bottom_ref = useRef(null);

    useEffect(() => {

        if (!error) {

            const observer = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting && !isLoading) {
                    setPage(previous => previous + 1);
                }
            }, {
                root: null,
                rootMargin: '0px',
                threshold: 1.0
            });

            if (bottom_ref.current) {
                observer.observe(bottom_ref.current)
            }

            return () => {
                if (bottom_ref.current) {
                    observer.unobserve(bottom_ref.current);
                }
            };
        }

    }, [isLoading])

    if (error) {
        return (
            <div className={styles['no-game-found']}>
                <i className="fa-solid fa-ghost"></i>
                <p>No games found</p>
            </div>
        )
    }


    return (
        <>
            {isLoading ? <CardSkeleton cards={12} /> : ''}

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
                                <div>{game.released}</div>
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
            <div ref={bottom_ref}></div>
        </>
    )
}

export default Games;