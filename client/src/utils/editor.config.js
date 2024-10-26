const editorStyle = {
  width: "100%",
  border: "1px solid #ccc",
  borderRadius: "8px",
};

const modules = {
  toolbar: [
    [{ font: [] }],
    [{ header: [1, 2, 3, false] }],
    ["bold", "italic", "underline", "strike", "blockquote", "code-block"],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ align: [] }, { indent: "-1" }, { indent: "+1" }],
    ["link"],
  ],
};

const formats = [
  "font",
  "size",
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "code-block",
  "list",
  "bullet",
  "align",
  "indent",
  "color",
  "background",
  "script",
  "link",
];

export { editorStyle, modules, formats };
