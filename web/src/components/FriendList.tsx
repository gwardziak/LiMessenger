import { observer } from "mobx-react-lite";
import React from "react";
import styled from "styled-components";
import { useRootStore } from "../stores/RootStore";
import { Avatar as DefaultAvatar } from "../ui/Avatar";
import { mediaQuery } from "../utils/css/cssMedia";
import { formatDate } from "../utils/formatDate";

export const FriendList = observer(() => {
  const rootStore = useRootStore();

  return (
    <Container>
      {rootStore.chatStore.firstMessages.map((message) => {
        const friendUuid =
          rootStore.userStore.uuid === message.sender.uuid
            ? message.recipient.uuid
            : message.sender.uuid;
        return (
          <Item
            isActive={rootStore.chatStore.activeChat === friendUuid}
            key={friendUuid}
            onClick={(e) => {
              if (rootStore.chatStore.activeChat !== friendUuid) {
                try {
                  rootStore.chatStore.setPrevChatScrollHeight(0);
                  rootStore.chatStore.setChatroom(friendUuid);
                  console.log("Change room");
                } catch (ex) {
                  console.log("Error during selecting a chat", ex.message);
                }
              }
            }}
          >
            <Avatar src="https://scontent-frt3-1.xx.fbcdn.net/v/t1.30497-1/cp0/c18.0.60.60a/p60x60/84241059_189132118950875_4138507100605120512_n.jpg?_nc_cat=1&ccb=2&_nc_sid=dbb9e7&_nc_ohc=MptErBC1D4UAX850YxA&_nc_ht=scontent-frt3-1.xx&tp=27&oh=bf4dda367f66a8ea248e026dc05c4c9d&oe=5FDE9C73"></Avatar>
            <Username>
              {rootStore.userStore.uuid === message.sender.uuid
                ? message.recipient.username
                : message.sender.username}
            </Username>
            <Message>
              {rootStore.userStore.uuid === message.sender.uuid
                ? "You: "
                : `${message.sender.username}: `}
              {message.text}
              {` · ${formatDate(message.createdAt)}`}
            </Message>
          </Item>
        );
      })}
    </Container>
  );
});

const Container = styled.ul`
  display: grid;
  list-style-type: none;
  margin: 0 8px;
  padding: 0;
  margin-top: 2px;
  /* border-top: 1px solid #ced0d4; */
`;

const Item = styled.li<{ isActive?: boolean; isSearch?: boolean }>`
  display: grid;
  grid-template-areas: "avatar username" "avatar message";
  grid-template-rows: ${(props) => (props.isSearch ? "52px" : "32px 32px")};
  grid-template-columns: ${(props) =>
    props.isSearch ? "36px 1fr" : "50px 1fr"};
  grid-column-gap: 12px;
  padding: 0 8px;
  align-items: center;
  cursor: pointer;
  background-color: ${(props) => props.isActive && "rgba(0, 0, 0, 0.04)"};
  border-radius: ${(props) => props.isActive && "10px"};

  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
    border-radius: 10px;
  }

  @media ${mediaQuery.xs}, ${mediaQuery.sm}, ${mediaQuery.md} {
    grid-template-rows: 64px;
    grid-template-columns: 62.2px;
    grid-template-areas: "avatar";
    justify-items: center;
    padding: 0;
  }
`;

const Avatar = styled(DefaultAvatar)<{ isSearch?: boolean }>`
  grid-area: avatar;
  height: ${(props) => props.isSearch && "36px"};
  width: ${(props) => props.isSearch && "36px"};
`;

const Username = styled.div<{ isSearch?: boolean }>`
  grid-area: username;
  font-size: 15px;
  text-overflow: ellipsis;
  white-space: nowrap;
  align-self: ${(props) => (props.isSearch ? "none" : "flex-end")};
  overflow: hidden;
  @media ${mediaQuery.xs}, ${mediaQuery.sm}, ${mediaQuery.md} {
    display: none;
  }
`;

const Message = styled.div`
  grid-area: message;
  font-size: 13px;
  color: rgb(153, 153, 153);
  align-self: flex-start;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  @media ${mediaQuery.xs}, ${mediaQuery.sm}, ${mediaQuery.md} {
    display: none;
  }
`;

// import { observer } from "mobx-react-lite";
// import React, { useState } from "react";
// import styled from "styled-components";
// import { useFindUserQuery } from "../generated/graphql";
// import { useRootStore } from "../stores/RootStore";
// import { Avatar as DefaultAvatar } from "../ui/Avatar";
// import { mediaQuery } from "../utils/css/cssMedia";
// import { useMatchesMediaQuery } from "../utils/css/useMatchesMediaQuery";
// import { formatDate } from "../utils/formatDate";
// import { MyScrollbar } from "../utils/Scrollbar";
// import { useIsVisible } from "../utils/useIsVisible";
// import { SearchBar } from "./SearchBar";

// export const FriendList = observer(() => {
//   const isBg = useMatchesMediaQuery([mediaQuery.bg]);
//   const rootStore = useRootStore();
//   const [input, setInput] = useState<string>("");
//   const { ref, isVisible, setIsVisible } = useIsVisible(false);
//   const [{ fetching, data, error }, update] = useFindUserQuery({
//     variables: { phase: input },
//     pause: true,
//   });

//   if (error) {
//     return <div>Error during searchring for new friends</div>;
//   }

//   if (data?.findUser.length === 0) {
//     return <div>No users matching search criteria</div>;
//   }

//   return (
//     <MyScrollbar autoHide noScrollX>
//       <Container>
//         {isBg && (
//           <SearchBar
//             update={update}
//             input={input}
//             setInput={setInput}
//             setIsVisible={setIsVisible}
//             isVisible={isVisible}
//           />
//         )}

