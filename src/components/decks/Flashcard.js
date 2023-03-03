import { useState, useEffect } from 'react'
import { BsStar, BsStarFill, BsThreeDotsVertical } from 'react-icons/bs';
import { MdPauseCircleOutline, MdAutorenew, MdDeleteOutline } from 'react-icons/md';
import { Category } from '../misc/Category';

import { Portal } from '../misc/Portal';
import { usePopper } from 'react-popper'

import useKeyPress from '../misc/useKeyPress';

import './Flashcard.css'
import Axios from 'axios';


const Flashcard = (props) => {

    const spacePress = useKeyPress(' ');

    useEffect(() => {
        async function handlePress() {
            if (spacePress) {
                await setFlipped(!flipped)
            }
        }
        handlePress()
    }, [spacePress])

    const [flipped, setFlipped] = useState(false)

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

    const [flashcardOptions, setFlashcardOptions] = useState(false)

    const [referenceElement, setReferenceElement] = useState(null);
    const [popperElement, setPopperElement] = useState(null);
    const { styles, attributes } = usePopper(referenceElement, popperElement, { placement: "right-start" });

    const flashcardOptionsFunction = async (option) => {

        try {

            if (option === 'rename') {


            } else if (option === 'pause') {

                const response = await Axios.post(`${process.env.REACT_APP_SERVER_ADDRESS}/flashcardOptions`, {
                    deck: props.deck,
                    flashcardID: props.id,
                    option: 'pause'
                }, {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    withCredentials: true
                })

                if (response && response.data.message === 'Success') {

                    alert(`Successfully paused flashcard.`)
                } else {

                    alert('An error occured, please try again or contact us.')
                }

            } else if (option === 'reset') {

                const response = await Axios.post(`${process.env.REACT_APP_SERVER_ADDRESS}/flashcardOptions`, {
                    deck: props.deck,
                    flashcardID: props.id,
                    option: 'reset'
                }, {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    withCredentials: true
                })

                if (response && response.data.message === 'Success') {

                    alert(`Successfully reset progress of flashcard.`)
                } else {

                    alert('An error occured, please try again or contact us.')
                }

            } else if (option === 'delete') {

                const response = await Axios.post(`${process.env.REACT_APP_SERVER_ADDRESS}/flashcardOptions`, {
                    deck: props.deck,
                    flashcardID: props.id,
                    option: 'delete'
                }, {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    withCredentials: true
                })

                if (response && response.data.message === 'Success') {

                    alert(`Successfully deleted flashcard.`)
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
        if (flashcardOptions) {
            document.addEventListener('click', e => { if (e.path.filter(elem => elem.className === 'options-container').length === 0) { setFlashcardOptions(false) } }, true);
        } else {
            document.removeEventListener('click', e => { if (e.path.filter(elem => elem.className === 'options-container').length === 0) { setFlashcardOptions(false) } }, true);
        };
    }, [flashcardOptions]);

    useEffect(() => {
        if (props.setFlipCheck && props.flipCheck === false && flipped === true) {
            props.setFlipCheck(true)
        }
    }, [flipped])

    return (
        <div className={`flashcard-container ${(props.stage === 4) ? 'golden' : ''}`}>
            <div className='flashcard-top'>
                <div className={`flashcard-stars-container ${(props.stage === 4) ? 'golden' : ''}`}>{stars()}</div>
                <span className={`icon ${props.deckName ? 'session' : ''}`} ref={setReferenceElement} onClick={e => setFlashcardOptions(!flashcardOptions)}><BsThreeDotsVertical /></span>
                {!flashcardOptions ? '' :
                    <Portal >
                        <div className="options-container" ref={setPopperElement} style={styles.popper} {...attributes.popper} >
                            <span onClick={e => { if (window.confirm(`Are you sure you want to pause the flashcard?`)) { flashcardOptionsFunction('pause') } }}><MdPauseCircleOutline className="icon" />Pause</span>
                            <span onClick={e => { if (window.confirm(`Are you sure you want to reset flashcard's progress?\nYour profile stats and badges will not be affected.\nThis action cannot be undone.`)) { flashcardOptionsFunction('reset') } }}><MdAutorenew className="icon" />Reset</span>
                            <span className="var danger" onClick={e => { if (window.confirm(`Are you sure you want to delete the flashcard?\nThis action cannot be undone.`)) { flashcardOptionsFunction('delete') } }}><MdDeleteOutline className="icon" />Delete</span>
                        </div>
                    </Portal>
                }
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

export { Flashcard }