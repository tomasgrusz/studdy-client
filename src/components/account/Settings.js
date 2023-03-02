import './Settings.css'

const Settings = () => {

    return (
        <div className='settings-container'>
            <div className='settings-subcontainer main'>
                <div className='goals-container'>
                    <div className='goal-container'>
                        <label>Daily Goal</label>
                        <input className='password-input' type='number' placeholder='50'></input>
                    </div>
                    <div className='goal-container'>
                        <label>Weekly Goal</label>
                        <input className='password-input' type='number' placeholder='250'></input>
                    </div>
                    <div className='goal-container'>
                        <label>Monthly Goal</label>
                        <input className='password-input' type='number' placeholder='750'></input>
                    </div>
                </div>
                <div className='change-password-container'>
                    <input className='password-input' type='text' placeholder='Old password'></input>
                    <input className='password-input' type='text' placeholder='New password'></input>
                    <button className='studdy-button var'>Change Password</button>
                </div>
                <button className='studdy-button var danger'>Delete Account</button>
            </div>
            <div className='settings-subcontaineX'>

            </div>
            <div className='settings-subcontainerX'>
            </div>
        </div>
    )
}

export { Settings }