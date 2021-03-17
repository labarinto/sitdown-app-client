import React from 'react';
import { Editor, EditorState, convertFromRaw } from "draft-js";
import { Text } from '../';

const TextEditorDisplay = (props) => {

    let content = <Text opac70 padB15>{props.body}</Text>;

    if(props.body.blocks) {
        const contentState = convertFromRaw(props.body);
        const editorState = EditorState.createWithContent(contentState);

        content = <div>
                <Editor editorState={editorState} readOnly={true} />
            </div>
    } 

    return content;
}

export default TextEditorDisplay;
