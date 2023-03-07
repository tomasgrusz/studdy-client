import { useState, useEffect } from 'react'
import Axios from 'axios'

import { Deck } from '../decks/DeckList'
import './Home.css'
import { ActivityChart, ActivityProgress } from '../misc/Activity'
import StudySession from '../decks/StudySession/StudySession'

import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { FriendsList } from './FriendsList'
import { DeckRequest, DeckRequests } from './DeckRequests'
import { FaUserFriends } from 'react-icons/fa'
import { BiMessageDetail } from 'react-icons/bi'
import ToggleSwitch from '../misc/ToggleSwitch'

const Home = () => {

    const [profile, setProfile] = useState({})
    const [recentDeck, setRecentDeck] = useState(null)
    const [dailyDecks, setDailyDecks] = useState([])
    const [goals, setGoals] = useState(null)

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
                await setRecentDeck(response.data.user.recentDeck)
                await setDailyDecks(response.data.user.dailyDecks)
                await setGoals(response.data.user.goals)
            } else {
                //otherwise return undefined
                return undefined
            }
        } catch (e) {
            console.log(e.message)

        }
    }

    useEffect(() => {
        getProfile()
    }, [])

    const [studySession, setStudySession] = useState(null)
    const [selectedDeck, setSelectedDeck] = useState(null)
    const [subThreeShow, setSubThreeShow] = useState(false)
    const [deckRequest, setDeckRequest] = useState(null)

    if (studySession) {
        return <StudySession session={studySession} />
    } else {
        if (deckRequest) {
            return <DeckRequest deckRequest={deckRequest} />
        } else {
            return <div className="home-container">
                <div className='welcome-message sub one'>
                    <label>Welcome back, {profile.username || <Skeleton inline width={'5ch'} baseColor={'var(--main-container-color)'} />}.</label>
                </div>
                <div className='daily-bonus sub two'>
                    <span>Daily Bonus</span>
                    <span className='bonus-text'>{profile.dailyBonus !== undefined ? profile.dailyBonus : <Skeleton inline width={'2ch'} baseColor={'var(--main-container-color)'} />}</span>
                </div>
                <div className='friends-list sub three'>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <label>{!subThreeShow ? 'Friends List' : 'Shared Decks'}</label>
                        <div>
                            <FaUserFriends className='icon' style={{ fontSize: '24px' }} />
                            <ToggleSwitch toggle={subThreeShow} toggleFunction={setSubThreeShow} />
                            <BiMessageDetail className='icon' style={{ fontSize: '24px' }} />
                            {(profile.sharedDecks || []).length > 0 ? <span style={{ display: 'inline-block', width: '8px', height: '8px', backgroundColor: 'var(--danger-color)', borderRadius: '50%' }}></span> : ''}
                        </div>
                    </div>
                    {!subThreeShow
                        ? <FriendsList friends={profile.friends || []} friendRequests={profile.friendRequests || []} />
                        : <DeckRequests sharedDecks={profile.sharedDecks || []} setDeckRequest={setDeckRequest} />
                    }
                </div>
                <div className='activity-stats sub four'>
                    <ActivityChart activity={profile.weeklyActivity} />
                </div>
                <div className='activity-progress sub five'>
                    <ActivityProgress goals={goals} />
                </div>
                <div className='promotions sub six'>
                    Promotions
                </div>
                <div className='sub seven'>
                    <div className='recent-decks'>
                        {recentDeck !== null ? <div className='deck-container' deck={recentDeck}>
                            <label className='recent-decks-label'>MOST RECENT SESSION</label>
                            <Deck name={recentDeck.name} category={recentDeck.category} total={recentDeck.total} progress={recentDeck.progress} stage={recentDeck.stage} flashcardStats={recentDeck.flashcardStats} setSelectedDeck={setSelectedDeck} setStudySession={setStudySession} deckRef={recentDeck} description={recentDeck.description} />
                        </div> : <div className='deck-container'>
                            <label className='recent-decks-label'><Skeleton inline width={'10ch'} baseColor={'var(--main-container-color)'} /></label>
                            <Deck skeleton />
                        </div>}
                        {dailyDecks.length > 0 ? dailyDecks.map(deck => <div className='deck-container' deck={deck}>
                            <label className='recent-decks-label'>SUGGESTION</label>
                            <Deck name={deck.name} category={deck.category} total={deck.total} progress={deck.progress} stage={deck.stage} flashcardStats={deck.flashcardStats} setSelectedDeck={setSelectedDeck} setStudySession={setStudySession} deckRef={deck} description={deck.description} />
                        </div>) : [...Array(3)].map((e, i) => {
                            return <div className='deck-container' key={i}>
                                <label className='recent-decks-label'><Skeleton inline width={'10ch'} baseColor={'var(--main-container-color)'} /></label>
                                <Deck skeleton />
                            </div>
                        })}
                    </div>
                </div>
                <div className='community-feed sub eight'>
                    Community Feed
                </div>
            </div>
        }
    }
}

export { Home }