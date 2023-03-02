import { useState } from "react";

import Logo from "../three/Logo";

const CreateAccount = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [agreed, setAgreed] = useState(false);

    const createAccount = (e) => {
        e.preventDefault()
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