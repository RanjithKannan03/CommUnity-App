'use client';

import React from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import '../../styles/ckeditor.css';

const CustomEditor = ({ onChange, editorData }) => {
    return (
        <div className="ckeditor-container">
            <CKEditor
                editor={ClassicEditor}
                data={editorData}
                onChange={(event, editor) => {
                    const data = editor.getData();
                    onChange(data);
                }}
                config={{
                    toolbar: {
                        items: [
                            'heading',
                            '|',
                            'bold', 'italic', 'link',
                            'bulletedList', 'numberedList', 'blockQuote',
                            '|',
                            'insertTable', 'tableColumn', 'tableRow', 'mergeTableCells',
                            '|',
                            'undo', 'redo'
                        ]
                    }
                }}
            />
        </div>
    );
};

export default CustomEditor;
