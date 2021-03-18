import React, { useState } from "react";
import ReactModal from "react-modal";
import styled from "styled-components";

type ModalProps = {
  title: string;
  message: string;
  show: boolean;
};

ReactModal.setAppElement("#root");

export const Modal = ({ title, message }: ModalProps) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  return (
    <div>
      <button onClick={() => setIsVisible(true)}>Trigger Modal</button>
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
            backgroundColor: "rgba(134, 142, 153, 0.25)",
          },
        }}
      >
        <Container>
          <Title>{title}</Title>
          <IconContainer onClick={() => setIsVisible(false)}>
            <Icon />
          </IconContainer>
          <Message>{message}</Message>
          <BlueButton onClick={() => setIsVisible(false)}>Close</BlueButton>
        </Container>
      </StyledModal>
    </div>
  );
};

const StyledModal = styled(ReactModal)`
  display: grid;

  min-height: 152px;
  max-width: 500px;
  width: fit-content;
  min-width: 400px;
  max-height: fit-content;
  outline: none;
  box-sizing: border-box;
  padding: 12px 16px 16px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 12px 28px 0px,
    rgba(0, 0, 0, 0.1) 0px 2px 4px 0px,
    rgba(255, 255, 255, 0.5) 0px 0px 0px 1px inset;
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
  background-color: rgb(245, 245, 245);
  width: 36px;
  height: 36px;
  border-radius: 50%;
  justify-content: center;
  align-content: center;

  :hover {
    background-color: rgb(233, 233, 233);
  }
  :active {
    background-color: rgb(218, 219, 220);
  }
`;

const Message = styled.span`
  display: grid;
  grid-column: 1/3;
  font-size: 15px;
`;

const Icon = styled.div`
  display: grid;
  height: 16px;
  width: 16px;
  background-image: url(assets/close.png);
  background-repeat: no-repeat;
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
