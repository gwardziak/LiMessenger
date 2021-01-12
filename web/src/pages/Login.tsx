import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { useSignInMutation } from "../generated/graphql";
import { useRootStore } from "../stores/RootStore";
import { Link as StyledLink } from "../ui/Link";
export const Login = () => {
  const rootStore = useRootStore();
  const [loginCredential, setLoginCredential] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [, login] = useSignInMutation();
  const history = useHistory();

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const response = await login({
      options: { login: loginCredential, password },
    });

    if (response.error) {
      console.log(response.error);
    } else {
      console.log("authorizing");

      rootStore.userStore.setIsAuth(true);

      console.log("authenticated");

      history.replace("/");
    }
  };

  return (
    <Container>
      <FormContainer>
        <Input
          type="text"
          placeholder="Email address or login"
          onChange={(e) => setLoginCredential(e.target.value)}
        />

        <Input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <BlueButton onClick={(e) => handleSubmit(e)}>Log In</BlueButton>

        <BlueLinkButton to="/forgot-password">
          Forgotten account?
        </BlueLinkButton>

        <Line />
        <GreenLinkButton to="/register">Create New Account</GreenLinkButton>
      </FormContainer>
      <Box>
        <BoldLink to="/create-fanpage">Create a Page</BoldLink> for a celebrity,
        band or business.
      </Box>
    </Container>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-columns: minmax(240px, 396px);
  grid-template-rows: minmax(1fr, 456px);
  align-self: center;
  justify-self: center;
`;

const FormContainer = styled.form`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 52px 52px 48px 20px 15px 48px;
  grid-row-gap: 12px;
  justify-items: center;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1), 0 8px 16px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
  padding: 24px 16px;
`;

const Input = styled.input`
  width: 100%;
  border-radius: 6px;
  font-size: 17px;
  padding: 14px 16px;
  box-sizing: border-box;
  border: 1px solid #dddfe2;
  color: #1d2129;

  &:focus {
    outline: none;
    border-color: #1877f2;
    box-shadow: 0 0 0 2px #e7f3ff;
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
  height: fit-content;
`;

const Line = styled.div`
  border-bottom: 1px solid #dadde1;
  width: 100%;
  height: fit-content;
`;

const BoldLink = styled(StyledLink)`
  font-weight: 600;
`;

const Box = styled.div`
  padding: 6px 0;
  text-align: center;
  margin-top: 20px;
`;
