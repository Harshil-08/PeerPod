import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { editorStyle, modules, formats } from "../../utils/editor.config";

const DescriptionEditor = ({ defaultContent, onChange }) => {
  const [editorContent, setEditorContent] = useState(defaultContent ?? "");

  const handleTextChange = (content) => {
    setEditorContent(content);
    onChange(content);
  };

  return (
    <div>
      <ReactQuill
        theme="snow"
        style={editorStyle}
        value={editorContent}
        modules={modules}
        formats={formats}
        onChange={handleTextChange}
        placeholder="Write something amazing..."
      />
    </div>
  );
};

export default DescriptionEditor;
