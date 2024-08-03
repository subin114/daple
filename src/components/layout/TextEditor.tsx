import 'suneditor/dist/css/suneditor.min.css';
import styled from '@emotion/styled';
import { css, Global } from '@emotion/react';
import SunEditor, { buttonList } from 'suneditor-react';
import SunEditorCore from 'suneditor/src/lib/core';
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
    <>
      <Global
        styles={css`
          .sun-editor {
            border-color: #fafafa !important;
            border: none !important;
          }

          .sun-editor-common {
            background-color: #f8f8f8 !important;
          }

          .se-btn-tray {
            padding: 0 0 10px 0 !important;
            display: flex;
            justify-content: flex-start;
            align-items: center;
          }

          .se-btn-module-border {
            border: none !important;
          }

          .se-menu-list {
            button {
              background-color: #fff;

              &:hover {
                background-color: #ecf6f8 !important;
              }
            }
          }

          .se-toolbar {
            outline: none !important;
          }

          .se-resizing-bar {
            display: none !important;
          }
        `}
      />
      <SunEditorStyled
        getSunEditorInstance={getSunEditorInstance}
        setOptions={{ buttonList: buttonList.basic }}
        onChange={handleChange}
        width="100%"
        height="150px"
        placeholder="텍스트를 입력하세요"
      />
    </>
  );
};

const SunEditorStyled = styled(SunEditor)``;

export default TextEditor;
