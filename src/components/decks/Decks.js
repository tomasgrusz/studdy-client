import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';
import { BsStar, BsStarHalf, BsStarFill } from 'react-icons/bs';

import DeckList from "./DeckList";
import { CircularProgressBar, ProgressBar } from "../misc/ProgressBar";
import { Category, FlashcardStarStats, StarCategory } from "../misc/Category";
import FlashcardCreator from "./FlashcardCreator";
import { Flashcard } from "./Flashcard";

import StudySession from "./StudySession/StudySession";

import './Decks.css'

const Deck = ({ name, progress, total, category, stage, flashcardStats, setStudySession, deckRef, description }) => {

    const stars = () => {
        switch (stage) {
            case 0.5:
                return <span><BsStarHalf className="stage-star-deck stage-star" /></span>
            case 1:
                return <span><BsStarFill className="stage-star-deck stage-star" /></span>
            case 1.5:
                return <span><BsStarFill className="stage-star-deck stage-star" /><BsStarHalf className="stage-star-deck stage-star" /></span>
            case 2:
                return <span><BsStarFill className="stage-star-deck stage-star" /><BsStarFill className="stage-star-deck stage-star" /></span>
            case 2.5:
                return <span><BsStarFill className="stage-star-deck stage-star" /><BsStarFill className="stage-star-deck stage-star" /><BsStarHalf className="stage-star-deck stage-star" /></span>
            case 3:
            case 3.5:
            case 4:
                return <span><BsStarFill className="stage-star-deck stage-star" /><BsStarFill className="stage-star-deck stage-star" /><BsStarFill className="stage-star-deck stage-star" /></span>
            default:
                return <></>
        }
    }

    const [deckName, setDeckName] = useState(name)

    const deckOptions = async (option) => {

        try {

            if (option === 'rename') {

                if (deckName === name) {
                    alert('Deck name has not changed, please try again.')
                    return
                }

                const response = await Axios.post(`${process.env.REACT_APP_SERVER_ADDRESS}/deckOptions`, {
                    deck: deckRef,
                    option: 'rename',
                    name: deckName
                }, {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    withCredentials: true
                })

                if (response && response.data.message === 'Success') {

                    alert('Successfully renamed deck.')
                } else {

                    alert('An error occured, please try again or contact us.')
                }


            } else if (option === 'pause') {

                const response = await Axios.post(`${process.env.REACT_APP_SERVER_ADDRESS}/deckOptions`, {
                    deck: deckRef,
                    option: 'pause'
                }, {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    withCredentials: true
                })

                if (response && response.data.message === 'Success') {

                    alert(`Successfully paused deck ${name}.`)
                } else {

                    alert('An error occured, please try again or contact us.')
                }

            } else if (option === 'reset') {

                const response = await Axios.post(`${process.env.REACT_APP_SERVER_ADDRESS}/deckOptions`, {
                    deck: deckRef,
                    option: 'reset'
                }, {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    withCredentials: true
                })

                if (response && response.data.message === 'Success') {

                    alert(`Successfully reset progress of deck ${name}.`)
                } else {

                    alert('An error occured, please try again or contact us.')
                }

            } else if (option === 'delete') {

                const response = await Axios.post(`${process.env.REACT_APP_SERVER_ADDRESS}/deckOptions`, {
                    deck: deckRef,
                    option: 'delete'
                }, {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    withCredentials: true
                })

                if (response && response.data.message === 'Success') {

                    alert(`Successfully deleted deck ${name}.`)
                } else {

                    alert('An error occured, please try again or contact us.')
                }

            } else {
                alert('Unexpected error occured, please contact us.')
            }

        } catch (e) {
            console.log(e.message)
        }
    }

    return (
        <div className={`deck ${(stage === 4) ? 'golden' : ''}`}>
            <div className="deck-stars">{stars()}</div>
            <div className="deck-info-container">
                <span className="deck-category">
                    <input type="text" className="deck-name-input deck-name" value={deckName} onChange={e => setDeckName(e.currentTarget.value)}></input>
                    <Category category={category} size={'25px'} />
                </span>
                <label className="deck-description">{description}</label>
            </div>
            <div className="deck-progress deck-var">
                <CircularProgressBar progress={Math.round(100 * progress / total)} size={'120px'} progressColor={'var(--palette-color-4)'} progressColor2={'var(--palette-color-4)'} progressColor3={'var(--palette-color-3)'} outerColor={'var(--palette-color-6)'} innerColor1={'var(--palette-color-2)'} innerColor2={'var(--var-container-color)'} textColor={'var(--main-text-color)'} fontSize={'24px'} ratio={0.8} golden={(stage === 4)} />
                <FlashcardStarStats flashcardStats={[flashcardStats.stageZero, flashcardStats.stageOne, flashcardStats.stageTwo, flashcardStats.stageThree, flashcardStats.stageFour]} />
                <div className="deck-options-container">
                    <button className="deck-option studdy-button var" onClick={e => deckOptions('rename')}>Rename</button>
                    <button className="deck-option studdy-button var" onClick={e => { if (window.confirm(`Are you sure you want to pause all flashcards in deck ${name}?`)) { deckOptions('pause') } }}>Pause</button>
                    <button className="deck-option studdy-button var" onClick={e => { if (window.confirm(`Are you sure you want to reset all flashcards' progress in deck ${name}?\nYour profile stats and badges will not be affected.\nThis action cannot be undone.`)) { deckOptions('reset') } }}>Reset</button>
                    <button className="deck-option studdy-button var danger" onClick={e => { if (window.confirm(`Are you sure you want to delete deck ${name}?\nThis action cannot be undone.`)) { deckOptions('delete') } }}>Delete</button>
                </div>
            </div>
            <div className="deck-session-start">
                <label>Flashcards: {total}</label>
                <button className="session-button studdy-button" onClick={e => setStudySession(deckRef)}>Session</button>
            </div>
        </div>
    )
}

