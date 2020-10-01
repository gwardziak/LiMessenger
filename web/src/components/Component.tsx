import React from "react";
import styled from "styled-components";
import { Like } from "../Icons/Like";
import { Plus } from "../Icons/Plus";
import { Smile } from "../Icons/Smile";
import { Attachment } from "./../Icons/Attachment";
import { EmojiFolder } from "./../Icons/EmojiFolder";
import { GifFolder } from "./../Icons/GifFolder";

export const Component = () => {
  return (
    <>
      <Container>
        <Test>
          <Test1>
            <Plus
              height="24px"
              width="24px"
              viewBox="0 0 24 24"
              fill="rgb(0, 153, 255)"
            />
          </Test1>
        </Test>
        <IconsContainer>
          <SingleIconCont>
            <GifFolder
              height="36px"
              width="36px"
              viewBox="0 0 36 36"
              fill="rgb(0, 153, 255)"
            />
          </SingleIconCont>
          <SingleIconCont>
            <EmojiFolder
              height="36px"
              width="36px"
              viewBox="0 0 36 36"
              fill="rgb(0, 153, 255)"
            />
          </SingleIconCont>
          <SingleIconCont>
            <Attachment
              height="36px"
              width="36px"
              viewBox="0 0 36 36"
              fill="rgb(0, 153, 255)"
            />
          </SingleIconCont>
        </IconsContainer>
        <AnotherKurwaCoint>
          <Input contentEditable="true"></Input>
          <Smile
            height="24px"
            width="24px"
            viewBox="0 0 26 26"
            fill="rgb(0, 153, 255)"
          />
        </AnotherKurwaCoint>
        <LikeContainer>
          <Like
            height="36px"
            width="36px"
            viewBox="0 1 36 36"
            fill="rgb(0, 153, 255)"
          />
        </LikeContainer>
      </Container>
    </>
  );
};

const Container = styled.div`
  align-items: flex-end;
  background-color: rgba(255, 255, 255, 1);
  margin: 0;
  padding: 0 8px;
  display: flex;
  flex-direction: row;
`;
/*
 position: fixed;
  bottom: 0;

*/
const IconContainer = styled.div`
  align-items: center;
  background-color: transparent;
  display: flex;
  margin-right: 8px;
  padding: 0 0 14px 4px;
  z-index: 1;
`;

const IconsContainer = styled.div`
  align-items: flex-end;
  display: flex;
  padding: 8px 0;
`;

const SingleIconCont = styled.div`
  margin-right: 8px;
`;

const SendMsg = styled.div`
  background-color: rgba(0, 0, 0, 0.05);
  border-radius: 18px;
  display: flex;
  flex: 1 1 auto;
  margin: 8px 8px 8px 0;
  min-width: 100px;
  padding: 0 8px 0 12px;
`;

const LikeContainer = styled.div`
  width: 33px;
  padding: 0 1px 8px 2px;
`;

const Input = styled.input`
  display: flex;
  padding: 9px 0;
  outline: 0;
  border: 0;
  background-color: rgba(0, 0, 0, 0.05);
`;

const Div = styled.div`
  display: flex;
  background-color: red;
`;

const Test = styled.div`
  align-items: center;
  background-color: transparent;
  display: flex;
  margin-right: 8px;
  padding: 0 0 14px 4px;
  z-index: 1;
`;

const Test1 = styled.div`
  background-color: #fff;
  border-radius: 50%;
  cursor: pointer;
  transition: transform 0.22s cubic-bezier(0.5, 0, 0.4, 1);
`;

const AnotherKurwaCoint = styled.div`
  background-color: rgba(0, 0, 0, 0.05);
  border-radius: 18px;
  display: flex;
  flex: 1 1 auto;
  margin: 8px 8px 8px 0;
  min-width: 100px;
  padding: 0 8px 0 12px;
`;
