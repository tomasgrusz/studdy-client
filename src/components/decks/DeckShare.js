import Axios from "axios";
import React, { useEffect, useState } from "react";
import { BsStarHalf, BsStarFill, BsThreeDotsVertical, BsStar } from 'react-icons/bs';
import { useNavigate } from "react-router-dom";
import { Category, FlashcardStarStats, StarCategory } from "../misc/Category";
import { CircularProgressBar } from "../misc/ProgressBar";
import './DeckShare.css'

const Deck = ({ name, progress, total, category, stage, flashcardStats, description }) => {

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

    return (
        <div className={`deck ${(stage === 4) ? 'golden' : ''}`}>
            <div className="deck-stars">{stars()}</div>
            <div className="deck-info-container">
                <span className="deck-category">
                    <h3 className="deck-name">{name}</h3>
                    <Category category={category || 0} size={'25px'} />
                </span>
                <label className="deck-description">{description}</label>
            </div>
            <div className="deck-progress" onClick={e => setDeckStat(!deckStat)}>
                {!deckStat
                    ? <CircularProgressBar progress={Math.round(100 * progress / total)} size={'120px'} progressColor={'var(--palette-color-4)'} progressColor2={'var(--palette-color-4)'} progressColor3={'var(--palette-color-3)'} outerColor={'var(--palette-color-6)'} innerColor1={'var(--palette-color-2)'} innerColor2={'var(--var-container-color)'} textColor={'var(--main-text-color)'} fontSize={'24px'} ratio={0.8} golden={(stage === 4)} />
                    : <FlashcardStarStats flashcardStats={[flashcardStats.stageZero, flashcardStats.stageOne, flashcardStats.stageTwo, flashcardStats.stageThree, flashcardStats.stageFour]} />}
            </div>
            <div className="deck-session-start">
                <label>Flashcards: {total}</label>
            </div>
        </div>
    )
}

const Flashcard = (props) => {

    const [flipped, setFlipped] = useState(false);
    const [checked, setChecked] = useState(false);

    const stars = () => {

        if (props.stage === 4) {
            return (<>
                <BsStarFill className="stage-star" />
                <BsStarFill className="stage-star" />
                <BsStarFill className="stage-star" />
            </>)
        }

        return (<>
            {Array.from({ length: props.stage }, (_, i) => <BsStarFill className="stage-star" />)}
            {(props.completed ? <BsStarFill className="stage-star" /> : <BsStar className="stage-star" />)}
            {(props.completed ? <> + <BsStar className="stage-star" /> on {new Date(props.stageDate).toLocaleDateString("en-UK")}</> : <></>)}
            {(props.paused) ? <> Paused</> : <></>}
        </>)
    }

    useEffect(() => {
        if (props.setFlipCheck && props.flipCheck === false && flipped === true) {
            props.setFlipCheck(true)
        }
    }, [flipped])

    useEffect(() => {
        if (checked) {
            props.setSelectedFlashcards(props.selectedFlashcards.concat([props.id]));
        } else {
            if (props.selectedFlashcards.length > 0) {
                props.setSelectedFlashcards(props.selectedFlashcards.filter(flashcardID => flashcardID !== props.id));
            }
        }
    }, [checked])

    useEffect(() => {
        if (props.selectedFlashcards.includes(props.id)) {
            setChecked(true)
        } else {
            setChecked(false)
        }
    }, [props.selectedFlashcards])

    return (
        <div className={`flashcard-container ${(props.stage === 4) ? 'golden' : ''}`}>
            <div className='flashcard-top' onMouseUp={e => setChecked(!checked)}>{checked}
                <div className={`flashcard-stars-container ${(props.stage === 4) ? 'golden' : ''}`}>{stars()}</div>
                <input type="checkbox" checked={checked} onChange={e => setChecked(!e.target.checked)}></input>
            </div>
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

const Flashcards = ({ deck, selectedFlashcards, setSelectedFlashcards }) => {

    const [flashcards, setFlashcards] = useState([])
    const [filteredFlashcards, setFilteredFlashcards] = useState([])
    const [flashcardSearch, setFlashcardSearch] = useState('')
    const [stageCategoryFilter, setStageCategoryFilter] = useState(new Array(5).fill(false))

    const filterStageCategory = (stage) => {
        let newFilter = [...stageCategoryFilter];
        newFilter[stage] = !newFilter[stage];
        setStageCategoryFilter(newFilter)
    }

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
            } else {
                alert('An unexpected error occured, please try again later or contact us.')
            }
        }
    }

    const selectAllFlashcards = async () => {


        if (selectedFlashcards.length === flashcards.length) {
            setSelectedFlashcards([])
        } else {
            const allFlashcards = await flashcards.map(flashcard => flashcard._id);
            setSelectedFlashcards(allFlashcards)
        }

    }

    useEffect(() => {
        if (flashcards.length < selectedFlashcards.length) {
            setSelectedFlashcards([...new Set(selectedFlashcards)])
        }
    }, [selectedFlashcards])

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
        <div className="flashcardlist-container">
            <div className="deck-search-container">
                <input type="text" className={`deck-search`} placeholder="Search..." value={flashcardSearch} onChange={e => setFlashcardSearch(e.target.value)}></input>
                <div style={{ display: 'flex' }}>
                    <label className="found-flashcards-count">{filteredFlashcards.length} Flashcard(s) found</label>
                </div>
                <div className="star-filters-container">
                    <span className={`star-filter ${(stageCategoryFilter[1]) ? 'active' : ''}`} onClick={e => filterStageCategory(1)}><StarCategory stage={1} size='24px' /></span>
                    <span className={`star-filter ${(stageCategoryFilter[2]) ? 'active' : ''}`} onClick={e => filterStageCategory(2)}><StarCategory stage={2} size='24px' /></span>
                    <span className={`star-filter ${(stageCategoryFilter[3]) ? 'active' : ''}`} onClick={e => filterStageCategory(3)}><StarCategory stage={3} size='24px' /></span>
                    <span className={`star-filter ${(stageCategoryFilter[4]) ? 'active' : ''}`} onClick={e => filterStageCategory(4)}><StarCategory stage={4} size='24px' /></span>
                </div>
                <div style={{ display: 'flex' }}>
                    <label className="found-flashcards-count">{selectedFlashcards.length} Flashcard(s) selected</label>
                    <button className="studdy-button var" onClick={e => selectAllFlashcards()}>Select All</button>
                </div>
            </div>
            <div className="flashcard-list">
                {filteredFlashcards.map(flashcard => {
                    return <Flashcard front={flashcard.front} back={flashcard.back} key={flashcard._id} id={flashcard._id} stage={flashcard.stage} completed={flashcard.completed} stageDate={flashcard.stageDate} paused={flashcard.paused} deck={deck} selectedFlashcards={selectedFlashcards || []} setSelectedFlashcards={setSelectedFlashcards} checked={flashcards.length === selectedFlashcards.length} />
                })}
            </div>
        </div>
    )
}

