import React, { useState } from "react";
import styled from "styled-components";
import { useFindUserQuery } from "../generated/graphql";

export const SearchBar = () => {
  const [input, setInput] = useState<string>("");

  const [{ fetching, data, error }, update] = useFindUserQuery({
    pause: true,
    variables: { phase: input },
  });

  // // const [{ fetching, data, error }, getUser] = useFindUserQuery({
  // //   variables: { phase: input },
  // // });

  if (fetching) {
    return (
      <>
        <div>loading...</div>
      </>
    );
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  // if (!data?.findUser) {
  //   return (
  //     <>
  //       <p>could not find post</p>
  //     </>
  //   );
  // }

  console.log(data, "fetched");

  let timer: number;
  const timeout = 1000;

  // // when user is pressing down on keys, clear the timeout
  function handleKeyPress() {
    clearTimeout(timer);
    console.log("typing..");
  }

  // when the user has stopped pressing on keys, set the timeout
  // if the user presses on keys before the timeout is reached, then this timeout is canceled
  async function handleKeyUp() {
    clearTimeout(timer); // prevent errant multiple timeouts from being generated
    timer = setTimeout(async () => {
      update({ requestPolicy: "network-only" });

      // console.log(data.data);
      console.log("Sent Req");
      // console.log(getUser({ pause: false }));
      // console.log(data?.findUser);
      // onFetch();

      // console.log(chuj);
      // onFetch(async (result: any) => {
      //   console.log(await result);
      // });
      // console.log(chuj);

      // const response = await update({
      //   options: { variables: { phase: input }, pause: false },
      // });

      // console.log(response());
      // console.log(data);

      // console.log(chuj);
      // if (fetching) {
      //   console.log(fetching, "fetching");
      //   // return;
      // }

      // if (error) {
      //   console.log("Error");
      //   // return <div>{error.message}</div>;
      //   // return;
      // }

      // if (!data?.findUser) {
      //   console.log("No data");
      //   // return;
      //   // return (
      //   //   <>
      //   //     <p>could not find post</p>
      //   //   </>
      //   // );
      // }
      // console.log(await );
      // console.log(data?.findUser);
      // const [{ fetching, data, error }, getUser] = useFindUserQuery({
      //   variables: { phase: input },
      // });

      // console.log(data);
      // const response = getUser({
      //   variables: { phase: input },
      // });
      // console.log(response);
    }, timeout);
  }
  console.log(data);
  return (
    <Container>
      <SearchBarInput
        placeholder="Szukaj w Messengerze"
        value={input}
        onChange={(e) => {
          setInput(e.target.value);
        }}
        onKeyUp={handleKeyUp}
        onKeyPress={handleKeyPress}
      />
      <MagnifierImg />
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  margin: 4px 16px 0;
`;

const MagnifierImg = styled.div`
  height: 16px;
  width: 16px;
  top: 10px;
  left: 12px;
  position: absolute;

  background-position: 0 -668px;
  background-image: url("assets/staticImages.png");
  background-size: 52px 718px;
  background-repeat: no-repeat;
`;

const SearchBarInput = styled.input`
  background-color: rgba(0, 0, 0, 0.04);
  border-radius: 50px;
  font-size: 15px;
  padding: 0px 16px 0px 36px;
  text-align: left;
  outline: 0;
  border-style: none;
  height: 36px;
  width: 100%;
  box-sizing: border-box;

  &::placeholder {
    color: rgba(0, 0, 0, 0.4);
    font-family: Helvetica Neue, Segoe UI, Helvetica, Arial, sans-serif;
  }
`;
