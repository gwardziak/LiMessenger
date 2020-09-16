import React from "react";
import styled from "styled-components";
import { Route } from "type-route";
import { useSignInMutation } from "../../generated/graphql";
import { routes } from "../../router";
import { Link as StyledLink } from "../../ui/Link";

type Props = {
  route: Route<typeof routes.landing>;
};

export const Login = (props: Props) => {
  const { route } = props;
  const options = { login: "loser", password: "password" };
  const [, login] = useSignInMutation();

  const handleClick = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    const res = await login({ options });

    console.log(res);
  };
  return (
    <LoginContainer>
      <FormContainer>
        <Box>
          <Input type="text" placeholder="Email address or login" />
        </Box>
        <Box>
          <Input type="password" placeholder="Password" />
        </Box>
        <Box>
          <BlueButton onClick={(e) => handleClick(e)}>Log In</BlueButton>
        </Box>
        <Box>
          <BlueLinkButton {...routes.forgotCredentials().link}>
            Forgotten account?
          </BlueLinkButton>
        </Box>
        <BoxWithLine></BoxWithLine>
        <Box>
          <GreenLinkButton {...routes.register().link}>
            Create New Account
          </GreenLinkButton>
        </Box>
      </FormContainer>
      <Box>
        <BoldLink>Create a Page</BoldLink> for a celebrity, band or business.
      </Box>
    </LoginContainer>
  );
};

const Input = styled.input`
  &:focus {
    outline: none;

    ::placeholder,
    ::-webkit-input-placeholder {
      color: #bec3c9;
    }
    :-ms-input-placeholder {
      color: #bec3c9;
    }
  }

  border-radius: 6px;
  font-size: 17px;
  padding: 14px 16px;
  width: 330px;
  border: 1px solid #dddfe2;
  color: #1d2129;
  vertical-align: middle;
`;

const BlueButton = styled.button`
  &:focus {
    outline: none;
  }

  background-color: #1877f2;
  border: none;
  border-radius: 6px;
  font-size: 20px;
  line-height: 48px;
  padding: 0 16px;
  width: 332px;
  cursor: pointer;
  display: inline-block;
  text-decoration: none;
  white-space: nowrap;
  color: #fff;
  font-weight: bold;
`;

const Box = styled.div`
  padding: 6px 0;
  display: block;
  text-align: center;
`;

const BoxWithLine = styled(Box)`
  border-bottom: 1px solid #dadde1;
  margin: 5px 16px 20px;
`;

const BlueLinkButton = styled(StyledLink)`
  color: #1877f2;

  font-weight: 500;
`;

const GreenLinkButton = styled(StyledLink)`
  :hover {
    text-decoration: none;
    background-color: #36a420;
  }

  :active {
    text-decoration: none;
    background-color: #2b9217;
  }

  color: #fff;
  font-weight: bold;
  border: none;
  border-radius: 6px;
  font-size: 17px;
  line-height: 48px;
  padding: 0 16px;
  display: inline-block;
  white-space: nowrap;
  background-color: #42b72a;
  margin-bottom: 20px;
`;

const BoldLink = styled(StyledLink)`
  font-weight: 600;
`;

const FormContainer = styled.form`
  dipslay: block;
  -webkit-align-items: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  background-color: #fff;
  border: none;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1), 0 8px 16px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
  margin: 40px 0 0;

  padding: 10px 0 28px;
  padding-bottom: 10px;
  margin-bottom: 20px;
  width: 396px;
`;

const LoginContainer = styled.div`
  display: block;
  width: 396px;
  height: 456px;
  margin: auto;
  margin-top: 100px;
`;
