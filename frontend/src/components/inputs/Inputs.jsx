import { useEffect, useRef } from 'react';
import styles from './Inputs.module.scss'

function Inputs() {

    return (
        <>
            <div className={styles["hardware-select-container"]}>
                <div className={`${styles['processor-select']} ${styles['select-container']}`}>
                    <label htmlFor="">Processor</label>
                    <select className={styles.select}>
                        <option value="" disabled>Select your processor</option>
                        <option value="intel">Intel</option>
                        <option value="amd">AMD</option>
                        <option value="apple">Apple</option>
                    </select>
                </div>
                <div className={`${styles['graphic-select']} ${styles['select-container']}`}>
                    <label htmlFor="">Graphic card</label>
                    <select className={styles.select}>
                        <option value="" disabled>Select your graphic card</option>
                        <option value="nvidia">NVIDIA</option>
                        <option value="amd">AMD</option>
                        <option value="intel">Intel</option>
                    </select>
                </div>
                <div className={`${styles['ram-select']} ${styles['select-container']}`}>
                    <label htmlFor="">RAM</label>
                    <select className={styles.select}>
                        <option value="" disabled>Select your RAM</option>
                        <option value="8gb">8 GB</option>
                        <option value="16gb">16 GB</option>
                        <option value="32gb">32 GB</option>
                    </select>
                </div>
            </div>
        </>
    )
}

export function Filters({date, setDate, genre, setGenre, setGamesList, fetchData}) {
    
    let date_ref = useRef();

    function handleDateFilter(event) {
        
        setGamesList([]);
        const filtered_date = `${event.target.value}-01-01,${event.target.value}-12-30`;
        // console.log(filtered_date)
        setDate(filtered_date)
    }

    function handleCategoryFilter(event) {
        setGamesList([]);
        const filtered_category = event.target.value;
        setGenre(filtered_category);
        console.log('Genre: ' + genre)
    }



    return (
        <>
            <div className={styles["filters-select-container"]}>
                <div className={`${styles['category-select']} ${styles['select-container']}`}>
                    <select onChange={handleCategoryFilter} defaultValue="action" className={styles.select}>
                        <option value="action">Action</option>
                        <option value="adventure">Adventure</option>
                        <option value="arcade">Arcade</option>
                        <option value="board-games">Board Games</option>
                        <option value="card">Card</option>
                        <option value="casual">Casual</option>
                        <option value="educational">Educational</option>
                        <option value="family">Family</option>
                        <option value="fighting">Fighting</option>
                        <option value="indie">Indie</option>
                        <option value="massively-multiplayer">Massively Multiplayer</option>
                        <option value="platformer">Platformer</option>
                        <option value="puzzle">Puzzle</option>
                        <option value="racing">Racing</option>
                        <option value="role-playing-games-rpg">RPG</option>
                        <option value="shooter">Shooter</option>
                        <option value="simulation">Simulation</option>
                        <option value="sports">Sports</option>
                        <option value="strategy">Strategy</option>
                    </select>
                </div>
                <div className={`${styles['date-select']} ${styles['select-container']}`}>
                    <select onChange={handleDateFilter} defaultValue="" className={styles.select}>
                        <option value="" disabled>Release date</option>
                        {Array.from({ length: 16 }, (_, i) => {
                            const year = 2025 - i;
                            return (
                                <option key={year} ref={date_ref} value={year}>
                                    {year}
                                </option>
                            );
                        })}
                    </select>
                </div>
            </div>
        </>
    )
}

export default Inputs