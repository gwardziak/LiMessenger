import { Picker, PickerProps } from "emoji-mart";
import React, { forwardRef } from "react";
import { useKeyPressEvent } from "react-use";
import styled from "styled-components";
import { mediaQuery } from "../utils/css/cssMedia";

type EmojiProps = {
  setIsVisible(val: boolean): any;
};

export const EmojiPicker = forwardRef<HTMLDivElement, PickerProps & EmojiProps>(
  (props, ref) => {
    useKeyPressEvent("Escape", () => {
      props.setIsVisible(false);
    });

    return (
      <Wrapper ref={ref}>
        <Picker
          set="facebook"
          emojiSize={32}
          perLine={6}
          emojiTooltip={true}
          showPreview={false}
          showSkinTones={false}
          {...props}
        />
      </Wrapper>
    );
  }
);

const Wrapper = styled.div`
  position: absolute;
  bottom: 60px;
  z-index: 999;
  right: 55px;

  @media ${mediaQuery.xs}, ${mediaQuery.sm} {
    left: 50%;
  }

  .emoji-mart {
    display: grid;
    border-radius: 6px;
    box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.1), 0 1px 10px rgba(0, 0, 0, 0.35);
    background: ${({ theme }) => theme.emojiPicker.background};
    border: ${({ theme }) => `1px solid ${theme.emojiPicker.border}`};
  }

  .emoji-mart-search {
    display: none;
  }

  .emoji-mart-scroll {
    border-bottom: 0;
    margin-bottom: 6px;
  }

  .emoji-mart-scroll + .emoji-mart-bar {
    display: none;
  }

  .emoji-mart-category-label {
    display: none;
  }

  .emoji-mart-bar {
    grid-row: 2;
    border-bottom: ${({ theme }) => `1px solid ${theme.emojiPicker.border}`};
  }

  .emoji-mart-emoji:hover:before {
    top: 4px;
    left: 6px;
    background: ${({ theme }) => theme.emojiPicker.hover};
  }
`;
