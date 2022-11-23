import React, { useState } from "react";
import DeckList from "./DeckList";
import ProgressBar from "../misc/ProgressBar";
import Category from "../misc/Category";
import FlashcardCreator from "./FlashcardCreator";

import './Decks.css'

const SelectedDeck = ({ deck }) => {

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
                <button className="session-start-button studdy-button">Session</button>
                <button className="studdy-button">+</button>
                <FlashcardCreator className="flashcard-creator" deck={deck} />
            </div>
        </div>
    )
}

const DeckManager = ({ selectedDeck }) => {
    return (
        <div className="deck-manager-container">
            {/* show SelectedDeck only when not null, otherwise display text and wait for deck to be selected */}
            {(selectedDeck !== null) ?
                <SelectedDeck deck={selectedDeck} className="selected-deck"></SelectedDeck>
                :
                <div className="nodeck-container">
                    <label className="nodeck-label">Please select a deck.</label>
                </div>}
        </div>
    )
}

const Decks = () => {

    const [selectedDeck, setSelectedDeck] = useState(null)

    const changeDeck = (deck) => {
        setSelectedDeck(deck)
        console.log(deck)
    }

    return (
        <div className="decks-container">
            <DeckList className="decklist" selectedDeckRef={changeDeck} />
            <DeckManager className="deckmanager" selectedDeck={selectedDeck} />
        </div>
    )
}

export default Decks;