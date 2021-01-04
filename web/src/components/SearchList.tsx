import React, { forwardRef, useRef, useState } from "react";
import { useClickAway } from "react-use";
import styled from "styled-components";
import { useFindUserQuery } from "../generated/graphql";
import { useRootStore } from "../stores/RootStore";
import { Avatar as DefaultAvatar } from "../ui/Avatar";
import { mediaQuery } from "../utils/css/cssMedia";
import { useMatchesMediaQuery } from "../utils/css/useMatchesMediaQuery";
import { MyScrollbar } from "../utils/Scrollbar";
import { SearchBar } from "./SearchBar";

export const SearchList = forwardRef<HTMLDivElement, any>((props, ref) => {
  const rootStore = useRootStore();
  const isBg = useMatchesMediaQuery([mediaQuery.bg]);
  const [input, setInput] = useState<string>("");
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const searchListRef = useRef(null);
  const [{ data, error }, update] = useFindUserQuery({
    variables: { phase: input },
    pause: true,
  });

  useClickAway(searchListRef, (e: any) => {
    if (
      e.srcElement.attributes.name?.value === "SearchInput" ||
      e.srcElement.attributes.title?.value === "magnifierImg"
    ) {
      return;
    }

    console.log("OUTSIDE CLICKED");
  });

  if (error) {
    return <div>Error during searchring for new friends</div>;
  }

  if (data?.findUser.length === 0) {
    return <div>No users matching search criteria</div>;
  }

  return (
    <MyScrollbar autoHide noScrollX>
      <Container>
        {isBg && (
          <SearchBar
            update={update}
            input={input}
            setInput={setInput}
            setIsVisible={setIsVisible}
            isVisible={isVisible}
          />
        )}

        {/* TODO
        {data?.findUser.length === 0 && (
          <div>No users matching search criteria</div>
        )} */}

        {isVisible ? (
          <List ref={searchListRef}>
            {data?.findUser.map((user) => (
              <Item
                key={user.uuid}
                isSearch={true}
                onClick={() => {
                  rootStore.chatStore.setChatroom(user.uuid);
                  rootStore.chatStore.setFriendName(user.username);
                }}
              >
                <Avatar
                  isSearch={true}
                  src="https://scontent-frt3-1.xx.fbcdn.net/v/t1.30497-1/cp0/c18.0.60.60a/p60x60/84241059_189132118950875_4138507100605120512_n.jpg?_nc_cat=1&ccb=2&_nc_sid=dbb9e7&_nc_ohc=MptErBC1D4UAX850YxA&_nc_ht=scontent-frt3-1.xx&tp=27&oh=bf4dda367f66a8ea248e026dc05c4c9d&oe=5FDE9C73"
                ></Avatar>
                <Username isSearch={true}>{user.username}</Username>
              </Item>
            ))}
          </List>
        ) : (
          <div>es</div>
        )}
      </Container>
    </MyScrollbar>
  );
});

const Container = styled.div`
  grid-area: friendList;
  display: grid;
  grid-template-rows: 36px 1fr;
  grid-row-gap: 16px;
  @media ${mediaQuery.xs}, ${mediaQuery.sm}, ${mediaQuery.md} {
    grid-template-rows: 64px;
  }
`;

const List = styled.ul`
  display: grid;
  list-style-type: none;
  margin: 0 8px;
  padding: 0;
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

// import React, { forwardRef } from "react";
// import styled from "styled-components";
// import { useRootStore } from "../stores/RootStore";
// import { Avatar as DefaultAvatar } from "../ui/Avatar";
// import { mediaQuery } from "../utils/css/cssMedia";

// export const SearchList = forwardRef<HTMLDivElement, any>((props, ref) => {
//   const rootStore = useRootStore();
//   console.log(ref);
//   return (
//     <Container>
//       {props.data?.findUser.map((user: any) => (
//         <Item
//           key={user.uuid}
//           isSearch={true}
//           onClick={() => {
//             rootStore.chatStore.setChatroom(user.uuid);
//             rootStore.chatStore.setFriendName(user.username);
//           }}
//         >
//           <Avatar
//             isSearch={true}
//             src="https://scontent-frt3-1.xx.fbcdn.net/v/t1.30497-1/cp0/c18.0.60.60a/p60x60/84241059_189132118950875_4138507100605120512_n.jpg?_nc_cat=1&ccb=2&_nc_sid=dbb9e7&_nc_ohc=MptErBC1D4UAX850YxA&_nc_ht=scontent-frt3-1.xx&tp=27&oh=bf4dda367f66a8ea248e026dc05c4c9d&oe=5FDE9C73"
//           ></Avatar>
//           <Username isSearch={true}>{user.username}</Username>
//         </Item>
//       ))}
//     </Container>
//   );
// });

// const Container = styled.ul`
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
