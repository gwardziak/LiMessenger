import React from "react";
import { Subscription } from "urql";
const newMessages = `
  subscription  {
    newMessage {
      id
    }
  }
`;

export const Test = () => (
  <Subscription query={newMessages}>
    {({ data }) => {
      const { newPokemon } = data;
      return (
        <>
          <h1>
            #{newPokemon.id} {newPokemon}
          </h1>
        </>
      );
    }}
  </Subscription>
);
