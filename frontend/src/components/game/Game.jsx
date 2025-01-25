import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import styles from './Game.module.scss'
import parse from 'html-react-parser';

function Game() {
    const [game, setGame] = useState([])
    const [req, setReq] = useState({ minimum: '', recommended: '' });
    const [showDesc, setShowDesc] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const game = window.location.pathname;
                console.log(game)

                const response = await fetch(`http://localhost:3000${game}`);
                const result = await response.json()
                setGame(result)

                result.platforms.forEach((element) => {
                    if (element.platform.id == 4 && element.requirements) {
                        setReq(element.requirements);
                    }
                });

                console.log(result)
            } catch (error) {
                console.error("Error fetching JSON:", error);
            }
        }
        fetchData();
    }, []);

    function showDescription(event) {
        event.preventDefault();
        setShowDesc(!showDesc);
    }

    return (
        <>
            <div className={styles["main-container"]}>
                <div className={styles['bg-fade']}></div>
                <img className={styles['bg-img']} src={game.background_image_additional} alt="" />
                <div className={styles["game-container"]}>
                    <div className={styles["container-title"]}>
                        {game.name}
                    </div>
                    <div className={styles["game-card-container"]}>
                        <div className={styles["game-picture-container"]}>
                            <img src={game.background_image} alt="" />
                        </div>
                        <img className={styles['game-card-bg']} src={game.background_image} alt="" />

                        <div className={styles["game-infos-container"]}>
                            <div className={styles['game-genres']}>
                                {game.genres ? game.genres.slice(0, 3).map((genre) => (
                                    <p key={genre.id}>{genre.name}</p>
                                )) : null}
                            </div>

                            <div className={styles["game-infos"]}>
                                <div className={styles["info"]}>
                                    <p className={styles["info-title"]}>Release date</p>
                                    <p>{game.released}</p>
                                </div>
                                <div className={styles["info"]}>
                                    <p className={styles["info-title"]}>Developer</p>
                                    {game.developers ? game.developers.map((dev, i) => (
                                        <p key={i}>{dev.name}</p>
                                    )) : null}
                                </div>
                            </div>

                            <p className={styles["info-title"]}>About</p>
                            <div className={styles["game-description"]}>
                                <div className={`${styles["game-description-text"]}  ${showDesc ? styles["visible"] : ""}`}>
                                    <div className={`${styles["game-description-html"]}`}>{parse(`${game.description}`)}</div>
                                </div>
                                {showDesc ? null : <span></span>}
                                <button onClick={showDescription} > {showDesc ? 'Show less' : 'Show more'} </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={styles["game-requirements-container"]}>
                    <div className={styles["container-title"]}>
                        Requirements
                    </div>
                    <div className={styles["requirement-container"]}>
                        <div className={styles["title"]}>Minimum</div>
                        <div className={styles["specs-container"]}>
                            <div>{req.minimum ? parse(`${req.minimum}`) : 'No minimum requirements available'}</div>
                        </div>
                    </div>
                    <div className={styles["requirement-container"]}>
                        <div className={styles["title"]}>Recommended</div>
                        <div className={styles["specs-container"]}>
                            <div>{req.recommended ? parse(`${req.recommended}`) : 'No recommended requirements available'}</div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

export default Game;