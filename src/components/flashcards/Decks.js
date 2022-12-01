import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';
import DeckList from "./DeckList";
import ProgressBar from "../misc/ProgressBar";
import Category from "../misc/Category";
import FlashcardCreator from "./FlashcardCreator";
import { Flashcard } from "./Flashcard";

import StudySession from "./StudySession/StudySession";

import './Decks.css'

const SelectedDeck = ({ deck, startStudySession }) => {

    const [flashcards, setFlashcards] = useState([])
    const navigate = useNavigate();

    //function for retrieving deck's flashcards
    const getFlashcards = async () => {
        const response = await Axios.post('http://localhost:3001/getFlashcards', {
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

    //execute getFlashcards whenever the deck changes
    useEffect(() => {
        getFlashcards()
    }, [deck])

    return (
        <div className="selected-deck-container">
            <div className="selected-deck-info-wrapper">
                <div className="deck-info-container">
                    <h3 className="deck-name">{deck.name}</h3>
                    <Category category={deck.category} size='25px' />
                </div>
                <ProgressBar color={'#8bb174'} height={20} progress={deck.progress * 100 / deck.total} text={`${deck.progress}/${deck.total}`} radius={50} />
            </div>
            <div className="selected-deck-session-wrapper">
                <button className="session-start-button studdy-button" onClick={e => startStudySession(deck)}>Session</button>
                <button className="studdy-button">+</button>
                <FlashcardCreator className="flashcard-creator" deck={deck} />
                <div className="flashcard-list">
                    {flashcards.map(flashcard => {
                        return <Flashcard front={flashcard.front} back={flashcard.back} key={flashcard._id} />
                    })}
                </div>
            </div>
        </div>
    )
}

const DeckManager = ({ selectedDeck, startStudySession }) => {

    return (
        <div className="deck-manager-container">
            {/* show SelectedDeck only when not null, otherwise display text and wait for deck to be selected */}
            {(selectedDeck !== null) ?
                <SelectedDeck deck={selectedDeck} className="selected-deck" startStudySession={startStudySession}></SelectedDeck>
                :
                <div className="nodeck-container">
                    <label className="nodeck-label">Please select a deck.</label>
                </div>}
        </div>
    )
}

const Decks = () => {

    const [selectedDeck, setSelectedDeck] = useState(null)
    const [studySession, setStudySession] = useState(null)

    const changeDeck = (deck) => {
        setSelectedDeck(deck)
    }

    const startStudySession = () => {
        setStudySession(selectedDeck)
    }

    return (
        <>
            {(studySession === null)
                ? <div className="decks-container">
                    <DeckList className="decklist" selectedDeckRef={changeDeck} />
                    <DeckManager className="deckmanager" selectedDeck={selectedDeck} startStudySession={startStudySession} />
                </div>
                : <StudySession session={studySession} />
            }
        </>
    )
}

export default Decks;