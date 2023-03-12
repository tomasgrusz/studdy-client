import { useEffect, useState } from 'react'
import Axios from 'axios'
import './Settings.css'

const Settings = () => {

    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");

    const [goals, setGoals] = useState([0, 0, 0]);

    const updateGoals = async () => {
        if (goals[0] === 0 || goals[1] === 0 || goals[2] === 0) {
            alert('Goals must be non-zero.')
        } else if (parseInt(goals[1]) < parseInt(goals[0]) || parseInt(goals[2]) < parseInt(goals[1]) || parseInt(goals[2]) < parseInt(goals[0])) {
            alert('Daily/Weekly values cannot be higher than Weekly/Monthly.')
        } else if (goals[0] === "" || goals[1] === "" || goals[2] === "") {
            alert('Goals must be non-empty.')
        } else {
            const response = await Axios.post(`${process.env.REACT_APP_SERVER_ADDRESS}/updateGoals`, {
                daily: goals[0],
                weekly: goals[1],
                monthly: goals[2]
            }, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            })

            //check if the response contains data and no error message
            if (response.data.message === 'Success') {
                //return the data if we have it
                alert('Successfully updated goals.')
            } else {
                //otherwise return undefined
                alert(response.data.message);
                return undefined
            }
        }
    }

    const changePassword = async () => {
        if (oldPassword === "" || newPassword === "") {
            alert('One or more fields are empty.')
        } else {
            const response = await Axios.post(`${process.env.REACT_APP_SERVER_ADDRESS}/changePassword`, {
                oldPassword: oldPassword,
                newPassword: newPassword
            }, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            })

            //check if the response contains data and no error message
            if (response.data.message === 'Success') {
                //return the data if we have it
                alert('Successfully changed password.')
            } else {
                //otherwise return undefined
                alert(response.data.message);
                return undefined
            }
        }
    }

    const deleteAccount = async () => {
        alert('Work In Progress, thank you for understanding. Please contact us to delete your account manually.')
    }

    useEffect(() => {
        document.title = "Studdy | Settings"
    }, [])

    return (
        <div className='settings-container'>
            <div className='settings-subcontainer main'>
                GOALS
                <div className='goals-container'>
                    <div className='goal-container'>
                        <label>Daily Goal</label>
                        <input className='password-input' type='number' placeholder={goals[0]} value={goals[0]} onChange={e => setGoals([e.target.value, goals[1], goals[2]])}></input>
                    </div>
                    <div className='goal-container'>
                        <label>Weekly Goal</label>
                        <input className='password-input' type='number' placeholder={goals[1]} value={goals[1]} onChange={e => setGoals([goals[0], e.target.value, goals[2]])}></input>
                    </div>
                    <div className='goal-container'>
                        <label>Monthly Goal</label>
                        <input className='password-input' type='number' placeholder={goals[2]} value={goals[2]} onChange={e => setGoals([goals[0], goals[1], e.target.value])}></input>
                    </div>
                    <div className='goal-container'>
                        <span></span>
                        <button className='studdy-button var' onClick={e => updateGoals()}>Update</button>
                    </div>
                </div>
                GENERAL
                <div style={{ margin: 'auto 0' }}>
                </div>
                ACCOUNT
                <div className='change-password-container'>
                    <input className='password-input' type='password' placeholder='Old password' value={oldPassword} onChange={e => setOldPassword(e.target.value)}></input>
                    <input className='password-input' type='password' placeholder='New password' value={newPassword} onChange={e => setNewPassword(e.target.value)}></input>
                    <button className='studdy-button var' onClick={e => changePassword()}>Change Password</button>
                </div>
                <div style={{ textAlign: 'center' }}>
                    <button className='studdy-button var danger' onClick={e => deleteAccount()}>Delete Account</button>
                </div>
            </div>
        </div>
    )
}

export { Settings }