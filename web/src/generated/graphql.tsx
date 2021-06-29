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
  files: FilePagination;
  images: ImagePagination;
  messages: PaginatedMessages;
  firstMessages: Array<Message>;
  me?: Maybe<User>;
  findUser: Array<UserMessage>;
  authorize?: Maybe<User>;
};


export type QueryFilesArgs = {
  options: FilePaginationInput;
};


export type QueryImagesArgs = {
  options: ImagePaginationInput;
};


export type QueryMessagesArgs = {
  options: MessagePaginationInput;
};


export type QueryFindUserArgs = {
  phase: Scalars['String'];
};


export type QueryAuthorizeArgs = {
  token: AuthorizeInput;
};

export type FilePaginationInput = {
  friendUuid: Scalars['String'];
  limit: Scalars['Int'];
  cursor?: Maybe<Scalars['String']>;
};

export type FilePagination = {
  __typename?: 'FilePagination';
  files: Array<File>;
  hasMore: Scalars['Boolean'];
};

export type File = {
  __typename?: 'File';
  uuid: Scalars['String'];
  name: Scalars['String'];
  mimetype: Scalars['String'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  link: Scalars['String'];
};


export type ImagePaginationInput = {
  friendUuid: Scalars['String'];
  limit: Scalars['Int'];
  cursor?: Maybe<Scalars['String']>;
};

export type ImagePagination = {
  __typename?: 'ImagePagination';
  images: Array<Image>;
  hasMore: Scalars['Boolean'];
};

export type Image = {
  __typename?: 'Image';
  uuid: Scalars['String'];
  name: Scalars['String'];
  mimetype: Scalars['String'];
  minWidth: Scalars['Float'];
  minHeight: Scalars['Float'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  links: Links;
};

export type Links = {
  __typename?: 'Links';
  orginal: Scalars['String'];
  min: Scalars['String'];
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
  images: Array<Image>;
  files: Array<File>;
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

export type AuthorizeInput = {
  token?: Maybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  sendMessage: Scalars['Boolean'];
  signUp: Scalars['Boolean'];
  signIn: Scalars['String'];
  signOut: Scalars['Boolean'];
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

export type SignOutMutationVariables = Exact<{ [key: string]: never; }>;


export type SignOutMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'signOut'>
);

export type SignUpMutationVariables = Exact<{
  options: SignUpInput;
}>;


export type SignUpMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'signUp'>
);

export type AuthorizeQueryVariables = Exact<{
  options: AuthorizeInput;
}>;


export type AuthorizeQuery = (
  { __typename?: 'Query' }
  & { authorize?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'uuid' | 'username' | 'email' | 'password' | 'accountVerified'>
  )> }
);

export type FilesQueryVariables = Exact<{
  options: FilePaginationInput;
}>;


export type FilesQuery = (
  { __typename?: 'Query' }
  & { files: (
    { __typename?: 'FilePagination' }
    & Pick<FilePagination, 'hasMore'>
    & { files: Array<(
      { __typename?: 'File' }
      & Pick<File, 'uuid' | 'name' | 'mimetype' | 'updatedAt' | 'createdAt' | 'link'>
    )> }
  ) }
);

export type FindUserQueryVariables = Exact<{
  phase: Scalars['String'];
}>;


export type FindUserQuery = (
  { __typename?: 'Query' }
  & { findUser: Array<(
    { __typename?: 'UserMessage' }
    & Pick<UserMessage, 'username' | 'uuid'>
  )> }
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
    ), images: Array<(
      { __typename?: 'Image' }
      & Pick<Image, 'uuid' | 'name' | 'mimetype' | 'createdAt' | 'updatedAt' | 'minHeight' | 'minWidth'>
      & { links: (
        { __typename?: 'Links' }
        & Pick<Links, 'orginal' | 'min'>
      ) }
    )>, files: Array<(
      { __typename?: 'File' }
      & Pick<File, 'uuid' | 'name' | 'mimetype' | 'createdAt' | 'updatedAt' | 'link'>
    )> }
  )> }
);

export type ImagesQueryVariables = Exact<{
  options: ImagePaginationInput;
}>;


