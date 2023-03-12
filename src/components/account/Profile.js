import { FaHeart } from 'react-icons/fa'
import { BsStarFill } from 'react-icons/bs';

import { ProgressBar, CircularProgressBar } from '../misc/ProgressBar';

import './Profile.css'
import { useContext, useEffect, useState } from 'react';
import { UserContext } from './UserInfo';
import { Badge } from '../misc/Badge';
import Axios from 'axios';

import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const Profile = () => {

    const { user } = useContext(UserContext)

    const level = ~~(Math.pow(user.xp, 1 / 3) * 0.4);
    const levelXP = ~~Math.pow((level / 0.4), 3);
    const levelProgress = Math.round((Math.pow(user.xp, 1 / 3) * 0.4 - level) * 100);
    const newLevel = Math.round(Math.pow((level + 1) / 0.4, 3));

    const [profile, setProfile] = useState({})
    const [badges, setBadges] = useState([])
    const favoriteBadges = badges.filter((badge) => profile.favoriteBadges.includes(badge._id))

    const [originalAbout, setOriginalAbout] = useState(null)
    const [about, setAbout] = useState(null)

    const getProfile = async () => {

        try {
            //get logged user
            const response = await Axios.get(`${process.env.REACT_APP_SERVER_ADDRESS}/profile`, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            })

            //check if the response contains data and no error message
            if (response && response.data && response.data.message !== 'Unauthorized') {
                //return the data if we have it
                await setProfile(response.data.user)
                await setBadges(response.data.badges)
                await setAbout(response.data.user.about)
                await setOriginalAbout(response.data.user.about)
            } else {
                //otherwise return undefined
                return undefined
            }
        } catch (e) {
            console.log(e.message)

        }
    }

    const updateAbout = async () => {
        try {
            //get logged user
            const response = await Axios.post(`${process.env.REACT_APP_SERVER_ADDRESS}/updateAbout`, {
                about: about
            }, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            })

            //check if the response contains data and no error message
            if (response.data.message === 'Success') {
                //return the data if we have it
                await setAbout(response.data.about)
                await setOriginalAbout(response.data.about)
            } else {
                //otherwise return undefined
                alert('Something went wrong, please try again or contact us.');
                return undefined
            }
        } catch (e) {
            console.log(e.message)

        }
    }

    useEffect(() => {
        getProfile()
    }, [])

    useEffect(() => {
        document.title = "Studdy | Profile"
    }, [])

    return (
        <div className="profile-container">
            <div className='profile-info-container main'>
                <div className='user-info-container sub'>
                    <div className='username-container sub'>
                        <div className='user-details sub'>
                            <span className='likes'><FaHeart className='icon' />{profile.hearts !== undefined ? profile.hearts : <Skeleton inline width={'3ch'} baseColor={'var(--main-container-color)'} />}</span>
                            <span className='stars'><BsStarFill className='icon' />{profile.stars !== undefined ? profile.stars : <Skeleton inline width={'3ch'} baseColor={'var(--main-container-color)'} />}</span>
                            <label className='username'>{profile.username || <Skeleton inline width={'5ch'} baseColor={'var(--main-container-color)'} />}</label>
                            <label className='title'>{profile.title || <Skeleton inline width={'5ch'} baseColor={'var(--main-container-color)'} />}</label>
                        </div>
                        <div className='user-level sub'>
                            <CircularProgressBar progress={levelProgress} size={'120px'} progressColor={'var(--palette-color-3)'} progressColor2={'#4D54EB'} progressColor3={'#D270F4'} outerColor={'rgba(119,79,209,0.25)'} innerColor1={'var(--palette-color-2)'} innerColor2={'var(--var-container-color)'} textColor={'var(--main-text-color)'} customText={level} fontSize={'40px'} />
                            <label className='level'>Level {level > -1 ? level : <Skeleton inline width={'2ch'} baseColor={'var(--main-container-color)'} />}</label>
                        </div>
                    </div>
                    <div className='xp-progress-container sub'>
                        <ProgressBar color={'#4D54EB'} height={20} progress={levelProgress} radius={50} />
                        <label className='xp-progress'>{user.xp - levelXP} / {newLevel - levelXP}</label>
                    </div>
                </div>
                <div className='about-me-container sub'>
                    ABOUT ME
                    <div className='text-area-wrapper'>{about !== null ? <textarea className='about-me' value={about} onChange={e => setAbout(e.target.value)}></textarea> : <Skeleton inline count={3} baseColor={'var(--main-container-color)'} />}</div>
                    {originalAbout !== about ? <button className='studdy-button' onClick={e => updateAbout()}>Update</button> : ''}
                </div>
                <div className='favorite-badges-container sub'>
                    FAVORITE BADGES
                    <div className='favorite-badges'>
                        {profile.favoriteBadges ? favoriteBadges.map((badge) => {
                            return <Badge size={'100px'} id={badge._id} name={badge.name} description={badge.description} stage={badge.stage} progress={badge.progress} milestones={badge.milestones} />
                        }) : <><Skeleton inline width={'150px'} height={'175px'} baseColor={'var(--main-container-color)'} /><Skeleton inline width={'150px'} height={'175px'} baseColor={'var(--main-container-color)'} /><Skeleton inline width={'150px'} height={'175px'} baseColor={'var(--main-container-color)'} /></>}
                    </div>
                </div>
                <div className='profile-stats-container sub'>
                    <label>Member since {profile.dateJoined ? (new Date(profile.dateJoined)).toLocaleDateString("en-UK") : <Skeleton inline width={'10ch'} baseColor={'var(--main-container-color)'} />}</label>
                </div>
            </div>

            <div className='profile-info-container var'>
                <div className='badges'>
                    {badges.length > 0 ? badges.map((badge) => {
                        return <Badge size={'100px'} id={badge._id} name={badge.name} description={badge.description} stage={badge.stage} progress={badge.progress} milestones={badge.milestones} />
                    }) : [...Array(12)].map((e, i) => { return <Skeleton inline width={'150px'} height={'175px'} baseColor={'var(--main-container-color)'} /> })}
                </div>
            </div>

        </div>
    )
}

export default Profile;