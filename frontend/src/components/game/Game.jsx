import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { GameSkeleton } from '../cardSkeleton/CardSkel';
import styles from './Game.module.scss'
import parse from 'html-react-parser';

function Game() {
    const [game, setGame] = useState([])
    const [minReq, setMinReq] = useState();
    const [recoReq, setRecoReq] = useState();
    const [showDesc, setShowDesc] = useState(false)
    const [isLoading, setIsLoading] = useState(true)

    let navigate = useNavigate();

    useEffect(() => {

        window.scrollTo(0, 0);


        const fetchData = async () => {
            setIsLoading(true)
            try {
                const game = window.location.pathname;
                console.log(game)

                const response = await fetch(`http://localhost:3000${game}`);
                const result = await response.json()
                setGame(result)
                setMinReq(result.requirements.min)
                setRecoReq(result.requirements.reco)

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
    }, []);

    function showDescription(event) {
        event.preventDefault();
        setShowDesc(!showDesc);
    }

    return (
        <>
            {isLoading ? <GameSkeleton /> :
                <>
                <button onClick={() => navigate(-1)} className={styles['back-to-list-button']}><i className='fa-solid fa-arrow-left'></i></button>
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
                                        <p>{game.released ? new Date(game.released).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'N/A'}</p>
                                    </div>
                                    <div className={styles["info"]}>
                                        <p className={styles["info-title"]}>Developer</p>
                                        {game.developers ? game.developers.map((dev, i) => (
                                            <p key={i}>{dev.name}</p>
                                        )) : 'N/A'}
                                    </div>
                                </div>

                                <p className={styles["info-title"]}>About</p>
                                <div className={styles["game-description"]}>
                                    <div className={`${styles["game-description-text"]}  ${showDesc ? styles["visible"] : ""}`}>
                                        <div className={`${styles["game-description-html"]}`}>{game.description ? parse(`${game.description}`) : 'No description available'}</div>
                                    </div>
                                    {game.description ? <button onClick={showDescription} > {showDesc ? 'Show less' : 'Show more'} </button> : null}
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
                                {!minReq ? (<p>No infos available</p>) : (
                                    <>
                                        <div className={styles["req-container"]}>
                                            <p>OS:</p>
                                            <p>{minReq.os ? minReq.os.replace('Processor', '').replace('CPU', '') : 'Not available'}</p>
                                        </div>
                                        <hr />
                                        <div className={styles["req-container"]}>
                                            <p>Processor:</p>
                                            <p>{minReq.cpu ? minReq.cpu.replace('Memory', '').replace('RAM', '') : 'Not available'}</p>
                                        </div>
                                        <hr />
                                        <div className={styles["req-container"]}>
                                            <p>Graphics:</p>
                                            <p>{minReq.gpu ? minReq.gpu : 'Not available'}</p>
                                        </div>
                                        <hr />
                                        <div className={styles["req-container"]}>
                                            <p>Memory:</p>
                                            <p>{minReq.ram ? minReq.ram : 'Not available'}</p>
                                        </div>
                                        <hr />
                                        <div className={styles["req-container"]}>
                                            <p>Storage:</p>
                                            <p>{minReq.storage ? minReq.storage : 'Not available'}</p>
                                        </div>
                                    </>)}
                            </div>
                        </div>
                        <div className={styles["requirement-container"]}>
                            <div className={styles["title"]}>Recommended</div>
                            <div className={styles["specs-container"]}>
                                {!recoReq ? (<p>No infos available</p>) : (
                                    <>
                                        <div className={styles["req-container"]}>
                                            <p>OS:</p>
                                            <p>{recoReq.os ? recoReq.os.replace('Processor', '').replace('CPU', '') : 'Not available'}</p>
                                        </div>
                                        <hr />
                                        <div className={styles["req-container"]}>
                                            <p>Processor:</p>
                                            <p>{recoReq.cpu ? recoReq.cpu.replace('Memory', '').replace('RAM', '') : 'Not available'}</p>
                                        </div>
                                        <hr />
                                        <div className={styles["req-container"]}>
                                            <p>Graphics:</p>
                                            <p>{recoReq.gpu ? recoReq.gpu : 'Not available'}</p>
                                        </div>
                                        <hr />
                                        <div className={styles["req-container"]}>
                                            <p>Memory:</p>
                                            <p>{recoReq.ram ? recoReq.ram : 'Not available'}</p>
                                        </div>
                                        <hr />
                                        <div className={styles["req-container"]}>
                                            <p>Storage:</p>
                                            <p>{recoReq.storage ? recoReq.storage : 'Not available'}</p>
                                        </div>
                                    </>)}

                            </div>
                        </div>
                    </div>
                </div>
                </>
            }
        </>
    )
   
}

export default Game;