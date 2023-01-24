import { ProgressBar } from '../misc/ProgressBar';

import './Profile.css'

const Profile = () => {

    return (
        <div className="profile-container">
            <div className='user-info-container profile-info'>
                <div className='username-container subcontainer'>
                    <label className='username'>aximum</label>
                    <label className='title'>Newbie</label>
                </div>
                <div className='profile-studio'>
                    Studio Model
                    <button>Go to Studio</button>
                </div>
                <div className='level-container subcontainer'>
                    <label className='level'>Level 14</label>
                    <ProgressBar color={'#8bb174'} height={20} progress={2234 * 100 / 3243} radius={50} />
                </div>
                <div className='profile-stats subcontainer'>
                    <label>Flashcards learnt: 1121</label>
                    <label>Date joined: 27/12/2022</label>
                    <label>Stat: stat</label>
                    <label>Stat: stat</label>
                    <label>Stat: stat</label>
                </div>
            </div>

            <div className='achievements-container'></div>
        </div>
    )
}

export default Profile;