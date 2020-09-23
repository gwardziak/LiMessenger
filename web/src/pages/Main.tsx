import React from "react";
import styled from "styled-components";
import { mediaQuery } from "../utils/css/cssMedia";

export const Main = () => {
  const users = [1, 2, 3, 4, 5, 5, 6];

  return (
    <Container>
      <LeftContainer>
        <Nav>
          <AvaContainer>
            <Ava src="https://scontent-frx5-1.xx.fbcdn.net/v/t31.0-1/cp0/c0.23.60.60a/p60x60/20507795_749401998564414_4605004011507775542_o.jpg?_nc_cat=110&_nc_sid=dbb9e7&_nc_ohc=Af0ZRd917-sAX8OykP7&_nc_ht=scontent-frx5-1.xx&oh=0fac05dc8c491e475a491a3afcdbb493&oe=5F8D7C12"></Ava>
          </AvaContainer>
          <Czaty>Czaty</Czaty>
          <OptionsContainer></OptionsContainer>
          <NewRoomContainer></NewRoomContainer>
          <NewMessageContainer></NewMessageContainer>
        </Nav>
        <FriendList>
          {users.map(() => (
            <FriendListItem>
              <AvatarContainer>
                <Avatar src="https://scontent-frt3-1.xx.fbcdn.net/v/t1.0-1/p100x100/1908321_487589871394123_3669658637878936630_n.jpg?_nc_cat=102&_nc_sid=7206a8&_nc_ohc=NKZftzVVph4AX-MnHgN&_nc_ht=scontent-frt3-1.xx&tp=6&oh=a21acec7b9417379270463d5f54f872c&oe=5F8D3C5D" />
              </AvatarContainer>
              <MessageContainer>
                <Username>Tomasz Grzyb Martyński </Username>
                <Message>Rucham ci starego</Message>
              </MessageContainer>
            </FriendListItem>
          ))}
        </FriendList>
      </LeftContainer>
      <Chat>
        <MiddleContainer>
          <path
            id="Fill-1"
            d="M18,11.00025 C14.1345,11.00025 11.0005,14.13425 11.0005,18.00025 C11.0005,21.86575 14.1345,24.99975 18,24.99975 C21.8655,24.99975 24.9995,21.86575 24.9995,18.00025 C24.9995,14.13425 21.8655,11.00025 18,11.00025 Z M31,17.42725 L31,18.57325 C31,19.14125 30.679,19.66025 30.171,19.91475 L28.638,20.68075 C28.2975,20.85125 28.0215,21.13725 27.8915,21.49475 C27.7675,21.83575 27.624,22.16775 27.4665,22.49175 C27.3,22.83375 27.286,23.23025 27.406,23.59175 L27.96,25.25225 C28.1395,25.79125 27.999,26.38575 27.5975,26.78725 L26.787,27.59775 C26.3855,27.99925 25.791,28.13975 25.2525,27.95975 L23.595,27.40725 C23.234,27.28725 22.837,27.30125 22.495,27.46775 C22.1705,27.62575 21.837,27.76975 21.4945,27.89425 C21.1355,28.02475 20.849,28.30125 20.6785,28.64275 L19.9145,30.17075 C19.6605,30.67875 19.141,31.00025 18.573,31.00025 L17.427,31.00025 C16.859,31.00025 16.3395,30.67875 16.0855,30.17075 L15.3215,28.64275 C15.151,28.30125 14.864,28.02475 14.5055,27.89425 C14.1625,27.76975 13.83,27.62575 13.505,27.46775 C13.163,27.30125 12.766,27.28725 12.405,27.40725 L10.7475,27.95975 C10.2085,28.13975 9.6145,27.99925 9.213,27.59775 L8.4025,26.78725 C8.0005,26.38575 7.8605,25.79125 8.04,25.25225 L8.594,23.59175 C8.714,23.23025 8.7,22.83375 8.5335,22.49175 C8.376,22.16775 8.2325,21.83575 8.1085,21.49475 C7.9785,21.13725 7.7025,20.85125 7.362,20.68075 L5.829,19.91475 C5.321,19.66025 5,19.14125 5,18.57325 L5,17.42725 C5,16.85875 5.321,16.33925 5.829,16.08525 L7.362,15.31925 C7.7025,15.14875 7.9785,14.86275 8.1085,14.50525 C8.2325,14.16425 8.376,13.83225 8.5335,13.50825 C8.7,13.16625 8.714,12.76975 8.594,12.40825 L8.04,10.74775 C7.8605,10.20875 8.0005,9.61475 8.4025,9.21275 L9.213,8.40275 C9.6145,8.00075 10.2085,7.86025 10.7475,8.04025 L12.405,8.59275 C12.766,8.71275 13.163,8.69875 13.505,8.53225 C13.83,8.37425 14.1625,8.23025 14.5055,8.10575 C14.864,7.97525 15.151,7.69875 15.3215,7.35725 L16.0855,5.82925 C16.3395,5.32125 16.859,5.00025 17.427,5.00025 L18.573,5.00025 C19.141,5.00025 19.6605,5.32125 19.9145,5.82925 L20.6785,7.35725 C20.849,7.69875 21.1355,7.97525 21.4945,8.10575 C21.837,8.23025 22.1705,8.37425 22.495,8.53225 C22.837,8.69875 23.234,8.71275 23.595,8.59275 L25.2525,8.04025 C25.791,7.86025 26.3855,8.00075 26.787,8.40275 L27.5975,9.21275 C27.999,9.61475 28.1395,10.20875 27.96,10.74775 L27.406,12.40825 C27.286,12.76975 27.3,13.16625 27.4665,13.50825 C27.624,13.83225 27.7675,14.16425 27.8915,14.50525 C28.0215,14.86275 28.2975,15.14875 28.638,15.31925 L30.171,16.08525 C30.679,16.33925 31,16.85875 31,17.42725 Z"
            fill="#000000"
          ></path>
        </MiddleContainer>
        <RightContainer>s</RightContainer>
      </Chat>
    </Container>
  );
};

