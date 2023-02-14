import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { EditorState, RichUtils } from 'draft-js';
import Editor from 'draft-js-plugins-editor'
import { stateToHTML } from 'draft-js-export-html'
import Axios from 'axios';
import { CgEditMarkup } from 'react-icons/cg'

import sanitizeHtml from 'sanitize-html';

import 'draft-js/dist/Draft.css';
import './FlashcardCreator.css';

const highlightPlugin = {
    customStyleMap: {
        HIGHLIGHT: {
            background: "var(--highlight-color)",
            color: '#241d2e'
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

const FlashcardCreator = ({ deck }) => {

    const [editorState, setEditorState] = React.useState(() => EditorState.createEmpty())
    const editorRef = useRef(null)
    const navigate = useNavigate();

    //function for submitting flashcard to backend for approval
    const submitFlashcard = async event => {
        //prevent website reload
        event.preventDefault();

        //convert content from editor to html
        const flashcard = sanitizeHtml(stateToHTML(editorState.getCurrentContent(), options))

        const response = await Axios.post('http://localhost:3001/createFlashcard', {
            deck: deck,
            content: flashcard
        }, {
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true
        })

        if (response.data.message === 'Success') {
            alert('Successfully created Flashcard(s). Please reload to update.')
        } else if (response.data.message === 'Invalid content') {
            alert('Something\'s wrong with your content, please check and try again.')
        } else if (response.data.message === 'Unauthorized') {
            alert('Your session is outdated, you will be redirected to the login page to sign in again.')
            navigate('/sign-out')
        } else {
            alert('An unexpected error occured, please try again later or contact us.')
        }
    }

    const onHighlight = () => {
        setEditorState(RichUtils.toggleInlineStyle(editorState, "HIGHLIGHT"));
    };

    const options = {
        inlineStyles: {
            HIGHLIGHT: {
                element: 'mark'
            }
        }
    }

    return (
        <div className='flashcard-creator-container'>
            <div className='highlight-button-wrapper'>
                <span className="highlight-button" onClick={onHighlight}><CgEditMarkup /></span>
                <input className='studdy-button create-flashcard-button' type='button' value='Submit' onClick={submitFlashcard} />
            </div>
            <Editor editorState={editorState} onChange={setEditorState} placeholder="Enter flashcard content..." plugins={[highlightPlugin]} ref={editorRef} />
        </div>
    )
};

export default FlashcardCreator;