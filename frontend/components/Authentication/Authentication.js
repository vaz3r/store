import { Fragment, useState, useEffect } from "react";
import { useRouter } from 'next/router';
import validator from 'validator';
import styles from './Authentication.module.css';
import Head from "next/head";
import AuthInstance from "../../utils/Authentication/Instance";
import * as LoadingAnimation from './Loading.json';
import Lottie from 'react-lottie';

const Authentication = () => {
    const Router = useRouter();

    const [Authenticating, setAuthenticating] = useState(true);
    const [LayoutState, setLayoutState] = useState(0);
    const [ErrorState, setErrorState] = useState(-1);
    const [AuthenticationError, setAuthenticationError] = useState('');

    const [Email, setEmail] = useState('');
    const [Password, setPassword] = useState('');
    const [RepeatedPassword, setRepeatedPassword] = useState('');
    const [PasswordShown, setPasswordShown] = useState(true);

    useEffect(() => {
        AuthInstance.Functions.LoggedIn().then((Result) => {
            if (Result) {
                window.location.href = '/dashboard';
            } else {
                setAuthenticating(false);
            }
        });
    }, []);

    const Continue = async () => {
        // Initial Step;
        if (LayoutState == 0) {
            if (!validator.isEmail(Email)) {
                setErrorState(0);
                return;
            }

            const Exists = await AuthInstance.Functions.UserExists(Email);

            if (Exists) {
                setLayoutState(1);
            } else {
                setLayoutState(2);
            }

            return;
        }

        // Login;
        if (LayoutState == 1) {
            if (Password.length < 5) {
                setErrorState(1);
                return;
            }

            const Response = await AuthInstance.Local.SignIn(Email, Password);

            if (Response?.Success == true) {
                setLayoutState(4);
                Router.push('/dashboard');
            } else {
                setAuthenticationError(Response.Error);
                setErrorState(4);
            }

            return;
        }

        // Register;
        if (LayoutState == 2) {
            if (Password.length > 5 && RepeatedPassword.length > 5) {
                if (Password != RepeatedPassword) {
                    setErrorState(2);
                    return;
                }
            } else {
                setErrorState(3);
                return;
            }

            const Response = await AuthInstance.Local.SignUp(Email, Password);

            if (Response?.Success == true) {
                setLayoutState(4);
                Router.push('/dashboard');
            } else {
                setAuthenticationError(Response.Error);
                setErrorState(4);
            }

            return;
        }

        // Reset Password ==================>
        if (LayoutState == 5) {
            setLayoutState(1);
        }
    };

    return (
        <Fragment>
            <Head>
                <title>Authenticate</title>
            </Head>

            {
                Authenticating == true ? (
                    <Fragment>
                        <section className={styles.Loading}>
                            <div className={styles.Animation}>
                                <Lottie
                                    options={{
                                        loop: true,
                                        autoplay: true,
                                        animationData: LoadingAnimation,
                                        rendererSettings: {
                                            preserveAspectRatio: 'xMidYMid slice'
                                        }
                                    }}
                                    height={"auto"}
                                    width={"30vh"}
                                    isStopped={false}
                                    isPaused={false} />
                            </div>
                        </section>
                    </Fragment>
                ) : (
                    <section className={styles.Container}>
                        <div className={styles.Authentication}>
                            {
                                /* Initial =========================================> */
                                LayoutState == 0 &&
                                <Fragment>
                                    <div className={styles.Input}>
                                        <input value={Email} onKeyUp={(e) => e.key == "Enter" && Continue()} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email address" />
                                    </div>

                                    {
                                        ErrorState == 0 &&
                                        <div className={styles.ErrorText}>
                                            <canvas />
                                            Please enter a valid email address
                                        </div>
                                    }
                                </Fragment>
                            }

                            {
                                /* Login =========================================> */
                                LayoutState == 1 &&
                                <Fragment>
                                    <div className={styles.Info}>
                                        <h2>Hello again!</h2>
                                        <p>Please enter your password to login into your account.</p>
                                    </div>

                                    <div className={styles.Input}>
                                        <input value={Password} onKeyUp={(e) => e.key == "Enter" && Continue()} onChange={(e) => setPassword(e.target.value)} type={PasswordShown ? "text" : "password"} placeholder="Password" />
                                        <svg onClick={() => setPasswordShown(!PasswordShown)} viewBox="0 0 469.333 469.333">
                                            <g>
                                                <g>
                                                    <g>
                                                        <path d="M234.667,170.667c-35.307,0-64,28.693-64,64s28.693,64,64,64s64-28.693,64-64S269.973,170.667,234.667,170.667z" />
                                                        <path d="M234.667,74.667C128,74.667,36.907,141.013,0,234.667c36.907,93.653,128,160,234.667,160
				c106.773,0,197.76-66.347,234.667-160C432.427,141.013,341.44,74.667,234.667,74.667z M234.667,341.333
				c-58.88,0-106.667-47.787-106.667-106.667S175.787,128,234.667,128s106.667,47.787,106.667,106.667
				S293.547,341.333,234.667,341.333z"/>
                                                    </g>
                                                </g>
                                            </g>
                                        </svg>
                                    </div>

                                    {
                                        ErrorState == 1 &&
                                        <div className={styles.ErrorText}>
                                            <canvas />
                                            Please enter a valid password
                                        </div>
                                    }
                                </Fragment>
                            }

                            {
                                /* Register =========================================> */

                                LayoutState == 2 &&
                                <Fragment>
                                    <div className={styles.Info}>
                                        <h2>Last step!</h2>
                                        <p>Please enter &amp; repeat your password to continue.</p>
                                    </div>

                                    <div className={styles.Input} style={{ marginBottom: '15px' }}>
                                        <input value={Password} onKeyUp={(e) => e.key == "Enter" && Continue()} onChange={(e) => setPassword(e.target.value)} type="text" placeholder="Password" />
                                    </div>
                                    <div className={styles.Input}>
                                        <input value={RepeatedPassword} onKeyUp={(e) => e.key == "Enter" && Continue()} onChange={(e) => setRepeatedPassword(e.target.value)} type="text" placeholder="Repeat password" />
                                    </div>

                                    {
                                        ErrorState == 2 &&
                                        <div className={styles.ErrorText}>
                                            <canvas />
                                            Password does not match with the repeated password.
                                        </div>
                                    }
                                    {
                                        ErrorState == 3 &&
                                        <div className={styles.ErrorText}>
                                            <canvas />
                                            Password entered is shorter than 5 characters.
                                        </div>
                                    }
                                </Fragment>
                            }

                            {/* Logged In =========================================> */}
                            {
                                LayoutState == 3 &&
                                <div className={styles.Info}>
                                    <h2>Welcome again!</h2>
                                    <p>You have been successfully logged in.</p>
                                </div>
                            }

                            {/* Registered =========================================> */}
                            {
                                LayoutState == 4 &&
                                <div className={styles.Info}>
                                    <h2>Thank you!</h2>
                                    <p>Your account has been created and you have been automatically logged in.</p>
                                </div>
                            }

                            {/* Password Recovery =========================================> */}
                            {
                                LayoutState == 5 &&
                                <div className={styles.Info}>
                                    <h2>Check inbox!</h2>
                                    <p>We have sent you an email, please check your inbox!</p>
                                </div>
                            }

                            {
                                ErrorState == 4 &&
                                <div className={styles.ErrorText}>
                                    <canvas />
                                    {AuthenticationError}
                                </div>
                            }

                            <button className={styles.Action} onClick={() => Continue()}>
                                Continue
                            </button>
                        </div>
                    </section>
                )
            }
        </Fragment>
    );
};

export default Authentication;