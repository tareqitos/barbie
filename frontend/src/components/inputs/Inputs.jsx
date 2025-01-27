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

export function Filters({date, setDate, fetchData, setGamesList}) {
    
    let date_ref = useRef();

    function handleDateFilter(event) {
        setGamesList([]);
        const filtered_date = `${event.target.value}-01-01,${event.target.value}-12-30`;
        // console.log(filtered_date)
        setDate(filtered_date)
        console.log(date)
    }

    useEffect(() => {
        fetchData();
    }, [setDate])

    return (
        <>
            <div className={styles["filters-select-container"]}>
                <div className={`${styles['category-select']} ${styles['select-container']}`}>
                    <select defaultValue="" className={styles.select}>
                        <option value="" disabled>Category</option>
                        <option value="action">Action</option>
                        <option value="adventure">Adventure</option>
                        <option value="rpg">RPG</option>
                        <option value="strategy">Strategy</option>
                        <option value="simulation">Simulation</option>
                    </select>
                </div>
                <div className={`${styles['date-select']} ${styles['select-container']}`}>
                    <select onChange={handleDateFilter}  defaultValue="" className={styles.select}>
                        <option value="" disabled>Release date</option>
                        <option ref={date_ref} value="2025">2025</option>
                        <option ref={date_ref} value="2024">2024</option>
                        <option ref={date_ref} value="2023">2023</option>
                        <option ref={date_ref} value="2022">2022</option>
                        <option ref={date_ref} value="2021">2021</option>
                    </select>
                </div>
            </div>
        </>
    )
}

export default Inputs