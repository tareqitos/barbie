import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import styles from './Game.module.scss'
import CardSkeleton from '../cardSkeleton';

function Game() {
    const [game, setGame] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const game = window.location.pathname;
                console.log(game)
                
                const response = await fetch(`http://localhost:3000${game}`);
                const result = await response.json()
                setGame(result)

                console.log(result)
            } catch (error) {
                console.error("Error fetching JSON:", error);
            } 
        }
        fetchData();
    }, []);


    return (
        <>  
            <div className={styles['game-list']}>
                <p>{game.name}</p>
            </div>
        </>
    )
}

export default Game;