//         {/* TODO
//         {data?.findUser.length === 0 && (
//           <div>No users matching search criteria</div>
//         )} */}

//         {isVisible ? (
//           <List ref={ref}>
//             {data?.findUser.map((user) => (
//               <Item
//                 key={user.uuid}
//                 isSearch={true}
//                 onClick={() => {
//                   rootStore.chatStore.setChatroom(user.uuid);
//                   rootStore.chatStore.setFriendName(user.username);
//                 }}
//               >
//                 <Avatar
//                   isSearch={true}
//                   src="https://scontent-frt3-1.xx.fbcdn.net/v/t1.30497-1/cp0/c18.0.60.60a/p60x60/84241059_189132118950875_4138507100605120512_n.jpg?_nc_cat=1&ccb=2&_nc_sid=dbb9e7&_nc_ohc=MptErBC1D4UAX850YxA&_nc_ht=scontent-frt3-1.xx&tp=27&oh=bf4dda367f66a8ea248e026dc05c4c9d&oe=5FDE9C73"
//                 ></Avatar>
//                 <Username isSearch={true}>{user.username}</Username>
//               </Item>
//             ))}
//           </List>
//         ) : (
//           <List>
//             {rootStore.chatStore.firstMessages.map((message) => {
//               const friendUuid =
//                 rootStore.userStore.uuid === message.sender.uuid
//                   ? message.recipient.uuid
//                   : message.sender.uuid;
//               return (
//                 <Item
//                   isActive={rootStore.chatStore.activeChat === friendUuid}
//                   key={friendUuid}
//                   onClick={(e) => {
//                     if (rootStore.chatStore.activeChat !== friendUuid) {
//                       try {
//                         rootStore.chatStore.setPrevChatScrollHeight(0);
//                         rootStore.chatStore.setChatroom(friendUuid);
//                         console.log("Change room");
//                       } catch (ex) {
//                         console.log(
//                           "Error during selecting a chat",
//                           ex.message
//                         );
//                       }
//                     }
//                   }}
//                 >
//                   <Avatar src="https://scontent-frt3-1.xx.fbcdn.net/v/t1.30497-1/cp0/c18.0.60.60a/p60x60/84241059_189132118950875_4138507100605120512_n.jpg?_nc_cat=1&ccb=2&_nc_sid=dbb9e7&_nc_ohc=MptErBC1D4UAX850YxA&_nc_ht=scontent-frt3-1.xx&tp=27&oh=bf4dda367f66a8ea248e026dc05c4c9d&oe=5FDE9C73"></Avatar>
//                   <Username>
//                     {rootStore.userStore.uuid === message.sender.uuid
//                       ? message.recipient.username
//                       : message.sender.username}
//                   </Username>
//                   <Message>
//                     {rootStore.userStore.uuid === message.sender.uuid
//                       ? "You: "
//                       : `${message.sender.username}: `}
//                     {message.text}
//                     {` · ${formatDate(message.createdAt)}`}
//                   </Message>
//                 </Item>
//               );
//             })}
//           </List>
//         )}
//       </Container>
//     </MyScrollbar>
//   );
// });

// const Container = styled.div`
//   grid-area: friendList;
//   display: grid;
//   grid-template-rows: 36px 1fr;
//   grid-row-gap: 16px;
//   @media ${mediaQuery.xs}, ${mediaQuery.sm}, ${mediaQuery.md} {
//     grid-template-rows: 64px;
//   }
// `;

// const List = styled.ul`
//   display: grid;
//   list-style-type: none;
//   margin: 0 8px;
//   padding: 0;
// `;

// const Item = styled.li<{ isActive?: boolean; isSearch?: boolean }>`
//   display: grid;
//   grid-template-areas: "avatar username" "avatar message";
//   grid-template-rows: ${(props) => (props.isSearch ? "52px" : "32px 32px")};
//   grid-template-columns: ${(props) =>
//     props.isSearch ? "36px 1fr" : "50px 1fr"};
//   grid-column-gap: 12px;
//   padding: 0 8px;
//   align-items: center;
//   cursor: pointer;
//   background-color: ${(props) => props.isActive && "rgba(0, 0, 0, 0.04)"};
//   border-radius: ${(props) => props.isActive && "10px"};

//   &:hover {
//     background-color: rgba(0, 0, 0, 0.05);
//     border-radius: 10px;
//   }

//   @media ${mediaQuery.xs}, ${mediaQuery.sm}, ${mediaQuery.md} {
//     grid-template-rows: 64px;
//     grid-template-columns: 62.2px;
//     grid-template-areas: "avatar";
//     justify-items: center;
//     padding: 0;
//   }
// `;

// const Avatar = styled(DefaultAvatar)<{ isSearch?: boolean }>`
//   grid-area: avatar;
//   height: ${(props) => props.isSearch && "36px"};
//   width: ${(props) => props.isSearch && "36px"};
// `;

// const Username = styled.div<{ isSearch?: boolean }>`
//   grid-area: username;
//   font-size: 15px;
//   text-overflow: ellipsis;
//   white-space: nowrap;
//   align-self: ${(props) => (props.isSearch ? "none" : "flex-end")};
//   overflow: hidden;
//   @media ${mediaQuery.xs}, ${mediaQuery.sm}, ${mediaQuery.md} {
//     display: none;
//   }
// `;

// const Message = styled.div`
//   grid-area: message;
//   font-size: 13px;
//   color: rgb(153, 153, 153);
//   align-self: flex-start;
//   text-overflow: ellipsis;
//   white-space: nowrap;
//   overflow: hidden;
//   @media ${mediaQuery.xs}, ${mediaQuery.sm}, ${mediaQuery.md} {
//     display: none;
//   }
// `;
