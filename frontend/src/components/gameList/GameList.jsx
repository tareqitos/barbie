import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import styles from './GameList.module.scss';
import CardSkeleton from '../cardSkeleton';

const GameList = ({ gamesList, setPage, isLoading, error, hasMore }) => {
    const bottomRef = useRef(null);
    const [requirements, setRequirements] = useState({});

    useEffect(() => {
        if (isLoading || !hasMore) return;

        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                setPage(prevPage => prevPage + 1);
            }
        }, {
            root: null,
            rootMargin: '0px',
            threshold: 1.0
        });

        if (bottomRef.current) {
            observer.observe(bottomRef.current);
        }

        return () => {
            if (bottomRef.current) {
                observer.unobserve(bottomRef.current);
            }
        };
    }, [isLoading, hasMore]);

    useEffect(() => {
        const fetchRequirements = async (gameSlug) => {
            try {
                const response = await fetch(`http://localhost:3000/games/${gameSlug}`);
                const result = await response.json();
                setRequirements(prevReq => ({
                    ...prevReq,
                    [gameSlug]: result.requirements.min
                }));
            } catch (error) {
                console.error("Error fetching JSON:", error);
            }
        };

        gamesList.forEach(game => {
            if (!requirements[game.slug]) {
                fetchRequirements(game.slug);
            }
        });
    }, [gamesList]);

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
                                <div>{new Date(game.released).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</div>
                                {requirements[game.slug] &&
                                    <div className={styles['game-requirements']}>
                                        <p>CPU</p>
                                        <p>{requirements[game.slug].cpu ? requirements[game.slug].cpu.replace('Memory', '').replace('RAM', '') : 'N/A'}</p>
                                        <hr />
                                        <p>GPU</p>
                                        <p>{requirements[game.slug].gpu ? requirements[game.slug].gpu.replace('DirectX', '').replace('Storage', '') : 'N/A'}</p>
                                        <hr />
                                        <p>RAM</p>
                                        <p>{requirements[game.slug].ram ? requirements[game.slug].ram : 'N/A'}</p>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {isLoading ? <div className={styles['loader-5']}></div> : ''}
            <div ref={bottomRef}></div>
            {!hasMore ? <div className={styles['no-game-found']}>
                <i className="fa-solid fa-ghost"></i>
                <p>No more games found</p>
            </div> : ''}
        </>
    );
};

export default GameList;