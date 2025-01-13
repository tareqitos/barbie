import Searchbar from '../searchbar'
import { Link } from 'react-router-dom';
import styles from './Header.module.scss'

function Header() {
    return (
        <>
            <header>
                <div className={styles['logo-container']}>
                    <img src="./src/assets/images/logo-01.png" alt="" className={styles['logo-img']} />
                    <Link to="/" className={styles['logo-title']} href="index.html">COMPUTATO</Link>
                </div>

                <div className={styles['form-login-container']}>
                    <Searchbar />
                    <Link to="/login" className={`${styles.btn} ${styles['btn-login']}`}>
                        Log In
                    </Link>
                </div>
            </header>
        </>
    )
}

export default Header