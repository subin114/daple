import 'suneditor/dist/css/suneditor.min.css';
import styled from '@emotion/styled';
import { css, Global } from '@emotion/react';
import SunEditor, { buttonList } from 'suneditor-react';
import { Button } from '@/components/ui/button';
import SunEditorCore from 'suneditor/src/lib/core';
import { useRef } from 'react';

interface TextEditorProps {
  onUpload: (content: string) => void;
  nickname: string;
}

const TextEditor = ({ onUpload, nickname }: TextEditorProps) => {
  const editor = useRef<SunEditorCore | null>(null);

  const getSunEditorInstance = (sunEditor: SunEditorCore) => {
    editor.current = sunEditor;
  };

  const handleUpload = () => {
    if (editor.current) {
      const content = editor.current.getText().trim();

      if (content.length === 0) {
        alert('내용을 입력하세요!');
        editor.current.setContents('');
        return;
      }
      onUpload(content);
      editor.current.setContents('');
    }
  };

  return (
    <>
      <UserInfo>
        <ProfileImg>
          <svg
            viewBox="0 0 36 36"
            fill="none"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            width="80"
            height="80"
          >
            <mask id=":rk:" maskUnits="userSpaceOnUse" x="0" y="0" width="36" height="36">
              <rect width="36" height="36" rx="72" fill="#FFFFFF"></rect>
            </mask>
            <g mask="url(#:rk:)">
              <rect width="36" height="36" fill="#817a8a"></rect>
              <rect
                x="0"
                y="0"
                width="36"
                height="36"
                transform="translate(7 7) rotate(37 18 18) scale(1.1)"
                fill="#fcddc8"
                rx="6"
              ></rect>
              <g transform="translate(3.5 3.5) rotate(-7 18 18)">
                <path d="M13,20 a1,0.75 0 0,0 10,0" fill="#000000"></path>
                <rect
                  x="12"
                  y="14"
                  width="1.5"
                  height="2"
                  rx="1"
                  stroke="none"
                  fill="#000000"
                ></rect>
                <rect
                  x="22"
                  y="14"
                  width="1.5"
                  height="2"
                  rx="1"
                  stroke="none"
                  fill="#000000"
                ></rect>
              </g>
            </g>
          </svg>
        </ProfileImg>
        <Nickname>{nickname}</Nickname>
      </UserInfo>
      <TextEditorWrap>
        <Global
          styles={css`
            .sun-editor {
              border: none !important;
            }

            .sun-editor-common {
              background-color: #ecf6f8 !important;
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

                &:hover,
                &:active {
                  background-color: #ecf6f8 !important;
                }

                &:active {
                  box-shadow: none !important;
                }
              }
            }

            .sun-editor .se-list-layer {
              border: 1px solid #ddd;
              border-radius: 0;
              box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
              height: 160px;
            }

            .se-toolbar {
              outline: none !important;
            }

            .se-resizing-bar {
              display: none !important;
            }
          `}
        />
        <SunEditor
          getSunEditorInstance={getSunEditorInstance}
          setOptions={{ buttonList: buttonList.basic }}
          width="100%"
          height="130px"
          placeholder="텍스트를 입력하세요"
        />
        <UploadBtn onClick={handleUpload}>업로드하기</UploadBtn>
      </TextEditorWrap>
    </>
  );
};

const UserInfo = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 15px 20px;
  background-color: #56bec0;
  border-radius: 20px 20px 0px 0px;
`;

export const ProfileImg = styled.div`
  width: 32px;
  height: 32px;
  margin-right: 8px;
  border-radius: 20px;
  background-color: #fff;

  svg {
    width: 100%;
    height: 100%;
  }
`;

const Nickname = styled.span`
  font-size: 15px;
  color: #fff;
`;

const TextEditorWrap = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  background-color: #ecf6f8;
  border-radius: 0 0 20px 20px;
`;

const UploadBtn = styled(Button)`
  margin-left: auto;
  margin-top: 15px;
  background-color: #56bec0;
  color: #fff;

  &:hover {
    background-color: #42abad;
  }
`;

export default TextEditor;
