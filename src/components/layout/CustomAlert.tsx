import styled from '@emotion/styled';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useEffect, useState } from 'react';
import { css, keyframes } from '@emotion/react';

interface CustomAlertProps {
  alertDescription: string;
  onClose: () => void;
  type: 'success' | 'error';
}

const CustomAlert = ({ alertDescription, onClose, type }: CustomAlertProps) => {
  const [isVisible, _] = useState(true);

  useEffect(() => {
    const timer = setTimeout(onClose, 1700);
    return () => clearTimeout(timer);
  }, []);

  return isVisible ? (
    <AlertStyled isVisible={isVisible} type={type}>
      <AlertDescription>{alertDescription}</AlertDescription>
    </AlertStyled>
  ) : null;
};

const AlertStyled = styled(Alert, {
  shouldForwardProp: prop => prop !== 'isVisible' && prop !== 'type',
})<{ isVisible: boolean; type: 'success' | 'error' }>`
  max-width: 1200px;
  width: auto;
  position: fixed;
  top: 12%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 9999;
  padding: 17px 100px;
  color: #fff;
  font-size: 15px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 50px;
  transition:
    opacity 0.3s ease-in-out,
    transform 0.3s ease-in-out;
  animation: ${({ isVisible }) =>
      isVisible
        ? css`
            ${fadeIn} 0.3s ease-out
          `
        : css`
            ${fadeOut} 0.3s ease-in
          `}
    forwards;
  background-color: ${({ type }) => (type === 'success' ? '#98C056' : '#FF574B ')};
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translate(-50%, -50%) scale(0.9);
  }
  to {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
  }
  to {
    opacity: 0;
    transform: translate(-50%, -50%) scale(0.9);
  }
`;

export default CustomAlert;
