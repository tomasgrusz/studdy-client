import React, { useRef, useState } from 'react';
import { EditorState, RichUtils } from 'draft-js';
import Editor from 'draft-js-plugins-editor'
import { stateToHTML } from 'draft-js-export-html'
import Axios from 'axios';
import { Flashcard } from './Flashcard';
import { RiEdit2Fill } from 'react-icons/ri'

import 'draft-js/dist/Draft.css';
import './FlashcardCreator.css';

const highlightPlugin = {
    customStyleMap: {
        HIGHLIGHT: {
            background: "#fffe0d"
        }
    },
    keyBindingFn: e => {
        if (e.metaKey && e.key === "h") {
            return "highlight";
        }
    },
    handleKeyCommand: (command, editorState, { setEditorState }) => {
        if (command === "highlight") {
            setEditorState(RichUtils.toggleInlineStyle(editorState, "HIGHLIGHT"));
            return true;
        }
    }
}

const FlashcardCreator = () => {

    const [editorState, setEditorState] = React.useState(() => EditorState.createEmpty())
    const editorRef = useRef(null)

    const [flashcards, setFlashcards] = useState([])

    const printTitle = event => {
        event.preventDefault();
        console.log(stateToHTML(editorState.getCurrentContent(), options))
        setFlashcards(flashcards.concat([{
            html: stateToHTML(editorState.getCurrentContent(), options)
        }]))
        console.log(flashcards)
    }

    const onHighlight = () => {
        setEditorState(RichUtils.toggleInlineStyle(editorState, "HIGHLIGHT"));
    };

    const options = {
        inlineStyles: {
            HIGHLIGHT: {
                style: { background: "#fffe0d" },
                class: 'hiddenText',
            }
        }
    }

    return (
        <div className='flashcard-creator-container'>
            <div className='highlight-button-wrapper'>
                <button className="highlight-button" onClick={onHighlight}><RiEdit2Fill />Highlight</button>
            </div>
            <Editor editorState={editorState} onChange={setEditorState} placeholder="Card description" plugins={[highlightPlugin]} ref={editorRef} />
            <input type='button' value='Submit' onClick={printTitle} />
        </div>
    )
};

export default FlashcardCreator;