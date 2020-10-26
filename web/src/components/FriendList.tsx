import React from "react";
import styled from "styled-components";
import { Avatar as DefaultAvatar } from "../ui/Avatar";
import { mediaQuery } from "../utils/css/cssMedia";
import { useMatchesMediaQuery } from "../utils/css/useMatchesMediaQuery";
import { MyScrollbar } from "../utils/Scrollbar";
import { SearchBar } from "./SearchBar";

export const FriendList = () => {
  const isBg = useMatchesMediaQuery([mediaQuery.bg]);

  return (
    <MyScrollbar autoHide noScrollX>
      <Container>
        {isBg && <SearchBar />}
        <List>
          <ItemSelected>
            <Avatar src="https://scontent-frt3-1.xx.fbcdn.net/v/t1.30497-1/c29.0.100.100a/p100x100/84241059_189132118950875_4138507100605120512_n.jpg?_nc_cat=1&_nc_sid=7206a8&_nc_ohc=zLcWETlL6TIAX95SnPH&_nc_ht=scontent-frt3-1.xx&_nc_tp=27&oh=062a10092c5cb258d651a46799cf7c89&oe=5FA0C29E"></Avatar>
            <Username>Radosław </Username>
            <Message>aaaaaaaaaaaa</Message>
          </ItemSelected>
          <Item>
            <Avatar src="https://scontent-frt3-1.xx.fbcdn.net/v/t1.30497-1/c29.0.100.100a/p100x100/84241059_189132118950875_4138507100605120512_n.jpg?_nc_cat=1&_nc_sid=7206a8&_nc_ohc=zLcWETlL6TIAX95SnPH&_nc_ht=scontent-frt3-1.xx&_nc_tp=27&oh=062a10092c5cb258d651a46799cf7c89&oe=5FA0C29E"></Avatar>
            <Username>Radosław</Username>
            <Message>aaaaaaaaaaaa</Message>
          </Item>
          <Item>
            <Avatar src="https://scontent-frt3-1.xx.fbcdn.net/v/t1.30497-1/c29.0.100.100a/p100x100/84241059_189132118950875_4138507100605120512_n.jpg?_nc_cat=1&_nc_sid=7206a8&_nc_ohc=zLcWETlL6TIAX95SnPH&_nc_ht=scontent-frt3-1.xx&_nc_tp=27&oh=062a10092c5cb258d651a46799cf7c89&oe=5FA0C29E"></Avatar>
            <Username>Radosław</Username>
            <Message>aaaaaaaaaaaa</Message>
          </Item>{" "}
          <Item>
            <Avatar src="https://scontent-frt3-1.xx.fbcdn.net/v/t1.30497-1/c29.0.100.100a/p100x100/84241059_189132118950875_4138507100605120512_n.jpg?_nc_cat=1&_nc_sid=7206a8&_nc_ohc=zLcWETlL6TIAX95SnPH&_nc_ht=scontent-frt3-1.xx&_nc_tp=27&oh=062a10092c5cb258d651a46799cf7c89&oe=5FA0C29E"></Avatar>
            <Username>Radosław</Username>
            <Message>aaaaaaaaaaaa</Message>
          </Item>{" "}
          <Item>
            <Avatar src="https://scontent-frt3-1.xx.fbcdn.net/v/t1.30497-1/c29.0.100.100a/p100x100/84241059_189132118950875_4138507100605120512_n.jpg?_nc_cat=1&_nc_sid=7206a8&_nc_ohc=zLcWETlL6TIAX95SnPH&_nc_ht=scontent-frt3-1.xx&_nc_tp=27&oh=062a10092c5cb258d651a46799cf7c89&oe=5FA0C29E"></Avatar>
            <Username>Radosław</Username>
            <Message>aaaaaaaaaaaa</Message>
          </Item>{" "}
          <Item>
            <Avatar src="https://scontent-frt3-1.xx.fbcdn.net/v/t1.30497-1/c29.0.100.100a/p100x100/84241059_189132118950875_4138507100605120512_n.jpg?_nc_cat=1&_nc_sid=7206a8&_nc_ohc=zLcWETlL6TIAX95SnPH&_nc_ht=scontent-frt3-1.xx&_nc_tp=27&oh=062a10092c5cb258d651a46799cf7c89&oe=5FA0C29E"></Avatar>
            <Username>Radosław</Username>
            <Message>aaaaaaaaaaaa</Message>
          </Item>{" "}
          <Item>
            <Avatar src="https://scontent-frt3-1.xx.fbcdn.net/v/t1.30497-1/c29.0.100.100a/p100x100/84241059_189132118950875_4138507100605120512_n.jpg?_nc_cat=1&_nc_sid=7206a8&_nc_ohc=zLcWETlL6TIAX95SnPH&_nc_ht=scontent-frt3-1.xx&_nc_tp=27&oh=062a10092c5cb258d651a46799cf7c89&oe=5FA0C29E"></Avatar>
            <Username>Radosław</Username>
            <Message>aaaaaaaaaaaa</Message>
          </Item>{" "}
          <Item>
            <Avatar src="https://scontent-frt3-1.xx.fbcdn.net/v/t1.30497-1/c29.0.100.100a/p100x100/84241059_189132118950875_4138507100605120512_n.jpg?_nc_cat=1&_nc_sid=7206a8&_nc_ohc=zLcWETlL6TIAX95SnPH&_nc_ht=scontent-frt3-1.xx&_nc_tp=27&oh=062a10092c5cb258d651a46799cf7c89&oe=5FA0C29E"></Avatar>
            <Username>Radosław</Username>
            <Message>aaaaaaaaaaaa</Message>
          </Item>{" "}
          <Item>
            <Avatar src="https://scontent-frt3-1.xx.fbcdn.net/v/t1.30497-1/c29.0.100.100a/p100x100/84241059_189132118950875_4138507100605120512_n.jpg?_nc_cat=1&_nc_sid=7206a8&_nc_ohc=zLcWETlL6TIAX95SnPH&_nc_ht=scontent-frt3-1.xx&_nc_tp=27&oh=062a10092c5cb258d651a46799cf7c89&oe=5FA0C29E"></Avatar>
            <Username>Radosław</Username>
            <Message>aaaaaaaaaaaa</Message>
          </Item>{" "}
          <Item>
            <Avatar src="https://scontent-frt3-1.xx.fbcdn.net/v/t1.30497-1/c29.0.100.100a/p100x100/84241059_189132118950875_4138507100605120512_n.jpg?_nc_cat=1&_nc_sid=7206a8&_nc_ohc=zLcWETlL6TIAX95SnPH&_nc_ht=scontent-frt3-1.xx&_nc_tp=27&oh=062a10092c5cb258d651a46799cf7c89&oe=5FA0C29E"></Avatar>
            <Username>Radosław</Username>
            <Message>aaaaaaaaaaaa</Message>
          </Item>{" "}
          <Item>
            <Avatar src="https://scontent-frt3-1.xx.fbcdn.net/v/t1.30497-1/c29.0.100.100a/p100x100/84241059_189132118950875_4138507100605120512_n.jpg?_nc_cat=1&_nc_sid=7206a8&_nc_ohc=zLcWETlL6TIAX95SnPH&_nc_ht=scontent-frt3-1.xx&_nc_tp=27&oh=062a10092c5cb258d651a46799cf7c89&oe=5FA0C29E"></Avatar>
            <Username>Radosław</Username>
            <Message>aaaaaaaaaaaa</Message>
          </Item>{" "}
          <Item>
            <Avatar src="https://scontent-frt3-1.xx.fbcdn.net/v/t1.30497-1/c29.0.100.100a/p100x100/84241059_189132118950875_4138507100605120512_n.jpg?_nc_cat=1&_nc_sid=7206a8&_nc_ohc=zLcWETlL6TIAX95SnPH&_nc_ht=scontent-frt3-1.xx&_nc_tp=27&oh=062a10092c5cb258d651a46799cf7c89&oe=5FA0C29E"></Avatar>
            <Username>Radosław</Username>
            <Message>aaaaaaaaaaaa</Message>
          </Item>
        </List>
      </Container>
    </MyScrollbar>
  );
};

