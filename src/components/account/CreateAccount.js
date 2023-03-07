import { useState } from "react";
import Axios from 'axios';
import Logo from "../three/Logo";
import { useNavigate } from "react-router-dom";

const CreateAccount = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [agreed, setAgreed] = useState(false);
    const navigate = useNavigate();

    const createAccount = async (e) => {
        e.preventDefault();
        console.log('Hi')

        const response = await Axios.post(`${process.env.REACT_APP_SERVER_ADDRESS}/createUser`, {
            username: username,
            password: password
        }, {
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true
        })
        console.log(response)
        if (response.data.message === 'Success') {
            alert(`Successfully created user, please log in!`)
            navigate('/login', { replace: true });
        }
    }

    return (
        <div className="login-container">
            <div className="foreground">
                <h1 className="title">New Account</h1>
                <form className="login-form" onSubmit={e => createAccount(e)}>
                    <input className="username-input" type='text' placeholder="Username" value={username} onChange={e => setUsername(e.target.value)}></input>
                    <input className="password-input" type='password' placeholder="Password" value={password} onChange={e => setPassword(e.target.value)}></input>
                    <div>
                        <input type="checkbox" value={agreed} onChange={e => setAgreed(e.target.value)}></input>
                        <label>I agree to the Privacy Policy.</label>
                    </div>
                    <input className="login-button studdy-button" type='submit' value='Join'></input>
                </form>
            </div>
            <div className="studio-container-var">
                <Logo />
            </div>
        </div>
    )
}

export { CreateAccount }