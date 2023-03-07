import Axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router'
import './FriendsList.css'


const Friend = ({ friend, lastOnline }) => {

    const navigate = useNavigate();

    const online = new Date(new Date(Date.parse(lastOnline)).getTime() + 5 * 60000) > new Date();

    return (
        <div className="friend-container">
            <label className='friend'>{friend}</label>
            <label className={`online-status ${online ? 'online' : 'offline'}`}>{online ? 'Online' : 'Offline'}</label>
            <button className="studdy-button var" onClick={e => navigate(`/user/${friend}`, { replace: true })}>Profile</button>

        </div>
    )
}

const FriendRequest = ({ friendRequest }) => {

    const [action, setAction] = useState(null);

    const acceptFriendRequest = async () => {
        try {
            //get logged user
            const response = await Axios.post(`${process.env.REACT_APP_SERVER_ADDRESS}/addFriend`, {
                friend: friendRequest,
                options: 'accept'
            }, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            })

            //check if the response contains data and no error message
            if (response.data.message === 'Success') {
                //return the data if we have it
                setAction('accept');
            } else {
                //otherwise return undefined
                alert(`Something went wrong.`)
                return undefined
            }
        } catch (e) {
            console.log(e.message)

        }
    }

    const ignoreFriendRequest = async () => {
        try {
            //get logged user
            const response = await Axios.post(`${process.env.REACT_APP_SERVER_ADDRESS}/addFriend`, {
                friend: friendRequest,
                options: 'ignore'
            }, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            })

            //check if the response contains data and no error message
            if (response.data.message === 'Success') {
                //return the data if we have it
                setAction('ignore')
            } else {
                //otherwise return undefined
                alert(`Something went wrong.`)
                return undefined
            }
        } catch (e) {
            console.log(e.message)

        }
    }

    return (
        <div className="friend-container">
            <label className='friend'>{friendRequest}</label>
            {action === null ? <button className="studdy-button var" onClick={e => acceptFriendRequest()}>Accept</button> : ''}
            {action === null ? <button className="studdy-button var danger" onClick={e => ignoreFriendRequest()}>Ignore</button> : ''}
            {action === 'accept' ? 'Accepted' : ''}
            {action === 'ignore' ? 'Ignored' : ''}
        </div>
    )
}

const FriendsList = ({ friends, friendRequests }) => {

    return (
        <div className='friends-list-container'>
            <div className='friend-requests'>
                {friendRequests.map(friendRequest => {
                    return <FriendRequest friendRequest={friendRequest} />
                })}
            </div>

            <div className='friends'>
                {friends.map(friend => {
                    return <Friend friend={friend.username} lastOnline={friend.lastOnline} />
                })}
            </div>
        </div>
    )
}

export { FriendsList }