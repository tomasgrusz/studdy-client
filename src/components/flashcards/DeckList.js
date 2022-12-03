import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'
import ProgressBar from "../misc/ProgressBar";
import Category from "../misc/Category";
import { BsStar, BsStarHalf, BsStarFill } from 'react-icons/bs'

import Axios from 'axios';

import './DeckList.css'

const Deck = ({ name, progress, total, category, stage }) => {

    const stars = () => {
        switch (stage) {
            case 0.5:
                return <span><BsStarHalf className="stage-star" /></span>
            case 1:
                return <span><BsStarFill className="stage-star" /></span>
            case 1.5:
                return <span><BsStarFill className="stage-star" /><BsStarHalf className="stage-star" /></span>
            case 2:
                return <span><BsStarFill className="stage-star" /><BsStarFill className="stage-star" /></span>
            case 2.5:
                return <span><BsStarFill className="stage-star" /><BsStarFill className="stage-star" /><BsStarHalf className="stage-star" /></span>
            case 3:
            case 3.5:
            case 4:
                return <span><BsStarFill className="stage-star" /><BsStarFill className="stage-star" /><BsStarFill className="stage-star" /></span>
            default:
                return <></>
        }
    }

    return (
        <div className={`deck ${(stage === 4) ? 'completed' : ''}`}>
            <div className="deck-info-container">
                <h3 className="deck-name">{name} {stars()}</h3>
                <Category category={category} size='25px' />
            </div>
            <ProgressBar color={'#8bb174'} height={20} progress={progress * 100 / total} text={`${progress}/${total}`} radius={50} />
        </div>
    )
}

const DeckCreator = () => {

    const [deckName, setDeckName] = useState('')
    const [deckCategory, setDeckCategory] = useState(0)
    const navigate = useNavigate();

    const updateCategory = () => {
        if (deckCategory < 10) {
            setDeckCategory(deckCategory + 1)
        } else {
            setDeckCategory(0)
        }
    }

    const createDeck = async () => {
        //check for empty deck name
        if (deckName !== '') {
            const response = await Axios.post('http://localhost:3001/createDeck',
                {
                    name: deckName,
                    category: deckCategory
                }, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            })
            console.log(response)
            //check for successful Deck creation
            if (response.data.message === 'Success') {
                alert('Your Deck has been created! Please refresh your page.')

            } else if (response.data.message === 'Unauthorized') {
                //sign user out when we receive unauthorized message (possibly because of session expiry)
                alert('Your session has expired and you have been automatically signed out!')
                navigate('/sign-out')
            } else {
                console.log(response.data.message);
                alert('Something wrong happened, please try again later or contact support.')
            }

        } else {
            alert('Your Deck is missing a title!')
        }
    }

    return (
        <div className={`deck deck-creator ${(deckName !== '' || deckCategory > 0) ? 'focused' : ''}`}>
            <div className="deck-info-container">
                <input type="text" className="deck-name-input" placeholder="Create a new Deck.." value={deckName} onChange={e => setDeckName(e.target.value)}></input>
                {/* wrapped in a div to allow onClick events */}
                <div onClick={updateCategory} className='category-wrapper'>
                    <Category category={deckCategory} size='25px' className="category" />
                </div>
            </div>
            {(deckName !== '') ? <button className="deck-creator-button studdy-button" onClick={createDeck}>Done</button> : <></>}
        </div>
    )
}


const DeckList = ({ selectedDeckRef }) => {

    const getDeckList = async () => {

        try {
            //get all decks owned by logged user
            const decks = await Axios.get('http://localhost:3001/decksByUser', {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            })

            //check if the response contains decks and no error message
            if (decks && decks.data.message !== 'Unauthorized') {
                //return the decks if we have them
                setDeckList(decks.data)
            } else {
                //otherwise return undefined
                return []
            }
        } catch (e) {
            console.log(e.message)
        } finally {
            setLoaded(true)
        }
    }

    const [isLoaded, setLoaded] = useState(false)
    const [deckList, setDeckList] = useState([])
    const [selectedDeck, setSelectedDeck] = useState(null)

    useEffect(() => {
        selectedDeckRef(selectedDeck)
    }, [selectedDeck])

    //run getDeckList once when component renders
    useEffect(() => {
        getDeckList()
    }, [])

    const updateSelectedDeck = (deck) => {
        if (deck === selectedDeck) {
            setSelectedDeck(null)
        } else {
            setSelectedDeck(deck)
        }
    }

    return (
        <div className="decklist-container">
            {isLoaded ?
                <div className="decklist-list">
                    <DeckCreator />
                    {deckList.map((deck, index) => {
                        return (
                            <div className={`deck-container ${(selectedDeck === deck) ? 'selected' : ''}`} deck={deck} onClick={e => updateSelectedDeck(deck)} key={'div' + deck.name + index}>
                                <Deck name={deck.name} category={deck.category} total={deck.total} progress={deck.progress} stage={deck.stage} key={deck.name + index} />
                            </div>
                        );
                    })}
                </div>
                : <></>
            }
        </div>
    )

}

export default DeckList;
export { Deck };