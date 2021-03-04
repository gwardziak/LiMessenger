import { observer } from "mobx-react-lite";
import React, { useState } from "react";
import styled from "styled-components";
import { useRootStore } from "../stores/RootStore";

export const SharedFilesMenu = observer(() => {
  const rootStore = useRootStore();
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [toggle, setToggle] = useState<boolean>(false);
  const roomId = rootStore.chatStore.activeChat;
  const fileInfo = rootStore.attachmentsStore.filesInfo.get(roomId ?? "");

  const handleLoadMore = async () => {
    if (!fileInfo) {
      return;
    }

    if (!isFetching && fileInfo.hasMore) {
      try {
        setIsFetching(true);
        await rootStore.attachmentsStore.fetchAttachments(false);
        setIsFetching(false);
        console.log("Done fetching");
      } catch (ex) {
        console.log("Error during fetching messages", ex.message);
      }
    }
  };

  return (
    <Container isToggle={toggle}>
      <Header isToggle={toggle} onClick={() => setToggle(!toggle)}>
        <HeaderText>Udostępnione pliki</HeaderText>
        <HeaderIcon isToggle={toggle} />
      </Header>

      {toggle && (
        <List>
          {rootStore.attachmentsStore.fileAttachments.map((file) => (
            <Item key={file.uuid} href={`http://localhost:4000/${file.link}`}>
              <ItemIcon></ItemIcon>
              <ItemText>{file.name}</ItemText>
            </Item>
          ))}

          {fileInfo?.hasMore && (
            <ShowMore onClick={handleLoadMore}>Show More</ShowMore>
          )}
        </List>
      )}
    </Container>
  );
});

const Container = styled.div<{ isToggle: boolean }>`
  grid-area: sharedFilesMenu;
  display: grid;
  grid-template-rows: ${(props) => (props.isToggle ? "48px 1fr" : "48px")};
  grid-template-columns: 1fr;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  width: 100%;
  cursor: pointer;
  margin-bottom: ${(props) => (props.isToggle ? "16px" : "0")};
`;

const Header = styled.div<{ isToggle: boolean }>`
  display: grid;
  grid-template-rows: 20px;
  grid-template-columns: 1fr 20px;
  padding: 14px;

  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
  }
`;

const HeaderText = styled.div`
  color: rgba(0, 0, 0, 0.34);
  font-size: 13px;
  font-weight: bold;
  text-transform: uppercase;
`;

const HeaderIcon = styled.div<{ isToggle: boolean }>`
  background-repeat: no-repeat;
  background-image: ${(props) =>
    props.isToggle ? "url(assets/up-arrow.png)" : "url(assets/down-arrow.png)"};
`;

const List = styled.ul`
  display: grid;
  grid-template-rows: 1fr;
  padding: 0 16px;
  list-style-type: none;
  margin: 0;
`;

const Item = styled.a`
  display: grid;
  grid-template-areas: "icon fileName";
  grid-template-columns: 24px 1fr;
  padding: 8px 0;
  line-height: 16px;
  grid-column-gap: 4px;
  text-decoration: none;

  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
  }
`;

const ItemIcon = styled.div`
  margin-left: 8px;
  background-image: url("assets/textFile.png");
  background-repeat: no-repeat;
  width: 16px;
  height: 16px;
`;

const ItemText = styled.div`
  color: rgb(5, 5, 5);
  overflow-wrap: break-word;
  font-size: 15px;
  font-weight: 500;
`;

const ShowMore = styled.div`
  width: fit-content;
  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
  }
`;

// import { observer } from "mobx-react-lite";
// import React, { useState } from "react";
// import styled from "styled-components";
// import { useRootStore } from "../stores/RootStore";

// export const SharedFilesMenu = observer(() => {
//   const [toggle, setToggle] = useState<boolean>(false);
//   const rootStore = useRootStore();

//   return (
//     <Container isToggle={toggle}>
//       <Header
//         isToggle={toggle}
//         onClick={() => {
//           setToggle(!toggle);
//           rootStore.attachmentsStore.fetchAttachments(true);
//         }}
//       >
//         <HeaderText>Udostępnione pliki</HeaderText>
//         <HeaderIcon isToggle={toggle} />
//       </Header>

//       {toggle && (
//         <List>
//           <Item>
//             <ItemIcon></ItemIcon>
//             <ItemText>Plik1234</ItemText>
//           </Item>
//           <Item>
//             <ItemIcon></ItemIcon>
//             <ItemText>Plik1234</ItemText>
//           </Item>
//           <Item>
//             <ItemIcon></ItemIcon>
//             <ItemText>Plik1234</ItemText>
//           </Item>
//         </List>
//       )}
//     </Container>
//   );
// });