export type ImagesQuery = (
  { __typename?: 'Query' }
  & { images: (
    { __typename?: 'ImagePagination' }
    & Pick<ImagePagination, 'hasMore'>
    & { images: Array<(
      { __typename?: 'Image' }
      & Pick<Image, 'uuid' | 'name' | 'mimetype' | 'minWidth' | 'minHeight' | 'updatedAt' | 'createdAt'>
      & { links: (
        { __typename?: 'Links' }
        & Pick<Links, 'orginal' | 'min'>
      ) }
    )> }
  ) }
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
      ), images: Array<(
        { __typename?: 'Image' }
        & Pick<Image, 'uuid' | 'name' | 'mimetype' | 'createdAt' | 'updatedAt' | 'minHeight' | 'minWidth'>
        & { links: (
          { __typename?: 'Links' }
          & Pick<Links, 'orginal' | 'min'>
        ) }
      )>, files: Array<(
        { __typename?: 'File' }
        & Pick<File, 'uuid' | 'name' | 'mimetype' | 'createdAt' | 'updatedAt' | 'link'>
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
    ), images: Array<(
      { __typename?: 'Image' }
      & Pick<Image, 'uuid' | 'name' | 'mimetype' | 'minWidth' | 'minHeight' | 'updatedAt' | 'createdAt'>
      & { links: (
        { __typename?: 'Links' }
        & Pick<Links, 'orginal' | 'min'>
      ) }
    )>, files: Array<(
      { __typename?: 'File' }
      & Pick<File, 'uuid' | 'name' | 'mimetype' | 'createdAt' | 'updatedAt' | 'link'>
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
export const SignOutDocument = gql`
    mutation SignOut {
  signOut
}
    `;

export function useSignOutMutation() {
  return Urql.useMutation<SignOutMutation, SignOutMutationVariables>(SignOutDocument);
};
export const SignUpDocument = gql`
    mutation SignUp($options: SignUpInput!) {
  signUp(options: $options)
}
    `;

export function useSignUpMutation() {
  return Urql.useMutation<SignUpMutation, SignUpMutationVariables>(SignUpDocument);
};
export const AuthorizeDocument = gql`
    query Authorize($options: AuthorizeInput!) {
  authorize(token: $options) {
    uuid
    username
    email
    password
    accountVerified
  }
}
    `;

export function useAuthorizeQuery(options: Omit<Urql.UseQueryArgs<AuthorizeQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<AuthorizeQuery>({ query: AuthorizeDocument, ...options });
};
export const FilesDocument = gql`
    query Files($options: FilePaginationInput!) {
  files(options: $options) {
    hasMore
    files {
      uuid
      name
      mimetype
      updatedAt
      createdAt
      link
    }
  }
}
    `;

export function useFilesQuery(options: Omit<Urql.UseQueryArgs<FilesQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<FilesQuery>({ query: FilesDocument, ...options });
};
export const FindUserDocument = gql`
    query FindUser($phase: String!) {
  findUser(phase: $phase) {
    username
    uuid
  }
}
    `;

export function useFindUserQuery(options: Omit<Urql.UseQueryArgs<FindUserQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<FindUserQuery>({ query: FindUserDocument, ...options });
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
    images {
      uuid
      name
      mimetype
      links {
        orginal
        min
      }
      createdAt
      updatedAt
      minHeight
      minWidth
    }
    files {
      uuid
      name
      mimetype
      createdAt
      updatedAt
      link
    }
  }
}
    `;

export function useFirstMessagesQuery(options: Omit<Urql.UseQueryArgs<FirstMessagesQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<FirstMessagesQuery>({ query: FirstMessagesDocument, ...options });
};
export const ImagesDocument = gql`
    query Images($options: ImagePaginationInput!) {
  images(options: $options) {
    hasMore
    images {
      uuid
      name
      mimetype
      minWidth
      minHeight
      links {
        orginal
        min
      }
      updatedAt
      createdAt
    }
  }
}
    `;

export function useImagesQuery(options: Omit<Urql.UseQueryArgs<ImagesQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<ImagesQuery>({ query: ImagesDocument, ...options });
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
      images {
        uuid
        name
        mimetype
        links {
          orginal
          min
        }
        createdAt
        updatedAt
        minHeight
        minWidth
      }
      files {
        uuid
        name
        mimetype
        createdAt
        updatedAt
        link
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
    images {
      uuid
      name
      mimetype
      minWidth
      minHeight
      links {
        orginal
        min
      }
      updatedAt
      createdAt
    }
    files {
      uuid
      name
      mimetype
      createdAt
      updatedAt
      link
    }
  }
}
    `;

export function useChatroomSubscription<TData = ChatroomSubscription>(options: Omit<Urql.UseSubscriptionArgs<ChatroomSubscriptionVariables>, 'query'> = {}, handler?: Urql.SubscriptionHandler<ChatroomSubscription, TData>) {
  return Urql.useSubscription<ChatroomSubscription, TData, ChatroomSubscriptionVariables>({ query: ChatroomDocument, ...options }, handler);
};