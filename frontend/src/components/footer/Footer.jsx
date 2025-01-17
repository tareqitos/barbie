import { Link } from 'react-router-dom';
import styles from './Footer.module.scss'

function Footer() {
    const date = new Date()

    return (
        <footer className={styles['footer']}>
            <div className={styles["footer-title"]}>
                <img src="./src/assets/images/logo-01.png" alt="" className={styles['logo-img']} />
                {`© ${date.getFullYear().toLocaleString().replace(/\s/g, '')} Computato`}
            </div>

            <div className={styles["footer-links"]}>
                <Link to='/terms'>Terms</Link>
                <Link to='/privacy'>Privacy</Link>
            </div>
        </footer>
    )
}

export default Footer;