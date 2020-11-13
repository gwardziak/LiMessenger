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
  friendships: Array<Friendship>;
  message?: Maybe<Message>;
  messages: Array<Message>;
  me?: Maybe<User>;
};


export type QueryFriendshipsArgs = {
  id: Scalars['Int'];
};


export type QueryMessageArgs = {
  uuid: Scalars['String'];
};

export type Friendship = {
  __typename?: 'Friendship';
  uuid: Scalars['String'];
  username: Scalars['String'];
};

export type Message = {
  __typename?: 'Message';
  uuid: Scalars['String'];
  text: Scalars['String'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  sender: UserMessage;
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
  addFriend: Scalars['Boolean'];
  sendMessage: Scalars['Boolean'];
  signUp: Scalars['Boolean'];
  signIn: Scalars['Boolean'];
};


export type MutationAddFriendArgs = {
  id: Scalars['Float'];
};


export type MutationSendMessageArgs = {
  recipentUuid: Scalars['String'];
  topic: Scalars['String'];
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


export type SubscriptionChatroomSubscriptionArgs = {
  topic: Scalars['String'];
};

export type Notification = {
  __typename?: 'Notification';
  id: Scalars['ID'];
  message?: Maybe<Scalars['String']>;
  date: Scalars['DateTime'];
};

export type SignInMutationVariables = Exact<{
  options: SignInInput;
}>;


export type SignInMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'signIn'>
);

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = (
  { __typename?: 'Query' }
  & { me?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'uuid' | 'username' | 'email' | 'password' | 'accountVerified'>
  )> }
);

export type MessageQueryVariables = Exact<{
  uuid: Scalars['String'];
}>;


export type MessageQuery = (
  { __typename?: 'Query' }
  & { message?: Maybe<(
    { __typename?: 'Message' }
    & Pick<Message, 'uuid' | 'text'>
    & { sender: (
      { __typename?: 'UserMessage' }
      & Pick<UserMessage, 'uuid' | 'username'>
    ) }
  )> }
);

export type ChatroomSubscriptionVariables = Exact<{
  topic: Scalars['String'];
}>;


export type ChatroomSubscription = (
  { __typename?: 'Subscription' }
  & { chatroomSubscription: (
    { __typename?: 'Message' }
    & Pick<Message, 'uuid' | 'text' | 'createdAt' | 'updatedAt'>
    & { sender: (
      { __typename?: 'UserMessage' }
      & Pick<UserMessage, 'uuid' | 'username'>
    ) }
  ) }
);


export const SignInDocument = gql`
    mutation SignIn($options: SignInInput!) {
  signIn(options: $options)
}
    `;

export function useSignInMutation() {
  return Urql.useMutation<SignInMutation, SignInMutationVariables>(SignInDocument);
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
export const MessageDocument = gql`
    query Message($uuid: String!) {
  message(uuid: $uuid) {
    uuid
    text
    sender {
      uuid
      username
    }
  }
}
    `;

export function useMessageQuery(options: Omit<Urql.UseQueryArgs<MessageQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<MessageQuery>({ query: MessageDocument, ...options });
};
export const ChatroomDocument = gql`
    subscription Chatroom($topic: String!) {
  chatroomSubscription(topic: $topic) {
    uuid
    text
    createdAt
    updatedAt
    sender {
      uuid
      username
    }
  }
}
    `;

export function useChatroomSubscription<TData = ChatroomSubscription>(options: Omit<Urql.UseSubscriptionArgs<ChatroomSubscriptionVariables>, 'query'> = {}, handler?: Urql.SubscriptionHandler<ChatroomSubscription, TData>) {
  return Urql.useSubscription<ChatroomSubscription, TData, ChatroomSubscriptionVariables>({ query: ChatroomDocument, ...options }, handler);
};