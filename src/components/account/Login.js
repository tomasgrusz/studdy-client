import { Navigate, useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import axios from 'axios';

import './Login.css'
import { useEffect, useState } from "react";
import Logo from "../three/Logo";

const ProtectedRoute = ({ children }) => {

    const [authResult, setAuthResult] = useState(true)

    const online = async () => {
        const response = await axios.get(`${process.env.REACT_APP_SERVER_ADDRESS}/online`, {
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true
        })

        if (response.data.message !== 'Success') {
            setAuthResult(false)
        }
    }

    useEffect(() => {
        online()
    })

    return authResult ? children : <Navigate to="/login" replace />;
};

const SignOut = () => {

    const [loggedOut, setLoggedOut] = useState(false)

    const logout = () => {
        console.log(process.env.REACT_APP_SERVER_ADDRESS)
        axios.post(`${process.env.REACT_APP_SERVER_ADDRESS}/logout`, {
        }, {
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true
        }).then(response => {
            if (response.data.message === 'logged out') {
                Cookies.remove('user');
                setLoggedOut(true);
            }
        })
    }

    useEffect(() => {
        logout()
    }, [])

    return loggedOut ? <Navigate to="/login" replace /> : <>Signing Out</>
}

const Login = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const userLogIn = async e => {
        e.preventDefault()

        const response = await axios.post(`${process.env.REACT_APP_SERVER_ADDRESS}/login`, {
            username: username,
            password: password
        }, {
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true
        })
        if (response.data.message === 'logged in') {
            Cookies.set('user', true)
            navigate('/', { replace: true });
        } else {
            alert(`Incorrect username or password, please try again!`);
        }
    }

    useEffect(() => {
        document.title = "Studdy | Login"
    }, [])

    return (
        <div className="login-container">
            <div className="foreground">
                <h1 className="title">Sign In</h1>
                <form className="login-form" onSubmit={e => userLogIn(e)}>
                    <input className="username-input" type='text' placeholder="Username" value={username} onChange={e => setUsername(e.target.value)}></input>
                    <input className="password-input" type='password' placeholder="Password" value={password} onChange={e => setPassword(e.target.value)}></input>
                    <label>Forgot password?</label>
                    <input className="login-button studdy-button" type='submit' value='Continue'></input>
                </form>
            </div>
            <div className="studio-container-var">
                <Logo />
            </div>
        </div>
    )
}

export { ProtectedRoute, Login, SignOut };