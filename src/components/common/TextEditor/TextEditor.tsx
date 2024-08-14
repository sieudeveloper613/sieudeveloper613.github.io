import React from "react";
import JoditEditor from 'jodit-react'

export interface ITextEditorProps {
    title: string;
}

export default function TextEditor(props: ITextEditorProps) {
    const editor = React.useRef(null)
    return <div>
        <div>{props.title}</div>
        <JoditEditor ref={editor} value={'string'} />
    </div>
}