import './Flashcard.css'


const Flashcard = (props) => {


    return (
        <div className='flashcard-container'>
            <div className="flashcard-content" dangerouslySetInnerHTML={{ __html: props.html }}></div>
        </div>
    )
}

export { Flashcard }