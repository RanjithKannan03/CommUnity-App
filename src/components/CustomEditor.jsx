'use client'

import React from 'react';
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import '../../styles/ckeditor.css'

const editorConfiguration = {
    toolbar: [
        'heading',
        '|',
        'bold',
        'italic',
        'link',
        'bulletedList',
        'numberedList',
        '|',
        'outdent',
        'indent',
        '|',
        'imageUpload',
        'blockQuote',
        'insertTable',
        'mediaEmbed',
        'undo',
        'redo'
    ]
};
function CustomEditor(props) {
    return (
        <div className='your-div-class__editor'>
            <CKEditor
                editor={ClassicEditor}
                config={editorConfiguration}
                data={props.body}
                onChange={(event, editor) => {
                    const data = editor.getData();
                    props.setBody(data);
                    console.log({ event, editor, data });
                }}
            />
        </div>
    )
}
export default CustomEditor;