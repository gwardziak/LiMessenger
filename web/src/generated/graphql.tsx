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
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};

export type Query = {
  __typename?: 'Query';
  attachments: PaginatedAttachments;
  messages: PaginatedMessages;
  firstMessages: Array<Message>;
  me?: Maybe<User>;
};


export type QueryAttachmentsArgs = {
  options: AttachmentPaginationInput;
};


export type QueryMessagesArgs = {
  options: MessagePaginationInput;
};

export type AttachmentPaginationInput = {
  friendUuid: Scalars['String'];
  limit: Scalars['Int'];
  cursor?: Maybe<Scalars['String']>;
  isImage: Scalars['Boolean'];
};

export type PaginatedAttachments = {
  __typename?: 'PaginatedAttachments';
  attachments: Array<Attachment>;
  hasMore: Scalars['Boolean'];
};

export type Attachment = {
  __typename?: 'Attachment';
  uuid: Scalars['String'];
  name: Scalars['String'];
  mimetype: Scalars['String'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  link: Scalars['String'];
};


export type MessagePaginationInput = {
  friendUuid: Scalars['String'];
  limit: Scalars['Int'];
  cursor?: Maybe<Scalars['String']>;
};

export type PaginatedMessages = {
  __typename?: 'PaginatedMessages';
  messages: Array<Message>;
  hasMore: Scalars['Boolean'];
};

export type Message = {
  __typename?: 'Message';
  uuid: Scalars['String'];
  text: Scalars['String'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  sender: UserMessage;
  recipient: UserMessage;
  attachments: Array<Attachment>;
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
  files?: Maybe<Array<Scalars['Upload']>>;
  options: MessageInput;
};


export type MutationSignUpArgs = {
  options: SignUpInput;
};


export type MutationSignInArgs = {
  options: SignInInput;
};


export type MessageInput = {
  recipientUuid: Scalars['String'];
  text: Scalars['String'];
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

export type SendMessageMutationVariables = Exact<{
  options: MessageInput;
  files?: Maybe<Array<Scalars['Upload']>>;
}>;


export type SendMessageMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'sendMessage'>
);

export type SignInMutationVariables = Exact<{
  options: SignInInput;
}>;


export type SignInMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'signIn'>
);

export type AttachmentsQueryVariables = Exact<{
  options: AttachmentPaginationInput;
}>;


export type AttachmentsQuery = (
  { __typename?: 'Query' }
  & { attachments: (
    { __typename?: 'PaginatedAttachments' }
    & Pick<PaginatedAttachments, 'hasMore'>
    & { attachments: Array<(
      { __typename?: 'Attachment' }
      & Pick<Attachment, 'uuid' | 'name' | 'mimetype' | 'link' | 'createdAt'>
    )> }
  ) }
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
    ), attachments: Array<(
      { __typename?: 'Attachment' }
      & Pick<Attachment, 'uuid' | 'name' | 'mimetype' | 'link' | 'createdAt'>
    )> }
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

export type MessagesQueryVariables = Exact<{
  options: MessagePaginationInput;
}>;


export type MessagesQuery = (
  { __typename?: 'Query' }
  & { messages: (
    { __typename?: 'PaginatedMessages' }
    & Pick<PaginatedMessages, 'hasMore'>
    & { messages: Array<(
      { __typename?: 'Message' }
      & Pick<Message, 'uuid' | 'text' | 'createdAt'>
      & { sender: (
        { __typename?: 'UserMessage' }
        & Pick<UserMessage, 'uuid' | 'username'>
      ), recipient: (
        { __typename?: 'UserMessage' }
        & Pick<UserMessage, 'uuid' | 'username'>
      ), attachments: Array<(
        { __typename?: 'Attachment' }
        & Pick<Attachment, 'uuid' | 'name' | 'mimetype' | 'link' | 'createdAt'>
      )> }
    )> }
  ) }
);

export type ChatroomSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type ChatroomSubscription = (
  { __typename?: 'Subscription' }
  & { chatroomSubscription: (
    { __typename?: 'Message' }
    & Pick<Message, 'uuid' | 'text' | 'createdAt' | 'updatedAt'>
    & { sender: (
      { __typename?: 'UserMessage' }
      & Pick<UserMessage, 'uuid' | 'username'>
    ), recipient: (
      { __typename?: 'UserMessage' }
      & Pick<UserMessage, 'uuid' | 'username'>
    ), attachments: Array<(
      { __typename?: 'Attachment' }
      & Pick<Attachment, 'uuid' | 'name' | 'mimetype' | 'link' | 'createdAt'>
    )> }
  ) }
);


export const SendMessageDocument = gql`
    mutation SendMessage($options: MessageInput!, $files: [Upload!]) {
  sendMessage(options: $options, files: $files)
}
    `;

export function useSendMessageMutation() {
  return Urql.useMutation<SendMessageMutation, SendMessageMutationVariables>(SendMessageDocument);
};
export const SignInDocument = gql`
    mutation SignIn($options: SignInInput!) {
  signIn(options: $options)
}
    `;

export function useSignInMutation() {
  return Urql.useMutation<SignInMutation, SignInMutationVariables>(SignInDocument);
};
export const AttachmentsDocument = gql`
    query Attachments($options: AttachmentPaginationInput!) {
  attachments(options: $options) {
    hasMore
    attachments {
      uuid
      name
      mimetype
      link
      createdAt
    }
  }
}
    `;

export function useAttachmentsQuery(options: Omit<Urql.UseQueryArgs<AttachmentsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<AttachmentsQuery>({ query: AttachmentsDocument, ...options });
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
    attachments {
      uuid
      name
      mimetype
      link
      createdAt
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
export const MessagesDocument = gql`
    query Messages($options: MessagePaginationInput!) {
  messages(options: $options) {
    hasMore
    messages {
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
      attachments {
        uuid
        name
        mimetype
        link
        createdAt
      }
    }
  }
}
    `;

export function useMessagesQuery(options: Omit<Urql.UseQueryArgs<MessagesQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<MessagesQuery>({ query: MessagesDocument, ...options });
};
export const ChatroomDocument = gql`
    subscription Chatroom {
  chatroomSubscription {
    uuid
    text
    createdAt
    updatedAt
    sender {
      uuid
      username
    }
    recipient {
      uuid
      username
    }
    attachments {
      uuid
      name
      mimetype
      link
      createdAt
    }
  }
}
    `;

export function useChatroomSubscription<TData = ChatroomSubscription>(options: Omit<Urql.UseSubscriptionArgs<ChatroomSubscriptionVariables>, 'query'> = {}, handler?: Urql.SubscriptionHandler<ChatroomSubscription, TData>) {
  return Urql.useSubscription<ChatroomSubscription, TData, ChatroomSubscriptionVariables>({ query: ChatroomDocument, ...options }, handler);
};