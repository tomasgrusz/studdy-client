import { useState } from 'react'
import './Flashcard.css'


const Flashcard = (props) => {

    const [flipped, setFlipped] = useState(false)

    return (
        <div className='flashcard-container' onClick={e => setFlipped(!flipped)}>
            {flipped
                ? <div className='flashcard-back'>{props.back}</div>
                : <div className='flashcard-front' dangerouslySetInnerHTML={{ __html: props.front }}></div>}
        </div>
    )
}

export { Flashcard }