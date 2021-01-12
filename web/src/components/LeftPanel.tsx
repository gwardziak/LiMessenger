import React, { useRef, useState } from "react";
import { useClickAway } from "react-use";
import styled from "styled-components";
import { useFindUserQuery } from "../generated/graphql";
import { mediaQuery } from "../utils/css/cssMedia";
import { useMatchesMediaQuery } from "../utils/css/useMatchesMediaQuery";
import { MyScrollbar } from "../utils/Scrollbar";
import { FriendList } from "./FriendList";
import { SearchBar } from "./SearchBar";
import { SearchList } from "./SearchList";

export const LeftPanel = () => {
  const isBg = useMatchesMediaQuery([mediaQuery.bg]);
  const [isSearchListVisible, setIsSearchListVisible] = useState<boolean>(
    false
  );
  const [input, setInput] = useState<string>("");
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

    setIsSearchListVisible(false);
  });

  return (
    <Container>
      {isBg && (
        <SearchBar
          update={update}
          input={input}
          setInput={setInput}
          setIsVisible={setIsSearchListVisible}
          isVisible={isSearchListVisible}
        />
      )}
      <MyScrollbar autoHide noScrollX>
        {isSearchListVisible ? (
          <SearchList
            ref={searchListRef}
            setIsVisible={setIsSearchListVisible}
            data={data}
            error={error}
          />
        ) : (
          <FriendList />
        )}
      </MyScrollbar>
    </Container>
  );
};

const Container = styled.div`
  grid-area: leftPanel;
  display: grid;
  grid-template-rows: 36px 1fr;
  grid-row-gap: 16px;
  @media ${mediaQuery.xs}, ${mediaQuery.sm}, ${mediaQuery.md} {
    grid-template-rows: 1fr; //64px
  }
`;

// import React, { useRef, useState } from "react";
// import { useClickAway } from "react-use";
// import styled from "styled-components";
// import { useFindUserQuery } from "../generated/graphql";
// import { mediaQuery } from "../utils/css/cssMedia";
// import { useMatchesMediaQuery } from "../utils/css/useMatchesMediaQuery";
// import { MyScrollbar } from "../utils/Scrollbar";
// import { FriendList } from "./FriendList";
// import { SearchBar } from "./SearchBar";
// import { SearchList } from "./SearchList";

// export const LeftPanel = () => {
//   const isBg = useMatchesMediaQuery([mediaQuery.bg]);
//   const [isSearchListVisible, setIsSearchListVisible] = useState<boolean>(
//     false
//   );
//   const [input, setInput] = useState<string>("");
//   const searchListRef = useRef(null);
//   const [{ data, error }, update] = useFindUserQuery({
//     variables: { phase: input },
//     pause: true,
//   });

//   useClickAway(searchListRef, (e: any) => {
//     if (
//       e.srcElement.attributes.name?.value === "SearchInput" ||
//       e.srcElement.attributes.title?.value === "magnifierImg"
//     ) {
//       return;
//     }

//     setIsSearchListVisible(false);
//   });

//   return (
//     <MyScrollbar autoHide noScrollX>
//       <Container>
//         {isBg && (
//           <SearchBar
//             update={update}
//             input={input}
//             setInput={setInput}
//             setIsVisible={setIsSearchListVisible}
//             isVisible={isSearchListVisible}
//           />
//         )}
//         {isSearchListVisible ? (
//           <SearchList
//             ref={searchListRef}
//             setIsVisible={setIsSearchListVisible}
//             data={data}
//             error={error}
//           />
//         ) : (
//           <FriendList />
//         )}
//       </Container>
//     </MyScrollbar>
//   );
// };

// const Container = styled.div`
//   grid-area: LeftPanel;
//   display: grid;
//   grid-template-rows: 36px 1fr;
//   grid-row-gap: 16px;
//   @media ${mediaQuery.xs}, ${mediaQuery.sm}, ${mediaQuery.md} {
//     grid-template-rows: 64px;
//   }
// `;
