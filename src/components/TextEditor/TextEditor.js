import React, { useRef } from 'react';
import { 
    Editor, EditorState, RichUtils, 
    getDefaultKeyBinding, convertToRaw, convertFromRaw,
} from 'draft-js';
import 'draft-js/dist/Draft.css';
//import classes from './TextEditor.module.scss';
import './TextEditor.css';

import BlockStyleControls from './BlockStyleControls';
import InlineStyleControls from './InlineStyleControls';

// Custom overrides for "code" style.
const styleMap = {
    CODE: {
      backgroundColor: 'rgba(0, 0, 0, 0.05)',
      fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
      fontSize: 16,
      padding: 2,
    },
  };

function getBlockStyle(block) {
    switch (block.getType()) {
        case 'blockquote': return 'RichEditor-blockquote';
        default: return null;
    }
}

const TextEditor = (props) => {
    
    const editorRef = useRef(null);

    let inputState = EditorState.createEmpty();
    if(props.editorState) inputState = props.editorState;
    if(!props.editorState && props.value.blocks ) inputState = EditorState.createWithContent(convertFromRaw(props.value));
    const editorState = inputState;

    const focus = () => editorRef.current.focus();
    const onChange = (editorState) => {
        const content = convertToRaw(editorState.getCurrentContent());
        props.onChange(content, editorState);
    };


    const handleKeyCommand = (command, editorState) => {
        const newState = RichUtils.handleKeyCommand(editorState, command);
        if (newState) {
            onChange(newState);
            return true;
        }
        return false;
    };

    const mapKeyToEditorCommand = (e) => {
        if (e.keyCode === 9) {
            const newEditorState = RichUtils.onTab(
                e,
                editorState,
                4,
            );
            if (newEditorState !== editorState) {
                onChange(newEditorState);
            }
            return;
        }
        return getDefaultKeyBinding(e);
    }

    const toggleBlockType = (blockType) => {
        onChange(
            RichUtils.toggleBlockType(
                editorState,
                blockType
            )
        );
    }

    const toggleInlineStyle = (inlineStyle) => {
        onChange(
            RichUtils.toggleInlineStyle(
                editorState,
                inlineStyle
            )
        );
    }

    let className = 'RichEditor-editor';
    let contentState = editorState.getCurrentContent();
    if(!contentState.hasText()) {
        if(contentState.getBlockMap().first().getType() !== 'unstyled') {
            className += ' RichEditor-hidePlaceholder';
        }
    };

    return (
        <div className="RichEditor-root">
            <BlockStyleControls
                editorState={editorState}
                onToggle={toggleBlockType}
            />
            <InlineStyleControls
                editorState={editorState}
                onToggle={toggleInlineStyle}
            />

            <div className={className} onClick={focus}>
                <Editor
                    blockStyleFn={getBlockStyle}
                    customStyleMap={styleMap}
                    editorState={editorState}
                    handleKeyCommand={handleKeyCommand}
                    keyBindingFn={mapKeyToEditorCommand}
                    onChange={onChange}
                    placeholder="..."
                    ref={editorRef}
                    spellCheck={true}
                />
            </div>
        </div>
    )
};

export default TextEditor;