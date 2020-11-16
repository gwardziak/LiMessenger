import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
};

export type Query = {
  __typename?: 'Query';
  messages: Array<Message>;
  firstMessages: Array<Message>;
  me?: Maybe<User>;
};

export type Message = {
  __typename?: 'Message';
  uuid: Scalars['String'];
  text: Scalars['String'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  sender: UserMessage;
  recipient: UserMessage;
};


export type UserMessage = {
  __typename?: 'UserMessage';
  uuid: Scalars['String'];
  username: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  uuid: Scalars['String'];
  username: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
  accountVerified: Scalars['Boolean'];
};

export type Mutation = {
  __typename?: 'Mutation';
  sendMessage: Scalars['Boolean'];
  signUp: Scalars['Boolean'];
  signIn: Scalars['Boolean'];
};


export type MutationSendMessageArgs = {
  recipentUuid: Scalars['String'];
  message: Scalars['String'];
};


export type MutationSignUpArgs = {
  options: SignUpInput;
};


export type MutationSignInArgs = {
  options: SignInInput;
};

export type SignUpInput = {
  username: Scalars['String'];
  password: Scalars['String'];
  email: Scalars['String'];
};

export type SignInInput = {
  login: Scalars['String'];
  password: Scalars['String'];
};

export type Subscription = {
  __typename?: 'Subscription';
  chatroomSubscription: Message;
};

export type SignInMutationVariables = Exact<{
  options: SignInInput;
}>;


export type SignInMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'signIn'>
);

export type FirstMessagesQueryVariables = Exact<{ [key: string]: never; }>;


export type FirstMessagesQuery = (
  { __typename?: 'Query' }
  & { firstMessages: Array<(
    { __typename?: 'Message' }
    & Pick<Message, 'uuid' | 'text' | 'createdAt'>
    & { sender: (
      { __typename?: 'UserMessage' }
      & Pick<UserMessage, 'uuid' | 'username'>
    ), recipient: (
      { __typename?: 'UserMessage' }
      & Pick<UserMessage, 'uuid' | 'username'>
    ) }
  )> }
);

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = (
  { __typename?: 'Query' }
  & { me?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'uuid' | 'username' | 'email' | 'password' | 'accountVerified'>
  )> }
);


export const SignInDocument = gql`
    mutation SignIn($options: SignInInput!) {
  signIn(options: $options)
}
    `;

export function useSignInMutation() {
  return Urql.useMutation<SignInMutation, SignInMutationVariables>(SignInDocument);
};
export const FirstMessagesDocument = gql`
    query FirstMessages {
  firstMessages {
    uuid
    text
    createdAt
    sender {
      uuid
      username
    }
    recipient {
      uuid
      username
    }
  }
}
    `;

export function useFirstMessagesQuery(options: Omit<Urql.UseQueryArgs<FirstMessagesQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<FirstMessagesQuery>({ query: FirstMessagesDocument, ...options });
};
export const MeDocument = gql`
    query Me {
  me {
    uuid
    username
    email
    password
    accountVerified
  }
}
    `;

export function useMeQuery(options: Omit<Urql.UseQueryArgs<MeQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<MeQuery>({ query: MeDocument, ...options });
};