const Container = styled.div`
  grid-area: friendList;
  display: grid;
  grid-template-rows: 36px 1fr;
  grid-row-gap: 16px;

  @media ${mediaQuery.xs}, ${mediaQuery.sm}, ${mediaQuery.md}, {
    grid-template-rows: 64px;
  }
`;

const List = styled.ul`
  list-style-type: none;
  margin: 0 8px;
  padding: 0;
`;

const Item = styled.li`
  display: grid;
  grid-template-areas: "avatar username" "avatar message";
  grid-template-rows: 32px 32px;
  grid-template-columns: 50px 1fr;
  grid-column-gap: 12px;
  padding: 0 8px;
  align-items: center;

  @media ${mediaQuery.xs}, ${mediaQuery.sm}, ${mediaQuery.md}, {
    grid-template-rows: 64px;
    grid-template-columns: 62.2px;
    grid-template-areas: "avatar";
    justify-items: center;
    padding: 0;
  }
`;

//duplicate
const ItemSelected = styled.li`
  display: grid;
  grid-template-areas: "avatar username" "avatar message";
  grid-template-rows: 32px 32px;
  grid-template-columns: 50px 1fr;
  grid-column-gap: 12px;
  padding: 0 8px;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.05);
  border-radius: 10px;

  @media ${mediaQuery.xs}, ${mediaQuery.sm}, ${mediaQuery.md}, {
    grid-template-rows: 64px;
    grid-template-columns: 62.2px;
    grid-template-areas: "avatar";
    justify-items: center;
    padding: 0;
  }
`;

const Avatar = styled(DefaultAvatar)`
  grid-area: avatar;
`;

const Username = styled.div`
  grid-area: username;
  font-size: 15px;
  text-overflow: ellipsis;
  white-space: nowrap;
  align-self: flex-end;
  overflow: hidden;

  @media ${mediaQuery.xs}, ${mediaQuery.sm}, ${mediaQuery.md}, {
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

  @media ${mediaQuery.xs}, ${mediaQuery.sm}, ${mediaQuery.md}, {
    display: none;
  }
`;
