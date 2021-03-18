import React, { useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { useSignInMutation } from "../generated/graphql";
import { useRootStore } from "../stores/RootStore";
import { Link as StyledLink } from "../ui/Link";
import { graphQLError } from "../utils/graphQLError";

export const Login = () => {
  const rootStore = useRootStore();
  const history = useHistory();
  const [loginCredential, setLoginCredential] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loginError, setLoginError] = useState<null | string>(null);
  const [passwordError, setPasswordError] = useState<null | string>(null);
  const loginRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const [, login] = useSignInMutation();

  const inputValidation = (input: { name: string; value: string }) => {
    const { name, value } = input;

    if (value.trim() === "") {
      return `${name} cannot be empty.`;
    }
    return null;
  };

  const clientErrors = () => {
    const usernameInput = inputValidation({
      name: "Login",
      value: loginCredential,
    });
    const passwordInput = inputValidation({
      name: "Password",
      value: password,
    });

    if (usernameInput) {
      setLoginError(usernameInput);
      loginRef.current!.focus();
    }

    if (passwordInput) {
      setPasswordError(passwordInput);
      loginRef.current!.focus();
    }

    if (usernameInput || passwordInput) {
      return true;
    }

    return false;
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (clientErrors()) {
      return;
    }

    const response = await login({
      options: { login: loginCredential, password },
    });

    if (response.error) {
      const loginError = graphQLError(response.error, "login");
      const passwordError = graphQLError(response.error, "password");
      setLoginError(loginError);
      setPasswordError(passwordError);

      if (loginError) {
        loginRef.current!.focus();
      }

      if (passwordError) {
        passwordRef.current!.focus();
      }
    } else {
      console.log("authorizing");
      localStorage.setItem("authToken", response.data!.signIn);
      rootStore.userStore.setIsAuth(true);
      console.log("authenticated");
      history.replace("/");
    }
  };

  return (
    <Container>
      <FormContainer>
        <Input
          ref={loginRef}
          error={!!loginError}
          type="text"
          placeholder="Login"
          onChange={(e) => setLoginCredential(e.target.value)}
        />
        {loginError && <Error>{loginError}</Error>}
        <Input
          ref={passwordRef}
          error={!!passwordError}
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        {passwordError && <Error>{passwordError}</Error>}
        <BlueButton onClick={(e) => handleSubmit(e)}>Log In</BlueButton>

        <BlueLinkButton to="/forgot-password">
          Forgotten account?
        </BlueLinkButton>

        <Line />
        <GreenLinkButton to="/register">Create New Account</GreenLinkButton>
      </FormContainer>
    </Container>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-columns: minmax(240px, 396px);
  align-self: center;
  justify-self: center;
`;

const FormContainer = styled.form`
  display: grid;
  grid-template-columns: 1fr;
  grid-row-gap: 12px;
  justify-items: center;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1), 0 8px 16px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
  padding: 24px 16px;
`;

const Input = styled.input<{ error?: boolean }>`
  width: 100%;
  border-radius: 6px;
  font-size: 17px;
  padding: 14px 16px;
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

const BlueButton = styled.button`
  display: grid;
  background-color: #1877f2;
  align-items: center;
  width: 100%;
  border: none;
  border-radius: 6px;
  font-size: 20px;
  color: #fff;
  font-weight: bold;
  cursor: pointer;
  height: 48px;

  &:focus {
    outline: none;
  }

  &:hover {
    background-color: #166fe5;
  }
`;

const GreenLinkButton = styled(StyledLink)`
  display: grid;
  color: #fff;
  font-weight: bold;
  border: none;
  border-radius: 6px;
  font-size: 17px;
  align-items: center;
  justify-content: center;
  padding: 0 16px;
  background-color: #42b72a;
  cursor: pointer;
  height: 48px;
  margin-top: 15px;

  :hover {
    text-decoration: none;
    background-color: #36a420;
  }
  :active {
    text-decoration: none;
    background-color: #2b9217;
  }
`;
const BlueLinkButton = styled(StyledLink)`
  color: #1877f2;
  font-weight: 500;
  height: 15px;
`;

const Line = styled.hr`
  border: 0;
  border-bottom: 1px solid #dadde1;
  width: 100%;
  height: 20px;
`;

const Error = styled.div`
  color: #f02849;
  font-size: 13px;
`;
