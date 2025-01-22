import Header from '../header'
import { Link } from 'react-router-dom';
import { ArrowLeftCircleIcon } from '@heroicons/react/24/solid'
import styles from './Login.module.scss'
import { useState } from 'react';

function Member() {
    const [activeIndex, setActiveIndex] = useState(0)

    return (
        <>
            {!activeIndex ? <Login setActiveIndex={setActiveIndex} /> :
                activeIndex == 1 ? <ResetPassword setActiveIndex={setActiveIndex} /> :
                    activeIndex == 2 ? <SignUp setActiveIndex={setActiveIndex} /> : ''}
        </>
    )
}

function Login({ setActiveIndex }) {
    return (
        <>
            <div className={styles["login-form-container"]}>
                <h1>Login</h1>
                <form action="">
                    <div className={styles['input-user-container']}>
                        <label htmlFor="username">Username</label>
                        <input type="text" id="username" name="username" placeholder="Type your username" required />
                    </div>
                    <div className={styles['input-pass-container']}>
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" name="password" placeholder="Type your password" required />
                        <Link to={'/password-reset'} onClick={() => setActiveIndex(1)} className={styles['pass-reset-link']}>Forgot password?</Link>
                    </div>
                    <button type="submit">Login</button>
                </form>
                <p className={styles['sign-up-message']}>Not a member? <Link to={'/signup'} onClick={() => setActiveIndex(2)} className={styles['sign-up-link']}>Sign up now</Link></p>
            </div>
        </>
    )
}

function SignUp({ setActiveIndex }) {
    return (
        <>
            <div className={styles["login-form-container"]}>
                <h1>Sign up</h1>
                <form action="">
                    <div className={styles['input-user-container']}>
                        <label htmlFor="email">E-mail</label>
                        <input type="email" id="email" name="email" placeholder="Type your email" required />
                    </div>
                    <div className={styles['input-pass-container']}>
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" name="password" placeholder="Type your password" required />
                    </div>
                    <div className={styles['input-pass-container']}>
                        <label htmlFor="password">Verify password</label>
                        <input type="password" id="verify-password" name="verify-password" placeholder="Type your password again" required />
                    </div>
                    <button type="submit">Sign up</button>
                    <Link to={'/login'} onClick={() => setActiveIndex(0)} className={styles['log-in-link']}>Log in</Link>
                </form>
            </div>
        </>
    )
}

function ResetPassword({ setActiveIndex }) {
    return (
        <>
            <div className={styles["reset-form-container"]}>
                <h1><Link to={'/login'}><ArrowLeftCircleIcon onClick={() => setActiveIndex(0)} className={styles['heroicons']} /></Link> Password reset</h1>
                <form action="">
                    <div className={styles['input-user-container']}>
                        <label htmlFor="email">E-mail</label>
                        <input type="email" id="email" name="email" placeholder="Type your email" required />
                    </div>
                    <button type="submit">Reset</button>
                </form>
            </div>
        </>
    )
}


export default Member;