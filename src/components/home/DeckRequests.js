import './DeckRequests.css';
import { useEffect, useState } from 'react';
import { Category } from '../misc/Category';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Flashcard = (props) => {

    const [flipped, setFlipped] = useState(false)

    return (
        <div className={`flashcard-container ${(props.stage === 4) ? 'golden' : ''}`}>
            <></>
            {(props.deckName && props.deckCategory)
                ? <span className="deck-category">
                    <h3 className="deck-name">{props.deckName}</h3>
                    <Category category={props.deckCategory} size={'25px'} />
                </span>
                : <></>}
            <div className='flashcard-bottom' onClick={e => setFlipped(!flipped)}>
                {flipped
                    ? <div className='flashcard-back' dangerouslySetInnerHTML={{ __html: props.back }}></div>
                    : <div className='flashcard-front' dangerouslySetInnerHTML={{ __html: props.front }}></div>
                }
            </div>
        </div>
    )
}

const DeckRequest = ({ deckRequest }) => {

    const [category, setCategory] = useState(deckRequest.category);
    const navigate = useNavigate();

    const reactRequest = async (option) => {

        const response = await Axios.post(`${process.env.REACT_APP_SERVER_ADDRESS}/shareDeckReact`, {
            deck: deckRequest,
            category: category,
            option: option
        }, {
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true
        })
        if (response.data.message === 'Success') {

            navigate('/flashcards', { replace: true });
        } else {
            alert('An unexpected error occured, please try again later or contact us.');
            navigate('/', { replace: true });
        }

    }

    return (
        <div className="flashcardlist-container">
            <div className='deck-request-top'>
                <div className='deck-request-deck'>
                    <span className="deck-category">
                        <label className="deck-name-input deck-name">{deckRequest.name}</label>
                        <span className='category-wrapper category-filter' onClick={e => {
                            if (category === 10) {
                                setCategory(0)
                            } else {
                                setCategory(category + 1)
                            }
                        }}>
                            <Category category={category} size={'25px'} />
                        </span>
                    </span>
                    <label>Flashcards: {deckRequest.flashcards.length}</label>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <button className='studdy-button' onClick={e => reactRequest('confirm')}>Confirm</button>
                    <button className='studdy-button var danger' onClick={e => reactRequest('delete')}>Delete</button>
                </div>
            </div>
            <div className="flashcard-list">
                {deckRequest.flashcards.map(flashcard => {
                    return <Flashcard front={flashcard.front} back={flashcard.back} key={flashcard._id} id={flashcard._id} stage={flashcard.stage} completed={flashcard.completed} stageDate={flashcard.stageDate} paused={flashcard.paused} deck={deckRequest} />
                })}
            </div>
        </div>
    )
}

const DeckRequests = ({ sharedDecks, setDeckRequest }) => {

    const navigate = useNavigate();

    const reactRequest = async (deckRequest, option) => {

        const response = await Axios.post(`${process.env.REACT_APP_SERVER_ADDRESS}/shareDeckReact`, {
            deck: deckRequest,
            category: deckRequest.category,
            option: option
        }, {
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true
        })
        if (response.data.message === 'Success') {

            navigate('/flashcards', { replace: true });
        } else {
            alert('An unexpected error occured, please try again later or contact us.');
            navigate('/', { replace: true });
        }

    }

    return (
        <div className='deck-requests-container'>
            {sharedDecks.map(sharedDeck => {
                return (
                    <div className='deck-request'>
                        <label><b>{sharedDeck.owner}</b> has shared a deck <b>{sharedDeck.name}</b> with you!</label>
                        <button className='studdy-button var' onClick={e => setDeckRequest(sharedDeck)}>Show</button>
                        <button className='studdy-button var danger' onClick={e => reactRequest(sharedDeck, 'delete')}>Delete</button>
                    </div>
                )
            })}
        </div>
    )
}

export { DeckRequests, DeckRequest }