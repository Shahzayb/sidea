import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: any }> = { [K in keyof T]: T[K] };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Query = {
  __typename?: 'Query';
  newIdeas: Array<Idea>;
  topIdeas: Array<Idea>;
  idea?: Maybe<Idea>;
  me: User;
  user?: Maybe<User>;
};


export type QueryNewIdeasArgs = {
  after_id?: Maybe<Scalars['ID']>;
  limit: Scalars['Int'];
};


export type QueryTopIdeasArgs = {
  interval: Interval;
  skip?: Maybe<Scalars['Int']>;
  limit: Scalars['Int'];
};


export type QueryIdeaArgs = {
  id: Scalars['ID'];
};


export type QueryUserArgs = {
  id: Scalars['ID'];
};

export type Mutation = {
  __typename?: 'Mutation';
  login: AuthResponse;
  signup: AuthResponse;
  createIdea: Idea;
  createFeature: Feature;
  updateIdea: Idea;
  updateFeature: Feature;
  deleteIdea: Idea;
  deleteFeature: Feature;
  saveIdea: Save;
  deleteSavedIdea: Save;
  likeIdea: Like;
  unlikeIdea: Like;
};


export type MutationLoginArgs = {
  input: LoginInput;
};


export type MutationSignupArgs = {
  input: SignupInput;
};


export type MutationCreateIdeaArgs = {
  input: CreateIdeaInput;
};


export type MutationCreateFeatureArgs = {
  input: CreateFeatureWithoutIdeaInput;
};


export type MutationUpdateIdeaArgs = {
  input: UpdateIdeaInput;
};


export type MutationUpdateFeatureArgs = {
  input: UpdateFeatureInput;
};


export type MutationDeleteIdeaArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteFeatureArgs = {
  id: Scalars['ID'];
};


export type MutationSaveIdeaArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteSavedIdeaArgs = {
  id: Scalars['ID'];
};


export type MutationLikeIdeaArgs = {
  id: Scalars['ID'];
};


export type MutationUnlikeIdeaArgs = {
  id: Scalars['ID'];
};

export type LoginInput = {
  username: Scalars['String'];
  password: Scalars['String'];
};

export type SignupInput = {
  name: Scalars['String'];
  username: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
};

export type CreateFeatureInput = {
  title: Scalars['String'];
};

export type CreateFeatureWithoutIdeaInput = {
  ideaId: Scalars['ID'];
  title: Scalars['String'];
};

export type CreateIdeaInput = {
  title: Scalars['String'];
  body: Scalars['String'];
  tags?: Maybe<Array<Scalars['String']>>;
  features?: Maybe<Array<CreateFeatureInput>>;
};

export type UpdateIdeaInput = {
  id: Scalars['ID'];
  title?: Maybe<Scalars['String']>;
  body?: Maybe<Scalars['String']>;
  tags?: Maybe<Array<Scalars['String']>>;
};

export type UpdateFeatureInput = {
  id: Scalars['ID'];
  title: Scalars['String'];
};

export enum Interval {
  Day = 'DAY',
  Week = 'WEEK',
  Year = 'YEAR',
  AllTime = 'ALL_TIME'
}

export type AuthResponse = {
  __typename?: 'AuthResponse';
  token: Scalars['String'];
  user: User;
};

export type User = {
  __typename?: 'User';
  id: Scalars['ID'];
  name: Scalars['String'];
  username: Scalars['String'];
  email?: Maybe<Scalars['String']>;
  avatar: Scalars['String'];
  ideas: Array<Idea>;
  savedIdeas: Array<Idea>;
  likedIdeas: Array<Idea>;
  createdAt: Scalars['String'];
};


export type UserIdeasArgs = {
  after_id?: Maybe<Scalars['ID']>;
  limit: Scalars['Int'];
};


export type UserSavedIdeasArgs = {
  after_id?: Maybe<Scalars['ID']>;
  limit: Scalars['Int'];
};


export type UserLikedIdeasArgs = {
  after_id?: Maybe<Scalars['ID']>;
  limit: Scalars['Int'];
};

export type Idea = {
  __typename?: 'Idea';
  id: Scalars['ID'];
  title: Scalars['String'];
  body: Scalars['String'];
  user: User;
  tags?: Maybe<Array<Scalars['String']>>;
  likesCount: Scalars['Int'];
  isLikedByMe: Scalars['Boolean'];
  isSavedByMe: Scalars['Boolean'];
  features?: Maybe<Array<Feature>>;
  createdAt: Scalars['String'];
};


export type IdeaFeaturesArgs = {
  after_id?: Maybe<Scalars['ID']>;
  limit: Scalars['Int'];
};

export type Feature = {
  __typename?: 'Feature';
  id: Scalars['ID'];
  title: Scalars['String'];
  idea: Idea;
  user: User;
  createdAt: Scalars['String'];
};

export type Like = {
  __typename?: 'Like';
  id: Scalars['ID'];
  idea: Idea;
  user: User;
  createdAt: Scalars['String'];
};

export type Save = {
  __typename?: 'Save';
  id: Scalars['ID'];
  user: User;
  idea: Idea;
  createdAt: Scalars['String'];
};

export type LoginMutationVariables = Exact<{
  input: LoginInput;
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login: (
    { __typename?: 'AuthResponse' }
    & Pick<AuthResponse, 'token'>
    & { user: (
      { __typename?: 'User' }
      & Pick<User, 'id'>
    ) }
  ) }
);

export type SignUpMutationVariables = Exact<{
  input: SignupInput;
}>;


export type SignUpMutation = (
  { __typename?: 'Mutation' }
  & { signup: (
    { __typename?: 'AuthResponse' }
    & Pick<AuthResponse, 'token'>
    & { user: (
      { __typename?: 'User' }
      & Pick<User, 'id'>
    ) }
  ) }
);

