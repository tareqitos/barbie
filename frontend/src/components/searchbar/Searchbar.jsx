import styles from './Searchbar.module.scss'

function Searchbar() {
    return (
        <form>
            <input className={styles['input-search']} type="input" name="search" placeholder='Search games...' />
        </form>
    )
}

export default Searchbar;