const Container = styled.div`
  background-color: #fff;
  display: flex;
  font-size: 14px;
  min-width: 500px;
`;

const LeftContainer = styled.div`
  min-width: 300px;
  max-width: 420px;
  flex: 0 0 25%;

  @media ${mediaQuery.xs}, ${mediaQuery.sm}, ${mediaQuery.md}, {
    min-width: 80px;
    max-width: 80px;
  }
`;
//

const Nav = styled.div`
  align-items: center;
  box-sizing: border-box;
  display: flex;
  height: 60px;
  overflow: hidden;
  padding: 10px 16px 10px 16px;
`;
const AvaContainer = styled.div`
  display: flex;
  width: 50px;
`;

const Ava = styled.img`
  border-radius: 50%;
  height: 40px;
  width: 40px;
`;

const Czaty = styled.h1`
  color: rgba(0, 0, 0, 1);
  font-size: 24px;
  font-weight: bold;
  overflow: hidden;
  text-overflow: ellipsis;
  transition: all 0.25s;
  margin: 0px;
`;

const OptionsContainer = styled.div`
  align-items: center;
  background-color: rgba(0, 0, 0, 0.04);
  border-radius: 99px;
  display: flex;
  flex: 0 0 auto;
  justify-content: center;
  overflow: hidden;
  transition: height 0.25s, margin-left 0.25s, width 0.25s;
  height: 36px;
  margin-left: 12px;
  width: 36px;
`;

const NewRoomContainer = styled.div`
  width: 36px;
  margin-left: 12px;
  justify-content: center;
  height: 36px;
  display: flex;
  flex: 0 0 auto;
  border-bottom-left-radius: 99px;
  border-bottom-right-radius: 99px;
  border-top-right-radius: 99px;
  border-top-left-radius: 99px;
  background-color: rgba(0, 0, 0, 0.04);
  align-items: center;
  cursor: pointer;
`;

const NewMessageContainer = styled.a`
  align-items: center;
  background-color: rgba(0, 0, 0, 0.04);
  border-radius: 99px;
  display: flex;
  flex: 0 0 auto;
  justify-content: center;
  transition: width 0.25s, height 0.25s;
  height: 36px;
  margin-left: 12px;
  width: 36px;
`;

//

const FriendList = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
`;

const FriendListItem = styled.li`
  display: flex;
  height: 64px;
  position: relative;
  background: gray;
  padding: 0 8px;
`;

const AvatarContainer = styled.div`
  margin-right: 12px;
  display: flex;
  align-items: center;
`;

const Avatar = styled.img`
  height: 50px;
  width: 50px;
  border-radius: 50%;

  @media ${mediaQuery.xs}, ${mediaQuery.sm}, ${mediaQuery.md}, {
    padding-left: 8px;
    padding-right: 8px;
  }
`;

const MessageContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 1 0px;
  justify-content: center;
  padding: 0 16px 0 0;
  font-weight: 400;

  @media ${mediaQuery.xs}, ${mediaQuery.sm}, ${mediaQuery.md}, {
    display: none;
  }
`;

const Username = styled.div`
  font-size: 15px;
  color: rgba(0, 0, 0, 1);
  text-overflow: ellipsis;
  white-space: nowrap;
  line-height: 1.4;
`;

const Message = styled.div`
  margin-right: 12px;
  color: rgba(153, 153, 153, 1);
  font-size: 13px;
`;

const MiddleContainer = styled.div`
  border-left: 1px solid rgba(0, 0, 0, 0.1);
  flex: 0 2 33.33%;
  max-width: 420px;
  min-width: 200px;
  background: brown;
`;

const Chat = styled.div`
  display: flex;
  flex: 1 1 0%;
  flex-direction: row-reverse;
`;

const RightContainer = styled.div`
  flex: 2 0 0%;
  overflow: hidden;
  position: relative;
  display: flex;
  flex-direction: column;
  background: red;
`;
