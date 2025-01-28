import { Link } from 'react-router-dom';
import styles from './Header.module.scss'

function Header() {
    const handleLogoClick = () => {
        window.location.reload();
    };

    return (
        <>
            <header>
                <div onClick={handleLogoClick} className={styles['logo-container']}>
                    <img src="./src/assets/images/logo-01.png" alt="" className={styles['logo-img']} />
                    <Link to="/" className={styles['logo-title']} href="index.html">COMPUTATO</Link>
                </div>

                <div className={styles['form-login-container']}>
                    <Link to="/login">
                        <button className={`${styles.btn} ${styles['btn-login']}`}>
                            Log In
                        </button>
                    </Link>
                </div>
            </header>
        </>
    )
}

export default Header