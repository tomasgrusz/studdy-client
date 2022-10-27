import React, { useRef, useState } from 'react';
import { EditorState, RichUtils } from 'draft-js';
import Editor from 'draft-js-plugins-editor'
import { stateToHTML } from 'draft-js-export-html'
import { stateFromHTML } from 'draft-js-import-html';
import Axios from 'axios';

import 'draft-js/dist/Draft.css';
import './index.css';

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

    const [title, setTitle] = useState('');
    const [editorState, setEditorState] = React.useState(() => EditorState.createEmpty())
    const editorRef = useRef(null)

    const printTitle = event => {
        event.preventDefault();
        console.log(title)
    }

    const onHighlight = () => {
        setEditorState(
            RichUtils.toggleInlineStyle(editorState, "HIGHLIGHT")
        );
    };

    const options = {
        inlineStyles: {
            HIGHLIGHT: {
                style: { background: "#fffe0d" },
                class: 'hiddenText',
            }
        }
    }

    const queryDB = async () => {
        try {
            await Axios.get(
                "http://localhost:3001/",
                {
                    withCredentials: true,
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            )
                .then((response) => {
                    console.log(response.data[0])
                })
                .catch((e) => {
                    console.log(e);
                });
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <>
            <div className='form-div'>
                <input
                    className='textfield'
                    required
                    id="form-flaschard-title"
                    placeholder="Title"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                />
                <div>
                    <button className="highlight" onClick={onHighlight}>Highlight</button>
                    <Editor editorState={editorState} onChange={setEditorState} placeholder="Card description" plugins={[highlightPlugin]} ref={editorRef} />
                </div>
                <input type='button' value='Submit' onClick={printTitle} />
            </div>
            <button onClick={queryDB}>Query DB</button>
            <div dangerouslySetInnerHTML={{ __html: stateToHTML(editorState.getCurrentContent(), options) }}></div>
        </>
    )
};

export { FlashcardCreator };