const SelectedDeck = ({ deck, setStudySession }) => {

    const [flashcards, setFlashcards] = useState([])
    const [filteredFlashcards, setFilteredFlashcards] = useState([])
    const [flashcardSearch, setFlashcardSearch] = useState('')
    const [stageCategoryFilter, setStageCategoryFilter] = useState(new Array(5).fill(false))

    const [newFlashcardPopup, setNewFlashcardPopup] = useState(false)

    const filterStageCategory = (stage) => {
        let newFilter = [...stageCategoryFilter];
        newFilter[stage] = !newFilter[stage];
        setStageCategoryFilter(newFilter)
    }

    const navigate = useNavigate();

    //function for retrieving deck's flashcards
    const getFlashcards = async () => {
        if (deck !== null) {
            const response = await Axios.post(`${process.env.REACT_APP_SERVER_ADDRESS}/getFlashcards`, {
                deck: deck,
            }, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            })
            if (response.data.message === 'Success') {

                setFlashcards(response.data.flashcards)

            } else if (response.data.message === 'Unauthorized') {
                alert('Your session is outdated, you will be redirected to the login page to sign in again.')
                navigate('/sign-out')
            } else {
                alert('An unexpected error occured, please try again later or contact us.')
            }
        }
    }

    //execute getFlashcards whenever the deck changes
    useEffect(() => {
        getFlashcards()
    }, [deck])

    useEffect(() => {

        let newList = []

        if (stageCategoryFilter.includes(true)) {
            stageCategoryFilter.map((stage, index) => {
                if (stage) {
                    flashcards.map(flashcard => {
                        if (flashcard.stage === index || (flashcard.stage === index - 1 && flashcard.completed)) {
                            newList.push(flashcard)
                        }
                    })
                }
            })
        } else {
            newList = flashcards
        }


        if (flashcardSearch !== null) {
            newList = newList.filter(flashcard => (flashcard.front.toLowerCase().includes(flashcardSearch.toLowerCase()) || flashcard.back.toLowerCase().includes(flashcardSearch.toLowerCase())))
        }

        setFilteredFlashcards(newList)

    }, [stageCategoryFilter, flashcardSearch, flashcards])

    return (
        <div className="selected-deck-container">
            <div className="selected-deck">
                <Deck name={deck.name} category={deck.category} total={deck.total} progress={deck.progress} stage={deck.stage} flashcardStats={deck.flashcardStats} setStudySession={setStudySession} deckRef={deck} description={deck.description} />
            </div>
            <div className="flashcardlist-container">
                <div className="deck-search-container">
                    <input type="text" className={`deck-search`} placeholder="Search..." value={flashcardSearch} onChange={e => setFlashcardSearch(e.target.value)}></input>
                    <label className="found-flashcards-count">{filteredFlashcards.length} Flashcard(s) found</label>
                    <div className="star-filters-container">
                        <span className={`star-filter ${(stageCategoryFilter[1]) ? 'active' : ''}`} onClick={e => filterStageCategory(1)}><StarCategory stage={1} size='24px' /></span>
                        <span className={`star-filter ${(stageCategoryFilter[2]) ? 'active' : ''}`} onClick={e => filterStageCategory(2)}><StarCategory stage={2} size='24px' /></span>
                        <span className={`star-filter ${(stageCategoryFilter[3]) ? 'active' : ''}`} onClick={e => filterStageCategory(3)}><StarCategory stage={3} size='24px' /></span>
                        <span className={`star-filter ${(stageCategoryFilter[4]) ? 'active' : ''}`} onClick={e => filterStageCategory(4)}><StarCategory stage={4} size='24px' /></span>
                    </div>
                    <button className="add-flashcards-button studdy-button" onClick={e => setNewFlashcardPopup(!newFlashcardPopup)}>+ NEW FLASHCARD(S)</button>
                </div>
                <div className="flashcard-list">
                    <div className={`deck-creator-container creator-container flashcard-container ${newFlashcardPopup ? 'active' : 'inactive'}`}>
                        <FlashcardCreator deck={deck} />
                    </div>
                    {filteredFlashcards.map(flashcard => {
                        return <Flashcard front={flashcard.front} back={flashcard.back} key={flashcard._id} id={flashcard._id} stage={flashcard.stage} completed={flashcard.completed} stageDate={flashcard.stageDate} paused={flashcard.paused} deck={deck} />
                    })}
                </div>
            </div>
        </div>
    )
}

const Decks = () => {

    const [selectedDeck, setSelectedDeck] = useState(null)
    const [studySession, setStudySession] = useState(null)

    return (
        <>
            {(studySession === null)
                ? <div className='decks-container'>
                    {selectedDeck
                        ? <SelectedDeck deck={selectedDeck} setStudySession={setStudySession} />
                        : <DeckList setSelectedDeck={setSelectedDeck} setStudySession={setStudySession} />}
                </div>
                : <StudySession session={studySession} />
            }
        </>
    )
}

export default Decks;