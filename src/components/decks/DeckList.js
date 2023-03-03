import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'
import { CircularProgressBar, ProgressBar } from "../misc/ProgressBar";
import { Category, FlashcardStarStats, StarCategory } from "../misc/Category";
import { BsStar, BsStarHalf, BsStarFill, BsThreeDotsVertical } from 'react-icons/bs';
import { MdOutlineFeaturedPlayList, MdPauseCircleOutline, MdAutorenew, MdDeleteOutline } from 'react-icons/md';

import Axios from 'axios';

import './DeckList.css'

import { Portal } from "../misc/Portal";
import { usePopper } from 'react-popper';

import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const Deck = ({ name, progress, total, category, stage, flashcardStats, setSelectedDeck, setStudySession, deckRef, description, skeleton }) => {

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

    const [deckStat, setDeckStat] = useState(false)
    const [deckOptions, setDeckOptions] = useState(false)

    const [referenceElement, setReferenceElement] = React.useState(null);
    const [popperElement, setPopperElement] = React.useState(null);
    const { styles, attributes } = usePopper(referenceElement, popperElement, { placement: "right-start" });

    const deckOptionsFunction = async (option) => {

        try {

            if (option === 'pause') {

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

    useEffect(() => {
        if (deckOptions) {
            document.addEventListener('click', e => { if (e.path.filter(elem => elem.className === 'options-container').length === 0) { setDeckOptions(false) } }, true);
        } else {
            document.removeEventListener('click', e => { if (e.path.filter(elem => elem.className === 'options-container').length === 0) { setDeckOptions(false) } }, true);
        };
    }, [deckOptions]);

    return (
        <div className={`deck ${(stage === 4) ? 'golden' : ''}`}>
            <div className="deck-stars">{stars()}</div>
            <div className="deck-info-container">
                <span className="deck-category">
                    <h3 className="deck-name">{name || <Skeleton inline width={'12ch'} baseColor={'var(--main-container-color)'} />}</h3>
                    <Category category={category || 0} size={'25px'} />
                </span>
                <label className="deck-description">{description || <Skeleton inline width={'8ch'} baseColor={'var(--main-container-color)'} />}</label>
            </div>
            <div disabled={skeleton} className="deck-progress" onClick={e => setDeckStat(!deckStat)}>
                {!deckStat
                    ? <CircularProgressBar progress={Math.round(100 * progress / total)} size={'120px'} progressColor={'var(--palette-color-4)'} progressColor2={'var(--palette-color-4)'} progressColor3={'var(--palette-color-3)'} outerColor={'var(--palette-color-6)'} innerColor1={'var(--palette-color-2)'} innerColor2={'var(--var-container-color)'} textColor={'var(--main-text-color)'} fontSize={'24px'} ratio={0.8} golden={(stage === 4)} />
                    : <FlashcardStarStats flashcardStats={[flashcardStats.stageZero, flashcardStats.stageOne, flashcardStats.stageTwo, flashcardStats.stageThree, flashcardStats.stageFour]} />}
            </div>
            <div className="deck-session-start">
                <label>Flashcards: {total !== undefined ? total : <Skeleton inline width={'3ch'} baseColor={'var(--main-container-color)'} />}</label>
                <div className="deck-action-buttons">
                    <button disabled={skeleton} className="session-button studdy-button" onClick={e => { setSelectedDeck(deckRef); setStudySession(deckRef); }}>Session</button>
                    <span disabled={skeleton} className="icon" ref={setReferenceElement} onClick={e => setDeckOptions(!deckOptions)}><BsThreeDotsVertical /></span>
                    {!deckOptions ? '' :
                        <Portal >
                            <div className="options-container" ref={setPopperElement} style={styles.popper} {...attributes.popper} >
                                <span onClick={e => setSelectedDeck(deckRef)}><MdOutlineFeaturedPlayList className="icon" />Flashcards</span>
                                <span onClick={e => { if (window.confirm(`Are you sure you want to pause all flashcards in deck ${name}?`)) { deckOptionsFunction('pause') } }}><MdPauseCircleOutline className="icon" />Pause Deck</span>
                                <span onClick={e => { if (window.confirm(`Are you sure you want to reset all flashcards' progress in deck ${name}?\nYour profile stats and badges will not be affected.\nThis action cannot be undone.`)) { deckOptionsFunction('reset') } }}><MdAutorenew className="icon" />Reset Progress</span>
                                <span className="var danger" onClick={e => { if (window.confirm(`Are you sure you want to delete deck ${name}?\nThis action cannot be undone.`)) { deckOptionsFunction('delete') } }}><MdDeleteOutline className="icon" />Delete Deck</span>
                            </div>
                        </Portal>
                    }
                </div>
            </div>
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
            const response = await Axios.post(`${process.env.REACT_APP_SERVER_ADDRESS}/createDeck`,
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

        <div className={`deck`}>
            <div className="deck-stars"></div>
            <div className="deck-info-container">
                <span className="deck-category">
                    <input type="text" className="deck-name-input" placeholder="Title..." value={deckName} onChange={e => setDeckName(e.target.value)}></input>
                    <div onClick={updateCategory} className='category-wrapper category-filter'>
                        <Category category={deckCategory} size='25px' className="category" />
                    </div>
                </span>
                <label className="deck-description" style={{ color: 'transparent' }}>.</label>
            </div>
            <div className="deck-progress">
                <CircularProgressBar progress={0} size={'120px'} progressColor={'var(--palette-color-4)'} progressColor2={'var(--palette-color-4)'} progressColor3={'var(--palette-color-3)'} outerColor={'var(--palette-color-6)'} innerColor1={'var(--palette-color-2)'} innerColor2={'var(--var-container-color)'} textColor={'var(--main-text-color)'} fontSize={'24px'} ratio={0.8} />
            </div>
            <div className="deck-session-start">
                <label>Flashcards: 0</label>
                <div className="deck-action-buttons">
                    {(deckName !== '') ? <button className="deck-creator-button studdy-button" onClick={createDeck}>Done</button> : <button className="deck-creator-button studdy-button">Done</button>}
                    <span className="icon" ><BsThreeDotsVertical /></span>
                </div>
            </div>
        </div>

    )
}


const DeckList = ({ setSelectedDeck, setStudySession }) => {

    const getDeckList = async () => {

        try {
            //get all decks owned by logged user
            const decks = await Axios.get(`${process.env.REACT_APP_SERVER_ADDRESS}/decksByUser`, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            })

            //check if the response contains decks and no error message
            if (decks && decks.data.message !== 'Unauthorized') {
                //return the decks if we have them
                setDeckList(decks.data)
                setFilteredDeckList(decks.data)
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
    const [filteredDeckList, setFilteredDeckList] = useState([])

    const [categoryFilter, setCategoryFilter] = useState(new Array(11).fill(false))
    const [stageCategoryFilter, setStageCategoryFilter] = useState(new Array(5).fill(false))
    const [deckSearch, setDeckSearch] = useState('')

    const [newDeckPopup, setNewDeckPopup] = useState(false)

    //run getDeckList once when component renders
    useEffect(() => {
        getDeckList()
    }, [])

    const filterCategory = (category) => {
        let newFilter = [...categoryFilter];
        newFilter[category] = !newFilter[category];
        setCategoryFilter(newFilter)
    }

    const filterStageCategory = (stage) => {
        let newFilter = [...stageCategoryFilter];
        newFilter[stage] = !newFilter[stage];
        setStageCategoryFilter(newFilter)
    }

    const sortDeckList = list => list.sort((a, b) => (a.name > b.name ? 1 : -1))

    useEffect(() => {

        let newList = []

        if (categoryFilter.includes(true)) {
            categoryFilter.map((category, index) => {
                if (category) {
                    deckList.map(deck => {
                        if (deck.category === index) {
                            newList.push(deck)
                        }
                    })
                }
            })
        } else {
            newList = deckList
        }

        let newList2 = []

        if (stageCategoryFilter.includes(true)) {
            stageCategoryFilter.map((stage, index) => {
                if (stage) {
                    newList.map(deck => {
                        if (deck.stage >= index && deck.stage < index + 1) {
                            newList2.push(deck)
                        }
                    })
                }
            })
        } else {
            newList2 = newList
        }


        if (deckSearch !== null) {
            newList2 = newList2.filter(deck => deck.name.toLowerCase().includes(deckSearch.toLowerCase()))
        }

        setFilteredDeckList(newList2)

    }, [categoryFilter, stageCategoryFilter, deckSearch])

    return (
        <div className="decklist-container">
            <div className={`deck-search-container`}>
                <input disabled={!isLoaded} type="text" className={`deck-search`} placeholder="Search..." value={deckSearch} onChange={e => setDeckSearch(e.target.value)}></input>
                <div className='category-filters-container'>
                    <span className={`category-filter ${(categoryFilter[0]) ? 'active' : ''}`} onClick={e => filterCategory(0)}><Category category={0} size='32px' /></span>
                    <span className={`category-filter ${(categoryFilter[1]) ? 'active' : ''}`} onClick={e => filterCategory(1)}><Category category={1} size='32px' /></span>
                    <span className={`category-filter ${(categoryFilter[2]) ? 'active' : ''}`} onClick={e => filterCategory(2)}><Category category={2} size='32px' /></span>
                    <span className={`category-filter ${(categoryFilter[3]) ? 'active' : ''}`} onClick={e => filterCategory(3)}><Category category={3} size='32px' /></span>
                    <span className={`category-filter ${(categoryFilter[4]) ? 'active' : ''}`} onClick={e => filterCategory(4)}><Category category={4} size='32px' /></span>
                    <span className={`category-filter ${(categoryFilter[5]) ? 'active' : ''}`} onClick={e => filterCategory(5)}><Category category={5} size='32px' /></span>
                    <span className={`category-filter ${(categoryFilter[6]) ? 'active' : ''}`} onClick={e => filterCategory(6)}><Category category={6} size='32px' /></span>
                    <span className={`category-filter ${(categoryFilter[7]) ? 'active' : ''}`} onClick={e => filterCategory(7)}><Category category={7} size='32px' /></span>
                    <span className={`category-filter ${(categoryFilter[8]) ? 'active' : ''}`} onClick={e => filterCategory(8)}><Category category={8} size='32px' /></span>
                    <span className={`category-filter ${(categoryFilter[9]) ? 'active' : ''}`} onClick={e => filterCategory(9)}><Category category={9} size='32px' /></span>
                    <span className={`category-filter ${(categoryFilter[10]) ? 'active' : ''}`} onClick={e => filterCategory(10)}><Category category={10} size='32px' /></span>
                </div>
                <div className="deck-result-container">
                    <button disabled={!isLoaded} className="add-deck-button studdy-button" onClick={e => setNewDeckPopup(!newDeckPopup)}>+ NEW DECK</button>
                    <label className="found-decks-count">{deckList.length > 0 ? filteredDeckList.length : <Skeleton inline width={'2ch'} baseColor={'var(--main-container-color)'} />}  Deck(s) found</label>
                </div>
                <div className="star-filters-container">
                    <span className={`star-filter ${(stageCategoryFilter[1]) ? 'active' : ''}`} onClick={e => filterStageCategory(1)}><StarCategory stage={1} size='24px' /></span>
                    <span className={`star-filter ${(stageCategoryFilter[2]) ? 'active' : ''}`} onClick={e => filterStageCategory(2)}><StarCategory stage={2} size='24px' /></span>
                    <span className={`star-filter ${(stageCategoryFilter[3]) ? 'active' : ''}`} onClick={e => filterStageCategory(3)}><StarCategory stage={3} size='24px' /></span>
                    <span className={`star-filter ${(stageCategoryFilter[4]) ? 'active' : ''}`} onClick={e => filterStageCategory(4)}><StarCategory stage={4} size='24px' /></span>
                </div>
            </div>
            <div className="filtered-decks">
                <div className={`deck-creator-container creator-container ${newDeckPopup ? 'active' : 'inactive'}`}>
                    <DeckCreator />
                </div>
                {deckList.length > 0 ? sortDeckList(filteredDeckList).map((deck, index) => {
                    return (
                        <div className='deck-container' deck={deck} key={'div' + deck.name + index}>
                            <Deck name={deck.name} category={deck.category} total={deck.total} progress={deck.progress} stage={deck.stage} key={deck.name + index} flashcardStats={deck.flashcardStats} setSelectedDeck={setSelectedDeck} setStudySession={setStudySession} deckRef={deck} description={deck.description} />
                        </div>
                    );
                }) : [...Array(24)].map((e, i) => {
                    return <div className='deck-container' key={i}>
                        <Deck skeleton />
                    </div>
                })}
            </div>
        </div>
    )
}

export default DeckList;
export { Deck };