import SunEditor, { buttonList } from 'suneditor-react';
import SunEditorCore from 'suneditor/src/lib/core';
import 'suneditor/dist/css/suneditor.min.css';
import { useRef } from 'react';

const TextEditor = () => {
  const editor = useRef<SunEditorCore>();

  const getSunEditorInstance = (sunEditor: SunEditorCore) => {
    editor.current = sunEditor;
  };

  const handleChange = (content: string) => {
    console.log(content);
  };

  return (
    <SunEditor
      getSunEditorInstance={getSunEditorInstance}
      setOptions={{ buttonList: buttonList.basic }}
      onChange={handleChange}
    />
  );
};

export default TextEditor;
