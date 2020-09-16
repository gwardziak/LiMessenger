import React from "react";
import { Route } from "type-route";
import { useMessageQuery } from "../../generated/graphql";
import { routes } from "../../router";

type Props = {
  route: Route<typeof routes.register>;
};

export const Register = (props: Props) => {
  const { route } = props;
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
