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

export function Filters() {
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
                    <select defaultValue="" className={styles.select}>
                        <option value="" disabled>Release date</option>
                        <option value="2021">2021</option>
                        <option value="2020">2020</option>
                        <option value="2019">2019</option>
                        <option value="2018">2018</option>
                        <option value="2017">2017</option>
                    </select>
                </div>
            </div>
        </>
    )
}

export default Inputs