import { useState, useEffect } from 'react'
import { BsStar, BsStarFill, BsThreeDotsVertical } from 'react-icons/bs';
import { MdPauseCircleOutline, MdAutorenew, MdDeleteOutline } from 'react-icons/md';
import { HiPencilAlt } from 'react-icons/hi';
import { Category } from '../misc/Category';

import { Portal } from '../misc/Portal';
import { usePopper } from 'react-popper'

import './Flashcard.css'


const Flashcard = (props) => {

    const [flipped, setFlipped] = useState(false)

    const stars = (<>
        {Array.from({ length: props.stage - 1 }, (_, i) => <BsStarFill className="stage-star" />)}
        {(props.stage === 0 ? <BsStar className="stage-star" /> : <></>)}
        {(props.stage < 4 && props.stage > 0) ? <BsStarFill className="stage-star" /> : <></>}
    </>)

    const [flashcardOptions, setFlashcardOptions] = useState(false)

    const [referenceElement, setReferenceElement] = useState(null);
    const [popperElement, setPopperElement] = useState(null);
    const { styles, attributes } = usePopper(referenceElement, popperElement, { placement: "right-start" });

    useEffect(() => {
        if (flashcardOptions) {
            document.addEventListener('click', e => { if (e.path.filter(elem => elem.className === 'options-container').length === 0) { setFlashcardOptions(false) } }, true);
        } else {
            document.removeEventListener('click', e => { if (e.path.filter(elem => elem.className === 'options-container').length === 0) { setFlashcardOptions(false) } }, true);
        };
    }, [flashcardOptions]);

    return (
        <div className={`flashcard-container ${(props.stage === 4) ? 'golden' : ''}`}>
            <div className='flashcard-top'>
                <div className='flashcard-stars-container'>{stars}</div>
                <span className={`icon ${props.deckName ? 'session' : ''}`} ref={setReferenceElement} onClick={e => setFlashcardOptions(!flashcardOptions)}><BsThreeDotsVertical /></span>
                {!flashcardOptions ? '' :
                    <Portal >
                        <div className="options-container" ref={setPopperElement} style={styles.popper} {...attributes.popper} >
                            <span><HiPencilAlt className="icon" />Edit</span>
                            <span><MdPauseCircleOutline className="icon" />Pause</span>
                            <span><MdAutorenew className="icon" />Reset</span>
                            <span className="var danger"><MdDeleteOutline className="icon" />Delete</span>
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
                    ? <div className='flashcard-back'>{props.back}</div>
                    : <div className='flashcard-front' dangerouslySetInnerHTML={{ __html: props.front }}></div>
                }
            </div>
        </div>
    )
}

export { Flashcard }