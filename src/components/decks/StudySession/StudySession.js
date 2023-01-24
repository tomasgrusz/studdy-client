
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';
import './StudySession.css'

import { Flashcard } from '../Flashcard';
import { Deck } from '../DeckList';
import { CircularProgressBar } from '../../misc/ProgressBar';

const StudySession = ({ session }) => {

    const [studySession, setStudySession] = useState(session)
    const [flashcard, setFlashcard] = useState(null)

    const navigate = useNavigate();

    const startSession = async () => {
        const response = await Axios.post('http://localhost:3001/studySession', {
            session: studySession,
            options: {
                state: 'start'
            }
        }, {
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true
        })
        if (response.data.message === 'Success' && response.data.flashcard && response.data.session) {

            //do something
            console.log(response.data);
            setStudySession(response.data.session)
            setFlashcard(response.data.flashcard)

        } else if (response.data.message === 'Unauthorized') {
            alert('Your session is outdated, you will be redirected to the login page to sign in again.')
            navigate('/sign-out')
        } else if (response.data.message === 'Session Complete') {
            setFlashcard('completed')
            setStudySession(response.data.session)
        } else {
            alert('An unexpected error occured, please try again later or contact us.')
        }
    }

    const continueSession = async (confidence) => {
        console.log(confidence)
        console.log(flashcard)
        console.log(studySession)

        const response = await Axios.post('http://localhost:3001/studySession', {
            session: studySession,
            options: {
                state: 'continue',
                flashcard: flashcard,
                confidence: confidence
            }
        }, {
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true
        })
        if (response.data.message === 'Success') {

            //do something
            console.log(response.data);
            setFlashcard(response.data.flashcard);

            if (response.data.session.progress > studySession.progress) {

            }

            setStudySession(response.data.session);

        } else if (response.data.message === 'Unauthorized') {
            alert('Your session is outdated, you will be redirected to the login page to sign in again.')
            navigate('/sign-out')
        } else if (response.data.message === 'Session Complete') {
            setFlashcard('completed')
            setStudySession(response.data.session);
        } else {
            alert('An unexpected error occured, please try again later or contact us.')
        }
    }

    useEffect(() => {
        startSession()
    }, [])

    return (
        <div className='session-container '>
            <div className='session-progress'>
                <CircularProgressBar progress={Math.round(100 * studySession.progress / studySession.total)} size={'100%'} progressColor={'var(--session-color-2)'} outerColor={'rgba(138,106,169,0.5)'} ratio={0.95} customText={' '} />
            </div>
            {(flashcard === 'completed')
                ? <div className='session-complete-container flashcard-container'>
                    <label className='session-complete-label'>Congratulations, you have memorized all flashcards in this deck. ❤️</label>
                    <label className='session-complete-label'>Continue studying other decks or reset session to try again.</label>
                    <div className='button-container'>
                        <button className='studdy-button' onClick={() => window.location.reload(false)}>Back to Decks</button>
                    </div>
                </div>
                :
                <>
                    <div className='session-content'>
                        <div className='flashcard-wrapper'>
                            {(flashcard === null) ? ''
                                : <Flashcard front={flashcard.front} back={flashcard.back} key={flashcard._id} deckName={studySession.name} deckCategory={studySession.category} />}

                        </div>
                    </div>
                    <div className='button-container'>
                        <button className='confidence-button var-1 studdy-button' onClick={e => continueSession('perfect')}>😎  Perfect</button>
                        <button className='confidence-button var-2 studdy-button' onClick={e => continueSession('confident')}>😊  Simple</button>
                        <button className='confidence-button var-3 studdy-button' onClick={e => continueSession('unsure')}>🤨  Unsure</button>
                        <button className='confidence-button var-4 studdy-button' onClick={e => continueSession('difficult')}>🤯  Hard</button>
                    </div>
                </>
            }
        </div>
    )
};

export default StudySession;