export type CreateIdeaMutationVariables = Exact<{
  input: CreateIdeaInput;
}>;


export type CreateIdeaMutation = (
  { __typename?: 'Mutation' }
  & { createIdea: (
    { __typename?: 'Idea' }
    & Pick<Idea, 'id' | 'title' | 'body' | 'tags'>
  ) }
);

export type GetIdeaByIdQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type GetIdeaByIdQuery = (
  { __typename?: 'Query' }
  & { idea?: Maybe<(
    { __typename?: 'Idea' }
    & Pick<Idea, 'id' | 'title' | 'body'>
  )> }
);

export type GetMyProfileQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMyProfileQuery = (
  { __typename?: 'Query' }
  & { me: (
    { __typename?: 'User' }
    & Pick<User, 'id' | 'name' | 'username' | 'avatar' | 'email'>
  ) }
);


export const LoginDocument = gql`
    mutation Login($input: LoginInput!) {
  login(input: $input) {
    user {
      id
    }
    token
  }
}
    `;
export type LoginMutationFn = ApolloReactCommon.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        return ApolloReactHooks.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, baseOptions);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = ApolloReactCommon.MutationResult<LoginMutation>;
export type LoginMutationOptions = ApolloReactCommon.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const SignUpDocument = gql`
    mutation SignUp($input: SignupInput!) {
  signup(input: $input) {
    user {
      id
    }
    token
  }
}
    `;
export type SignUpMutationFn = ApolloReactCommon.MutationFunction<SignUpMutation, SignUpMutationVariables>;

/**
 * __useSignUpMutation__
 *
 * To run a mutation, you first call `useSignUpMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignUpMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signUpMutation, { data, loading, error }] = useSignUpMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSignUpMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<SignUpMutation, SignUpMutationVariables>) {
        return ApolloReactHooks.useMutation<SignUpMutation, SignUpMutationVariables>(SignUpDocument, baseOptions);
      }
export type SignUpMutationHookResult = ReturnType<typeof useSignUpMutation>;
export type SignUpMutationResult = ApolloReactCommon.MutationResult<SignUpMutation>;
export type SignUpMutationOptions = ApolloReactCommon.BaseMutationOptions<SignUpMutation, SignUpMutationVariables>;
export const CreateIdeaDocument = gql`
    mutation CreateIdea($input: CreateIdeaInput!) {
  createIdea(input: $input) {
    id
    title
    body
    tags
  }
}
    `;
export type CreateIdeaMutationFn = ApolloReactCommon.MutationFunction<CreateIdeaMutation, CreateIdeaMutationVariables>;

/**
 * __useCreateIdeaMutation__
 *
 * To run a mutation, you first call `useCreateIdeaMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateIdeaMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createIdeaMutation, { data, loading, error }] = useCreateIdeaMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateIdeaMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateIdeaMutation, CreateIdeaMutationVariables>) {
        return ApolloReactHooks.useMutation<CreateIdeaMutation, CreateIdeaMutationVariables>(CreateIdeaDocument, baseOptions);
      }
export type CreateIdeaMutationHookResult = ReturnType<typeof useCreateIdeaMutation>;
export type CreateIdeaMutationResult = ApolloReactCommon.MutationResult<CreateIdeaMutation>;
export type CreateIdeaMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateIdeaMutation, CreateIdeaMutationVariables>;
export const GetIdeaByIdDocument = gql`
    query GetIdeaById($id: ID!) {
  idea(id: $id) {
    id
    title
    body
  }
}
    `;

/**
 * __useGetIdeaByIdQuery__
 *
 * To run a query within a React component, call `useGetIdeaByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetIdeaByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetIdeaByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetIdeaByIdQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetIdeaByIdQuery, GetIdeaByIdQueryVariables>) {
        return ApolloReactHooks.useQuery<GetIdeaByIdQuery, GetIdeaByIdQueryVariables>(GetIdeaByIdDocument, baseOptions);
      }
export function useGetIdeaByIdLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetIdeaByIdQuery, GetIdeaByIdQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetIdeaByIdQuery, GetIdeaByIdQueryVariables>(GetIdeaByIdDocument, baseOptions);
        }
export type GetIdeaByIdQueryHookResult = ReturnType<typeof useGetIdeaByIdQuery>;
export type GetIdeaByIdLazyQueryHookResult = ReturnType<typeof useGetIdeaByIdLazyQuery>;
export type GetIdeaByIdQueryResult = ApolloReactCommon.QueryResult<GetIdeaByIdQuery, GetIdeaByIdQueryVariables>;
export const GetMyProfileDocument = gql`
    query GetMyProfile {
  me {
    id
    name
    username
    avatar
    email
  }
}
    `;

/**
 * __useGetMyProfileQuery__
 *
 * To run a query within a React component, call `useGetMyProfileQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMyProfileQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMyProfileQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetMyProfileQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetMyProfileQuery, GetMyProfileQueryVariables>) {
        return ApolloReactHooks.useQuery<GetMyProfileQuery, GetMyProfileQueryVariables>(GetMyProfileDocument, baseOptions);
      }
export function useGetMyProfileLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetMyProfileQuery, GetMyProfileQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetMyProfileQuery, GetMyProfileQueryVariables>(GetMyProfileDocument, baseOptions);
        }
export type GetMyProfileQueryHookResult = ReturnType<typeof useGetMyProfileQuery>;
export type GetMyProfileLazyQueryHookResult = ReturnType<typeof useGetMyProfileLazyQuery>;
export type GetMyProfileQueryResult = ApolloReactCommon.QueryResult<GetMyProfileQuery, GetMyProfileQueryVariables>;