import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { useSignInMutation, useSignUpMutation } from "../generated/graphql";
import { useRootStore } from "../stores/RootStore";
import { graphQLError } from "../utils/graphQLError";
import { NamedError } from "../utils/NamedError";

type IError = {
  login: null | Error;
  email: null | Error;
  password: null | Error;
  rePassword: null | Error;
};

export const Register = () => {
  const rootStore = useRootStore();
  const history = useHistory();
  const [login, setLogin] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [rePassword, setRePassword] = useState<string>("");

  const [error, setError] = useState<IError>({
    login: null,
    email: null,
    password: null,
    rePassword: null,
  });

  const [, signUp] = useSignUpMutation();
  const [, signIn] = useSignInMutation();

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const err = validateClientErrors();

    if (err.login || err.email || err.password || err.rePassword) {
      return;
    }

    const response = await signUp({
      options: { username: login, password, email },
    });

    if (response.error) {
      const invalidEmail = response.error.message.includes("Validation");
      const duplicateEmail = graphQLError(response.error, "email");
      const duplicateLogin = graphQLError(response.error, "username");

      const emailErr = invalidEmail
        ? response.error.graphQLErrors[0].extensions?.exception
            .validationErrors[0].constraints.isEmail
        : duplicateEmail;

      setError({
        login: duplicateLogin ? new Error("Login already taken.") : null,
        email: emailErr ? new Error("Email already taken.") : null,
        password: null,
        rePassword: null,
      });
    } else {
      const response = await signIn({
        options: { login, password },
      });
      if (response.error) {
        console.log("Err during loging in");
      } else {
        console.log("authorizing");
        rootStore.userStore.setIsAuth(true);
        console.log("authenticated");
        history.replace("/");
      }
    }
  };

  const validateClientErrors = () => {
    const errors: IError = {
      login: null,
      email: null,
      password: null,
      rePassword: null,
    };

    if (login.length === 0) {
      errors.login = new NamedError("Login cannot be empty.", "login");
    }

    if (email.length === 0) {
      errors.email = new NamedError("Email cannot be empty.", "email");
    }

    if (password.length <= 7) {
      errors.password = new NamedError(
        "Password has to contain at least 8 characters.",
        "password"
      );
    }

    if (rePassword.length <= 7) {
      errors.rePassword = new NamedError(
        "Password has to contain at least 8 characters.",
        "rePassword"
      );
    }

    if (rePassword.length >= 8 && password !== rePassword) {
      errors.rePassword = new NamedError(
        "Password doesn't match",
        "rePassword"
      );
    }

    return errors;
  };

  return (
    <Container>
      <Form>
        <Close onClick={() => history.replace("/login")} />
        <Header>Create a new account</Header>
        <Text>It's quick and easy.</Text>
        <Line />
        <Input
          placeholder="Login"
          onChange={(e) => setLogin(e.target.value)}
        ></Input>
        {error.login && <ErrorMessage>{error.login.message}</ErrorMessage>}
        <Input
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        ></Input>
        {error.email && <ErrorMessage>{error.email.message}</ErrorMessage>}
        <Input
          type="password"
          placeholder="New password"
          onChange={(e) => setPassword(e.target.value)}
        ></Input>
        {error.password && (
          <ErrorMessage>{error.password.message}</ErrorMessage>
        )}
        <Input
          type="password"
          placeholder="Repeat password"
          onChange={(e) => setRePassword(e.target.value)}
        ></Input>
        {error.rePassword && (
          <ErrorMessage>{error.rePassword.message}</ErrorMessage>
        )}
        <GreenLinkButton onClick={(e) => handleSubmit(e)}>
          Sign Up
        </GreenLinkButton>
      </Form>
    </Container>
  );
};
const Container = styled.div`
  display: grid;
  background: #ebedf0;
  height: 100%;
`;

const Form = styled.div`
  display: grid;
  grid-template-columns: minmax(240px, 432px);
  grid-row-gap: 12px;
  align-self: center;
  justify-self: center;
  background-color: #fff;
  padding: 16px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1), 0 8px 16px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  position: relative;
`;

const Close = styled.div`
  display: grid;
  justify-self: end;
  position: absolute;
  margin: 16px;
  height: 16px;
  width: 16px;
  background-image: url(assets/close.png);
  background-repeat: no-repeat;
  cursor: pointer;
`;

const Header = styled.div`
  color: #1c1e21;
  font-size: 32px;
  font-weight: bold;
`;

const Text = styled.div`
  color: #606770;
  line-height: 5px;
  font-size: 15px;
`;

const Line = styled.hr`
  width: 100%;
  border: 0;
  border-top: 1px solid #dadde1;
`;
const Input = styled.input<{ error?: boolean }>`
  width: 100%;
  border-radius: 6px;
  font-size: 17px;
  padding: 11px;
  box-sizing: border-box;
  border: ${({ error }) => (error ? "1px solid #f02849" : "1px solid #dddfe2")};
  color: #1d2129;
  &:focus {
    outline: none;
    border-color: ${({ error }) => (error ? "#f02849" : "#1877f2")};
    box-shadow: ${({ error }) =>
      error ? "0 0 0 2px #f8b6c1" : "0 0 0 2px #e7f3ff"};
    caret-color: #1877f2;
  }
  &::placeholder {
    color: #bec3c9;
  }
`;

const GreenLinkButton = styled.button`
  display: grid;
  color: #fff;
  font-weight: bold;
  border: none;
  border-radius: 6px;
  font-size: 17px;
  align-items: center;
  background-color: #42b72a;
  width: max-content;
  justify-self: center;
  padding: 8px 32px;
  cursor: pointer;
  outline: none;
  :hover {
    text-decoration: none;
    background-color: #36a420;
  }
  :active {
    text-decoration: none;
    background-color: #2b9217;
  }
`;

const ErrorMessage = styled.div`
  color: #f02849;
  font-size: 13px;
`;
