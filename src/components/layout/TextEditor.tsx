import 'suneditor/dist/css/suneditor.min.css';
import styled from '@emotion/styled';
import { css, Global } from '@emotion/react';
import SunEditor, { buttonList } from 'suneditor-react';
import { Button } from '@/components/ui/button';
import SunEditorCore from 'suneditor/src/lib/core';
import { useRef, useState } from 'react';
import AvatarsSvg from '@/assets/profileImg/AvatarsSvg';
import CustomAlert from './CustomAlert';

interface TextEditorProps {
  onUpload: (content: string) => void;
  nickname: string;
}

const TextEditor = ({ onUpload, nickname }: TextEditorProps) => {
  const editor = useRef<SunEditorCore | null>(null);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState<string>('');
  const [alertType, setAlertType] = useState<'success' | 'error'>('error');

  const getSunEditorInstance = (sunEditor: SunEditorCore) => {
    editor.current = sunEditor;
  };

  const handleUpload = () => {
    if (editor.current) {
      const content = editor.current.getContents(false).trim();

      const isEmpty = content === '' || content === '<p><br></p>' || content === '<br>';

      if (isEmpty) {
        setAlertMessage('업로드 할 게시글을 작성해 주세요.');
        setAlertType('error');
        setShowAlert(true);
        return;
      }

      setAlertMessage('게시글이 업로드 되었습니다.');
      setAlertType('success');
      setShowAlert(true);

      onUpload(content);
      editor.current.setContents('');
    }
  };

  return (
    <>
      <UserInfo>
        <ProfileImg>
          <AvatarsSvg />
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
        {showAlert && (
          <CustomAlert
            alertDescription={alertMessage}
            onClose={() => setShowAlert(false)}
            type={alertType}
          />
        )}
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
  border: 2px solid #fff;
  overflow: hidden;

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
