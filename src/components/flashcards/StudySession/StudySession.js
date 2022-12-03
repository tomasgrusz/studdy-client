
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';
import './StudySession.css'

import ProgressBar from '../../misc/ProgressBar';
import Category from '../../misc/Category';
import { Flashcard } from '../Flashcard';

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
        <div className='session-container'>
            <div className="selected-deck-info-wrapper">
                <div className="deck-info-container">
                    <h3 className="deck-name">{session.name}</h3>
                    <Category category={session.category} size='25px' />
                </div>
                <ProgressBar color={'#8bb174'} height={20} progress={studySession.progress * 100 / studySession.total} text={`${studySession.progress}/${studySession.total}`} radius={50} />
            </div>
            {(flashcard === 'completed')
                ? <div className='session-complete-container'>
                    <label>Congratulations, you have memorized all flashcards in this deck. ❤️</label>
                    <label>Continue studying other decks or reset session to try again.</label>
                    <button className='studdy-button' onClick={() => window.location.reload(false)}>Back to Decks</button>
                </div>
                : <div className='flashcard-wrapper'>
                    {(flashcard === null) ? ''
                        : <Flashcard front={flashcard.front} back={flashcard.back} key={flashcard._id} />}
                    <div className='button-container'>
                        <button className='confidence-button studdy-button' onClick={e => continueSession('perfect')}>Perfect</button>
                        <button className='confidence-button studdy-button' onClick={e => continueSession('confident')}>Confident</button>
                        <button className='confidence-button studdy-button' onClick={e => continueSession('pass')}>Pass</button>
                        <button className='confidence-button studdy-button' onClick={e => continueSession('unsure')}>Unsure</button>
                        <button className='confidence-button studdy-button' onClick={e => continueSession('difficult')}>Difficult</button>
                    </div>
                </div>
            }
        </div>
    )
};

export default StudySession;