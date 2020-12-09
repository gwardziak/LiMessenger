import { Picker, PickerProps } from "emoji-mart";
import React, { forwardRef } from "react";
import styled from "styled-components";

export const EmojiPicker = forwardRef<HTMLDivElement, PickerProps>(
  (props, ref) => {
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
  //right 450px
  z-index: 999;

  .emoji-mart {
    display: grid;
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
  }
`;