const Friend = ({ friend, lastOnline, selectedFriends, setSelectedFriends }) => {

    const [checked, setChecked] = useState(false)

    const online = new Date(new Date(Date.parse(lastOnline)).getTime() + 5 * 60000) > new Date();

    useEffect(() => {
        if (checked) {
            setSelectedFriends(selectedFriends.concat([friend]));
        } else {
            if (selectedFriends.length > 0) {
                setSelectedFriends(selectedFriends.filter(selectedFriend => selectedFriend !== friend));
            }
        }
    }, [checked])

    return (
        <div className="friend-container">
            <label className='friend'>{friend}</label>
            <label className={`online-status ${online ? 'online' : 'offline'}`}>{online ? 'Online' : 'Offline'}</label>
            <input type="checkbox" checked={checked} onChange={e => setChecked(!checked)}></input>
        </div>
    )
}

const FriendsList = ({ friends, selectedFriends, setSelectedFriends }) => {

    return (
        <div className='friends-list-container'>
            <label>{selectedFriends.length} Friend(s) selected</label>
            <div className='friends'>
                {friends.map(friend => {
                    return <Friend friend={friend.username} lastOnline={friend.lastOnline} selectedFriends={selectedFriends} setSelectedFriends={setSelectedFriends} />
                })}
            </div>
        </div>
    )

}

const DeckShare = ({ deck }) => {

    const [profile, setProfile] = useState({})
    const [ready, setReady] = useState(false)
    const [selectedFlashcards, setSelectedFlashcards] = useState([]);
    const [selectedFriends, setSelectedFriends] = useState([]);

    const navigate = useNavigate();

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
            } else {
                //otherwise return undefined
                return undefined
            }
        } catch (e) {
            console.log(e.message)

        }
    }

    const shareDeck = async () => {

        if (ready) {
            try {
                //get logged user
                const response = await Axios.post(`${process.env.REACT_APP_SERVER_ADDRESS}/shareDeck`, {
                    deck: deck,
                    flashcards: selectedFlashcards,
                    friends: selectedFriends
                }, {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    withCredentials: true
                })

                //check if the response contains data and no error message
                if (response.data.message === 'Success') {
                    //return the data if we have it
                    alert(`Successfully shared deck ${deck.name} to ${selectedFriends.length} friend(s).`);
                    navigate('/', { replace: true });
                } else {
                    //otherwise return undefined
                    return undefined
                }
            } catch (e) {
                console.log(e.message)

            }
        } else {
            alert('You need to select flashcards and recipients before sharing!')
        }
    }

    useEffect(() => {
        getProfile()
    }, [])

    useEffect(() => {
        setReady(selectedFlashcards.length > 0 && selectedFriends.length > 0);
    }, [selectedFlashcards, selectedFriends])

    return (
        <div className='deck-share-container'>
            <Flashcards deck={deck} selectedFlashcards={selectedFlashcards} setSelectedFlashcards={setSelectedFlashcards} />
            <div className='deck-share-subcontainer'>
                {deck ? <Deck name={deck.name} category={deck.category} total={deck.total} progress={deck.progress} stage={deck.stage} flashcardStats={deck.flashcardStats} description={deck.description} /> : ''}
                <button disabled={!ready} className={`studdy-button ${!ready ? 'var' : ''}`} onClick={e => shareDeck()}>Share</button>
                <FriendsList friends={profile.friends || []} selectedFriends={selectedFriends} setSelectedFriends={setSelectedFriends} />
            </div>
        </div>
    )
}

export default DeckShare;