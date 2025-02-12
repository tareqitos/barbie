import Header from '../header'
import { Link } from 'react-router-dom';
import { ArrowLeftCircleIcon } from '@heroicons/react/24/solid'
import styles from './Login.module.scss'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Member() {
    const [activeIndex, setActiveIndex] = useState(0)

    return (
        <>
            {!activeIndex ? <Login setActiveIndex={setActiveIndex} /> :
                activeIndex == 1 ? <ResetPassword setActiveIndex={setActiveIndex} /> :
                    activeIndex == 2 ? <SignUp setActiveIndex={setActiveIndex} /> : 
                    activeIndex == 3 ? <SuccessSignUp setActiveIndex={setActiveIndex}/> :''}
        </>
    )
}



function Login({ setActiveIndex }) {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const [errorStatus, setErrorStatus] = useState('');

    function LoginError(){
        if (errorStatus.status === true){
            return (
            <div className={styles['login-error']}>Incorrect username or password</div>
        );
    }}

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:3000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });
    
            if (response.ok) {
                const data = await response.json();
                document.cookie = `tokenKey=${JSON.stringify(
                    data.accessToken
                  )}; expires=${new Date(Date.now() + 1000 * 60 * 60 * 24).toUTCString()}`;
                navigate('/');
            } else {
                setErrorStatus({status: true});
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };
    
    return (
        <>
            <div className={styles["login-form-container"]}>
                <h1>Login</h1>
                <form action="" onSubmit={handleSubmit}>
                    <div className={styles['input-user-container']}>
                        <label htmlFor="username">Username</label>
                        <input type="text" id="username" name="username" placeholder="Type your username" value={username} onChange={(e) => setUsername(e.target.value)} required/>
                    </div>
                    <div className={styles['input-pass-container']}>
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" name="password" placeholder="Type your password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                        <Link to={'/password-reset'} onClick={() => setActiveIndex(1)} className={styles['pass-reset-link']}>Forgot password?</Link>
                    </div>
                    <LoginError />
                    <button type="submit">Login</button>
                </form>
                <p className={styles['sign-up-message']}>Not a member? <Link to={'/signup'} onClick={() => setActiveIndex(2)} className={styles['sign-up-link']}>Sign up now</Link></p>
            </div>
        </>
    )
}

function SignUp({ setActiveIndex }) {

    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [verifyPassword, setVerifyPassword] = useState('');
    const [error, setError] = useState('');
    
    const SignupError = () => {
        if (error.status === true){
            return (
            <div className={styles['login-error']}>
                {error.message}
            </div>
        );
    }
        else if (error.status === false) {
            setActiveIndex(3);
        }
    }

    const handleRegistration = (e) => {
        e.preventDefault();
        try {
            const response = fetch('http://localhost:3000/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 
                    email: email, 
                    username: username, 
                    password: password,
                    verifypassword: verifyPassword
                }),
                
            })
            .then((response) => response.json())
            .then((result) => {
                if (result.status === `201`) {
                    setError({
                        status : false,
                        message : result.message
                    });
                } else {
                    setError({
                        status : true,
                        message : result.message
                    });
                }
            })
            } 
            catch (error) {
            console.error('Error:', error);
        } ;
    }
    return (
        <>
            <div className={styles["login-form-container"]}>
                <h1>Sign up</h1>
                <form action="" onSubmit={handleRegistration}>
                    <div className={styles['input-user-container']}>
                        <label htmlFor="email">E-mail</label>
                        <input type="email" id="email" name="email" placeholder="Type your email" onChange={(e) => setEmail(e.target.value)} required/>
                    </div>
                    <div className={styles['input-user-container']}>
                        <label htmlFor="username">Username</label>
                        <input type="text" id="username" name="username" placeholder="Type your username"  onChange={(e) => setUsername(e.target.value)} required/>
                    </div>

                    <div className={styles['input-pass-container']}>
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" name="password" placeholder="Type your password" onChange={(e) => setPassword(e.target.value)} required />
                    </div>
                    <div className={styles['input-pass-container']}>
                        <label htmlFor="password">Verify password</label>
                        <input type="password" id="verify-password" name="verify-password" placeholder="Type your password again" onChange={(e) => setVerifyPassword(e.target.value)}required />
                    </div>
                    <SignupError/>
                    <button type="submit">Sign up</button>
                    <Link to={'/login'} onClick={() => setActiveIndex(0)} className={styles['log-in-link']}>Log in</Link>
                </form>
            </div>
        </>
    )
}

function SuccessSignUp({ setActiveIndex }) {
    return(
        <>
            <div className={styles["login-form-container"]}>
                <div className={styles["signup-success"]}>
                <h1>Success!</h1>
                <img src="./src/assets/images/checkmark.svg" alt="" className={styles['signup-check']} />
                <h2>Your account has been created<br/><span className={styles["text-lightblue"]}>Now get ready to potato!</span></h2><br/>
                    <Link to={'/login'} onClick={() => setActiveIndex(0)} className={styles['log-in-link']}>Log in</Link>
                </div>
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