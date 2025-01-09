import styles from './Header.module.scss'

function Header() {
    return (
        <>
            <header>
                <div className={styles.logo_container}>
                    <img src="./src/assets/images/logo-01.png" alt="" className={styles.logo_img} />
                    <a className={styles.logo_title} href="index.html">COMPUTATO</a>
                </div>
                <div className={styles.form_login_container}>
                    <form>
                        <input className={styles.input_search} type="text" placeholder='Search games...'/>
                    </form>
                    <button className={`${styles.btn} ${styles.btn_login}`}>
                        Log In
                    </button>
                </div>
            </header>
        </>
    )
}

export default Header