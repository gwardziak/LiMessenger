import React, { useContext } from "react";
import ReactModal from "react-modal";
import styled, { ThemeContext } from "styled-components";
import { Close } from "../Icons/Close";

type ModalProps = {
  title: string;
  message: string;
  isVisible: boolean;
  setIsVisible: (val: boolean) => void;
};

ReactModal.setAppElement("#root");

export const Modal = ({
  title,
  message,
  isVisible,
  setIsVisible,
}: ModalProps) => {
  const theme = useContext(ThemeContext);

  return (
    <StyledModal
      isOpen={isVisible}
      contentLabel="Modal"
      onRequestClose={() => setIsVisible(false)}
      shouldCloseOnOverlayClick={true}
      shouldReturnFocusAfterClose={false}
      style={{
        overlay: {
          display: "grid",
          alignContent: "center",
          justifyContent: "center",
          backgroundColor: theme.modal.overlay,
        },
      }}
    >
      <Container>
        <Title>{title}</Title>
        <IconContainer onClick={() => setIsVisible(false)}>
          <CloseIcon />
        </IconContainer>
        <Message>{message}</Message>
        <BlueButton onClick={() => setIsVisible(false)}>Close</BlueButton>
      </Container>
    </StyledModal>
  );
};

const StyledModal = styled(ReactModal)`
  display: grid;
  min-height: 152px;
  max-height: fit-content;
  min-width: 400px;
  max-width: 500px;
  width: fit-content;

  border-radius: 8px;
  outline: none;
  box-sizing: border-box;
  padding: 12px 16px 16px;
  background-color: ${({ theme }) => theme.modal.background};
  box-shadow: ${({ theme }) => `rgba(0, 0, 0, 0.2) 0px 12px 28px 0px,
    rgba(0, 0, 0, 0.1) 0px 2px 4px 0px,
    ${theme.modal.shadow} 0px 0px 0px 1px inset`};
`;

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 36px;
  font-family: "Segoe UI Historic", "Segoe UI", Helvetica, Arial, sans-serif;
`;

const Title = styled.span`
  display: grid;
  font-size: 20px;
  font-weight: 700;
  line-height: 24px;
`;

const IconContainer = styled.div`
  display: grid;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  justify-content: center;
  align-content: center;
  background-color: ${({ theme }) => theme.svg.background};

  :hover {
    background: ${({ theme }) => theme.img.hover};
  }
  :active {
    background-color: ${({ theme }) => theme.svg.active};
  }
`;

const Message = styled.span`
  display: grid;
  grid-column: 1/3;
  font-size: 15px;
`;

const CloseIcon = styled(Close)`
  height: 16px;
  width: 16px;

  fill: ${({ theme }) => theme.input.placeholder};
`;

const BlueButton = styled.button`
  display: grid;
  background-color: #1877f2;
  align-items: center;
  border: none;
  border-radius: 6px;
  font-size: 15px;
  color: #fff;
  font-weight: bold;
  cursor: pointer;
  padding: 0 12px;
  grid-column: 1/3;
  width: fit-content;
  justify-self: end;
  height: 36px;
  align-self: end;

  &:focus {
    outline: none;
  }

  &:hover {
    background-color: #166fe5;
  }
`;
