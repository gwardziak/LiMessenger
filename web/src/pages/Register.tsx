import React from "react";
import { useMessageQuery } from "../generated/graphql";

export const Register = () => {
  const [{ fetching, data, error }] = useMessageQuery({
    variables: { uuid: "a8b26413-8389-4489-80b9-1dbceaa2c6e3" },
  });

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

  if (!data?.message) {
    return (
      <>
        <p>could not find post</p>
      </>
    );
  }

  return (
    <>
      <div>
        <p>Register</p>
        <p>{data.message.text}</p>
      </div>
    </>
  );
};
