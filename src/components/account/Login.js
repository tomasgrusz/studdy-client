import { Navigate, useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import axios from 'axios';

import './Login.css'
import { useState } from "react";

const ProtectedRoute = ({ children }) => {
    const user = Cookies.get('user');
    if (!user) {
        return <Navigate to="/login" replace />;
    }
    return children;
};

const SignOut = () => {


    axios.post('http://localhost:3001/logout', {
    }, {
        headers: {
            'Content-Type': 'application/json'
        },
        withCredentials: true
    }).then(response => {
        if (response.data.message === 'logged out') {
            Cookies.remove('user')
            return <Navigate to="/login" replace />
        } else {
            return <Navigate to="/" replace />
        }
    })


    return (<>You have successfully logged out!</>)
}

const Login = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const userLogIn = async e => {
        e.preventDefault();

        const response = await axios.post('http://localhost:3001/login', {
            username: username,
            password: password
        }, {
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true
        })
        if (response.data.message === 'logged in') {
            alert(`Successfully logged in as ${response.data.user}!`)
            Cookies.set('user', true)
            navigate('/');
        }
    }

    return (
        <div className="login-div">
            <form className="login-form" onSubmit={e => userLogIn(e)}>
                <input className="username-input" type='text' placeholder="Username" value={username} onChange={e => setUsername(e.target.value)}></input>
                <input className="password-input" type='password' placeholder="Password" value={password} onChange={e => setPassword(e.target.value)}></input>
                <input className="login-button" type='submit' value='Log In'></input>
            </form>
        </div>
    )
}

export { ProtectedRoute, Login, SignOut };