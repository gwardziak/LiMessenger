import { observer } from "mobx-react-lite";
import React from "react";
import styled from "styled-components";
import { useRootStore } from "../stores/RootStore";
import { Avatar as DefaultAvatar } from "../ui/Avatar";
import { MyScrollbar } from "../utils/Scrollbar";
export const ChatRoom = observer(() => {
  const rootStore = useRootStore();
  console.log(rootStore.chatStore.messagesInRoom());

  return (
    <StyledScrollbar autoHide noScrollX>
      <Container>
        <MessageDate>Dziś</MessageDate>
        <MessageContainer>
          {rootStore.chatStore.messagesInRoom().map((message) => (
            <>
              <Message>{message.text}</Message>
              <div>p</div>
            </>
          ))}
        </MessageContainer>
      </Container>
    </StyledScrollbar>
  );
});
// export const ChatRoom = () => {
//   return (
//     <StyledScrollbar autoHide noScrollX>
//       <Container>
//         <MessageDate>Dziś</MessageDate>
//         <MessageContainer>
//           <Avatar src="https://scontent-frt3-1.xx.fbcdn.net/v/t1.30497-1/c29.0.100.100a/p100x100/84241059_189132118950875_4138507100605120512_n.jpg?_nc_cat=1&_nc_sid=7206a8&_nc_ohc=jpVmHYL2xgEAX_eH_Qn&_nc_ht=scontent-frt3-1.xx&_nc_tp=27&oh=e5c68a6969033f02f9d8f25d6a3d5560&oe=5F98D99E" />
//           <Message>Już</Message>
//           <Message>
//             Już
//             wrzucamaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaas
//           </Message>
//           <Message>Już wrzucam</Message>
//           <Message>Już wrzucam</Message>
//         </MessageContainer>
//         <MessageContainerDuplicate>
//           <MessageDuplicate>Już</MessageDuplicate>
//           <MessageDuplicate>
//             Już
//             wrzucamaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaas
//           </MessageDuplicate>
//           <MessageDuplicate>Już wrzucam</MessageDuplicate>
//           <MessageDuplicate>Już wrzucam</MessageDuplicate>
//         </MessageContainerDuplicate>
//       </Container>
//     </StyledScrollbar>
//   );
// };

const Container = styled.div`
  display: grid;
  grid-template-rows: 1fr;
  padding: 0 10px 0 12px;
  grid-row-gap: 15px;
`;

const MessageDate = styled.h4`
  display: grid;
  font-weight: 500;
  text-transform: uppercase;
  color: rgba(0, 0, 0, 0.4);
  font-size: 12px;
  justify-self: center;
`;

const MessageContainer = styled.div`
  display: grid;
  grid-template-columns: 36px 1fr;
  grid-gap: 2px;
`;

const Message = styled.div`
  display: grid;
  grid-column: 2;
  font-size: 14px;
  background-color: #f1f0f0;
  padding: 6px 12px 7px;
  max-width: 85%;
  width: fit-content;
  min-height: 32px;
  box-sizing: border-box;
  overflow-wrap: anywhere;
  border-top-right-radius: 1.3em;
  border-bottom-right-radius: 1.3em;

  :nth-child(2) {
    border-top-left-radius: 1.3em;
  }

  :last-child {
    border-bottom-left-radius: 1.3em;
  }
`;

const Avatar = styled(DefaultAvatar)`
  display: grid;
  width: 32px;
  height: 32px;
  grid-row: 4;
`;

const MessageContainerDuplicate = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 2px;
  justify-items: flex-end;
`;

const MessageDuplicate = styled.div`
  display: grid;
  grid-column: 2;
  font-size: 14px;
  background-color: #09f;
  color: #fff;
  padding: 6px 12px 7px;
  max-width: 85%;
  width: fit-content;
  min-height: 32px;
  box-sizing: border-box;
  overflow-wrap: anywhere;
  border-top-left-radius: 1.3em;
  border-bottom-left-radius: 1.3em;

  :first-child {
    border-top-right-radius: 1.3em;
  }

  :last-child {
    border-bottom-right-radius: 1.3em;
  }
`;

const StyledScrollbar = styled(MyScrollbar)`
  border-left: 1px solid rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
`;
