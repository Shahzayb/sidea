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
  newIdeas: IdeaPageResponse;
  topIdeas: IdeaPageResponse;
  idea?: Maybe<Idea>;
  features: FeaturePageResponse;
  me: User;
  mySetting: Setting;
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


export type QueryFeaturesArgs = {
  idea_id: Scalars['ID'];
  after_feature_id?: Maybe<Scalars['ID']>;
  limit: Scalars['Int'];
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
  unsaveIdea: Save;
  likeIdea: Like;
  unlikeIdea: Like;
  updateThemeMode: Setting;
  forgotPassword: ForgotPasswordResponse;
  resetPassword: AuthResponse;
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
  idea_id: Scalars['ID'];
};


export type MutationUnsaveIdeaArgs = {
  idea_id: Scalars['ID'];
};


export type MutationLikeIdeaArgs = {
  idea_id: Scalars['ID'];
};


export type MutationUnlikeIdeaArgs = {
  idea_id: Scalars['ID'];
};


export type MutationUpdateThemeModeArgs = {
  input: UpdateThemeModeInput;
};


export type MutationForgotPasswordArgs = {
  input: ForgotPasswordInput;
};


export type MutationResetPasswordArgs = {
  input: ResetPasswordInput;
};

export type ResetPasswordInput = {
  userId: Scalars['ID'];
  newPassword: Scalars['String'];
  token: Scalars['String'];
};

export type ForgotPasswordInput = {
  email: Scalars['String'];
};

export type UpdateThemeModeInput = {
  themeMode: ThemeMode;
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
  Month = 'MONTH',
  Year = 'YEAR',
  AllTime = 'ALL_TIME'
}

export enum ThemeMode {
  Light = 'LIGHT',
  Dark = 'DARK'
}

export type ForgotPasswordResponse = {
  __typename?: 'ForgotPasswordResponse';
  msg?: Maybe<Scalars['String']>;
};

export type Setting = {
  __typename?: 'Setting';
  id: Scalars['ID'];
  themeMode: ThemeMode;
};

export type IdeaPageResponse = {
  __typename?: 'IdeaPageResponse';
  page: Page;
  entry: Array<Idea>;
};

export type FeaturePageResponse = {
  __typename?: 'FeaturePageResponse';
  page: Page;
  entry: Array<Feature>;
};

export type Page = {
  __typename?: 'Page';
  cursor?: Maybe<Scalars['ID']>;
  hasNextPage: Scalars['Boolean'];
};

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
  ideas: IdeaPageResponse;
  savedIdeas: IdeaPageResponse;
  likedIdeas: IdeaPageResponse;
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
  tags: Array<Scalars['String']>;
  likesCount: Scalars['Int'];
  isLikedByMe: Scalars['Boolean'];
  isSavedByMe: Scalars['Boolean'];
  features: FeaturePageResponse;
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

export type ToggleLikeBodyFragment = (
  { __typename?: 'Like' }
  & Pick<Like, 'id'>
  & { idea: (
    { __typename?: 'Idea' }
    & Pick<Idea, 'id' | 'likesCount' | 'isLikedByMe'>
  ) }
);

export type ToggleSaveBodyFragment = (
  { __typename?: 'Save' }
  & Pick<Save, 'id'>
  & { idea: (
    { __typename?: 'Idea' }
    & Pick<Idea, 'id' | 'isSavedByMe'>
  ) }
);

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

export type ForgotPasswordMutationVariables = Exact<{
  input: ForgotPasswordInput;
}>;


export type ForgotPasswordMutation = (
  { __typename?: 'Mutation' }
  & { forgotPassword: (
    { __typename?: 'ForgotPasswordResponse' }
    & Pick<ForgotPasswordResponse, 'msg'>
  ) }
);

export type ResetPasswordMutationVariables = Exact<{
  input: ResetPasswordInput;
}>;


export type ResetPasswordMutation = (
  { __typename?: 'Mutation' }
  & { resetPassword: (
    { __typename?: 'AuthResponse' }
    & Pick<AuthResponse, 'token'>
  ) }
);

export type UpdateThemeModeMutationVariables = Exact<{
  input: UpdateThemeModeInput;
}>;


export type UpdateThemeModeMutation = (
  { __typename?: 'Mutation' }
  & { updateThemeMode: (
    { __typename?: 'Setting' }
    & SettingBodyFragment
  ) }
);

export type CreateIdeaMutationVariables = Exact<{
  input: CreateIdeaInput;
}>;


export type CreateIdeaMutation = (
  { __typename?: 'Mutation' }
  & { createIdea: (
    { __typename?: 'Idea' }
    & Pick<Idea, 'id'>
  ) }
);

export type UpdateIdeaMutationVariables = Exact<{
  input: UpdateIdeaInput;
}>;


export type UpdateIdeaMutation = (
  { __typename?: 'Mutation' }
  & { updateIdea: (
    { __typename?: 'Idea' }
    & Pick<Idea, 'id' | 'title' | 'body' | 'tags'>
  ) }
);

export type DeleteIdeaMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type DeleteIdeaMutation = (
  { __typename?: 'Mutation' }
  & { deleteIdea: (
    { __typename?: 'Idea' }
    & Pick<Idea, 'id'>
  ) }
);

export type LikeIdeaMutationVariables = Exact<{
  idea_id: Scalars['ID'];
}>;


export type LikeIdeaMutation = (
  { __typename?: 'Mutation' }
  & { likeIdea: (
    { __typename?: 'Like' }
    & ToggleLikeBodyFragment
  ) }
);

export type UnlikeIdeaMutationVariables = Exact<{
  idea_id: Scalars['ID'];
}>;


export type UnlikeIdeaMutation = (
  { __typename?: 'Mutation' }
  & { unlikeIdea: (
    { __typename?: 'Like' }
    & ToggleLikeBodyFragment
  ) }
);

export type SaveIdeaMutationVariables = Exact<{
  idea_id: Scalars['ID'];
}>;


export type SaveIdeaMutation = (
  { __typename?: 'Mutation' }
  & { saveIdea: (
    { __typename?: 'Save' }
    & ToggleSaveBodyFragment
  ) }
);

export type UnsaveIdeaMutationVariables = Exact<{
  idea_id: Scalars['ID'];
}>;


export type UnsaveIdeaMutation = (
  { __typename?: 'Mutation' }
  & { unsaveIdea: (
    { __typename?: 'Save' }
    & ToggleSaveBodyFragment
  ) }
);

export type CreateFeatureMutationVariables = Exact<{
  input: CreateFeatureWithoutIdeaInput;
}>;


export type CreateFeatureMutation = (
  { __typename?: 'Mutation' }
  & { createFeature: (
    { __typename?: 'Feature' }
    & FeatureBodyFragment
  ) }
);

export type UpdateFeatureMutationVariables = Exact<{
  input: UpdateFeatureInput;
}>;


export type UpdateFeatureMutation = (
  { __typename?: 'Mutation' }
  & { updateFeature: (
    { __typename?: 'Feature' }
    & FeatureBodyFragment
  ) }
);

export type DeleteFeatureMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type DeleteFeatureMutation = (
  { __typename?: 'Mutation' }
  & { deleteFeature: (
    { __typename?: 'Feature' }
    & Pick<Feature, 'id'>
  ) }
);

export type UserBodyFragment = (
  { __typename?: 'User' }
  & Pick<User, 'id' | 'name' | 'username' | 'email' | 'avatar' | 'createdAt'>
);

export type UserShortBodyFragment = (
  { __typename?: 'User' }
  & Pick<User, 'id' | 'username' | 'avatar'>
);

export type SettingBodyFragment = (
  { __typename?: 'Setting' }
  & Pick<Setting, 'id' | 'themeMode'>
);

export type IdeaBodyFragment = (
  { __typename?: 'Idea' }
  & Pick<Idea, 'id' | 'title' | 'body' | 'tags' | 'isLikedByMe' | 'likesCount' | 'isSavedByMe' | 'createdAt'>
);

export type IdeaShortBodyFragment = (
  { __typename?: 'Idea' }
  & Pick<Idea, 'id' | 'title' | 'isLikedByMe' | 'likesCount' | 'isSavedByMe' | 'createdAt'>
);

export type PageBodyFragment = (
  { __typename?: 'Page' }
  & Pick<Page, 'cursor' | 'hasNextPage'>
);

export type FeatureBodyFragment = (
  { __typename?: 'Feature' }
  & Pick<Feature, 'id' | 'title' | 'createdAt'>
);

export type GetIdeaByIdQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type GetIdeaByIdQuery = (
  { __typename?: 'Query' }
  & { idea?: Maybe<(
    { __typename?: 'Idea' }
    & { user: (
      { __typename?: 'User' }
      & UserShortBodyFragment
    ) }
    & IdeaBodyFragment
  )> }
);

export type GetIdeaFeaturesQueryVariables = Exact<{
  idea_id: Scalars['ID'];
  after_feature_id?: Maybe<Scalars['ID']>;
  limit: Scalars['Int'];
}>;


export type GetIdeaFeaturesQuery = (
  { __typename?: 'Query' }
  & { features: (
    { __typename?: 'FeaturePageResponse' }
    & { page: (
      { __typename?: 'Page' }
      & PageBodyFragment
    ), entry: Array<(
      { __typename?: 'Feature' }
      & { user: (
        { __typename?: 'User' }
        & Pick<User, 'id'>
      ) }
      & FeatureBodyFragment
    )> }
  ) }
);

export type GetMyProfileQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMyProfileQuery = (
  { __typename?: 'Query' }
  & { me: (
    { __typename?: 'User' }
    & UserBodyFragment
  ) }
);

export type GetMySettingsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMySettingsQuery = (
  { __typename?: 'Query' }
  & { mySetting: (
    { __typename?: 'Setting' }
    & SettingBodyFragment
  ) }
);

export type GetUserByIdQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type GetUserByIdQuery = (
  { __typename?: 'Query' }
  & { user?: Maybe<(
    { __typename?: 'User' }
    & UserBodyFragment
  )> }
);

export type GetUserIdeasQueryVariables = Exact<{
  id: Scalars['ID'];
  after_id?: Maybe<Scalars['ID']>;
  limit: Scalars['Int'];
}>;


export type GetUserIdeasQuery = (
  { __typename?: 'Query' }
  & { user?: Maybe<(
    { __typename?: 'User' }
    & { ideas: (
      { __typename?: 'IdeaPageResponse' }
      & { page: (
        { __typename?: 'Page' }
        & PageBodyFragment
      ), entry: Array<(
        { __typename?: 'Idea' }
        & IdeaShortBodyFragment
      )> }
    ) }
    & UserShortBodyFragment
  )> }
);

export type GetSavedUserIdeasQueryVariables = Exact<{
  id: Scalars['ID'];
  after_id?: Maybe<Scalars['ID']>;
  limit: Scalars['Int'];
}>;


export type GetSavedUserIdeasQuery = (
  { __typename?: 'Query' }
  & { user?: Maybe<(
    { __typename?: 'User' }
    & { savedIdeas: (
      { __typename?: 'IdeaPageResponse' }
      & { page: (
        { __typename?: 'Page' }
        & PageBodyFragment
      ), entry: Array<(
        { __typename?: 'Idea' }
        & IdeaShortBodyFragment
      )> }
    ) }
    & UserShortBodyFragment
  )> }
);

export type GetUserLikesQueryVariables = Exact<{
  id: Scalars['ID'];
  after_id?: Maybe<Scalars['ID']>;
  limit: Scalars['Int'];
}>;


export type GetUserLikesQuery = (
  { __typename?: 'Query' }
  & { user?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id'>
    & { likedIdeas: (
      { __typename?: 'IdeaPageResponse' }
      & { page: (
        { __typename?: 'Page' }
        & PageBodyFragment
      ), entry: Array<(
        { __typename?: 'Idea' }
        & { user: (
          { __typename?: 'User' }
          & UserShortBodyFragment
        ) }
        & IdeaShortBodyFragment
      )> }
    ) }
  )> }
);

export type GetNewIdeasQueryVariables = Exact<{
  after_id?: Maybe<Scalars['ID']>;
  limit: Scalars['Int'];
}>;


export type GetNewIdeasQuery = (
  { __typename?: 'Query' }
  & { newIdeas: (
    { __typename?: 'IdeaPageResponse' }
    & { page: (
      { __typename?: 'Page' }
      & PageBodyFragment
    ), entry: Array<(
      { __typename?: 'Idea' }
      & { user: (
        { __typename?: 'User' }
        & UserShortBodyFragment
      ) }
      & IdeaShortBodyFragment
    )> }
  ) }
);

export type GetTopIdeasQueryVariables = Exact<{
  interval: Interval;
  skip: Scalars['Int'];
  limit: Scalars['Int'];
}>;


export type GetTopIdeasQuery = (
  { __typename?: 'Query' }
  & { topIdeas: (
    { __typename?: 'IdeaPageResponse' }
    & { page: (
      { __typename?: 'Page' }
      & PageBodyFragment
    ), entry: Array<(
      { __typename?: 'Idea' }
      & { user: (
        { __typename?: 'User' }
        & UserShortBodyFragment
      ) }
      & IdeaShortBodyFragment
    )> }
  ) }
);

export const ToggleLikeBodyFragmentDoc = gql`
    fragment ToggleLikeBody on Like {
  id
  idea {
    id
    likesCount
    isLikedByMe
  }
}
    `;
export const ToggleSaveBodyFragmentDoc = gql`
    fragment ToggleSaveBody on Save {
  id
  idea {
    id
    isSavedByMe
  }
}
    `;
export const UserBodyFragmentDoc = gql`
    fragment UserBody on User {
  id
  name
  username
  email
  avatar
  createdAt
}
    `;
export const UserShortBodyFragmentDoc = gql`
    fragment UserShortBody on User {
  id
  username
  avatar
}
    `;
export const SettingBodyFragmentDoc = gql`
    fragment SettingBody on Setting {
  id
  themeMode
}
    `;
export const IdeaBodyFragmentDoc = gql`
    fragment IdeaBody on Idea {
  id
  title
  body
  tags
  isLikedByMe
  likesCount
  isSavedByMe
  createdAt
}
    `;
export const IdeaShortBodyFragmentDoc = gql`
    fragment IdeaShortBody on Idea {
  id
  title
  isLikedByMe
  likesCount
  isSavedByMe
  createdAt
}
    `;
export const PageBodyFragmentDoc = gql`
    fragment PageBody on Page {
  cursor
  hasNextPage
}
    `;
export const FeatureBodyFragmentDoc = gql`
    fragment FeatureBody on Feature {
  id
  title
  createdAt
}
    `;
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
export const ForgotPasswordDocument = gql`
    mutation ForgotPassword($input: ForgotPasswordInput!) {
  forgotPassword(input: $input) {
    msg
  }
}
    `;
export type ForgotPasswordMutationFn = ApolloReactCommon.MutationFunction<ForgotPasswordMutation, ForgotPasswordMutationVariables>;

/**
 * __useForgotPasswordMutation__
 *
 * To run a mutation, you first call `useForgotPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useForgotPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [forgotPasswordMutation, { data, loading, error }] = useForgotPasswordMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useForgotPasswordMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<ForgotPasswordMutation, ForgotPasswordMutationVariables>) {
        return ApolloReactHooks.useMutation<ForgotPasswordMutation, ForgotPasswordMutationVariables>(ForgotPasswordDocument, baseOptions);
      }
export type ForgotPasswordMutationHookResult = ReturnType<typeof useForgotPasswordMutation>;
export type ForgotPasswordMutationResult = ApolloReactCommon.MutationResult<ForgotPasswordMutation>;
export type ForgotPasswordMutationOptions = ApolloReactCommon.BaseMutationOptions<ForgotPasswordMutation, ForgotPasswordMutationVariables>;
export const ResetPasswordDocument = gql`
    mutation ResetPassword($input: ResetPasswordInput!) {
  resetPassword(input: $input) {
    token
  }
}
    `;
export type ResetPasswordMutationFn = ApolloReactCommon.MutationFunction<ResetPasswordMutation, ResetPasswordMutationVariables>;

/**
 * __useResetPasswordMutation__
 *
 * To run a mutation, you first call `useResetPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useResetPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [resetPasswordMutation, { data, loading, error }] = useResetPasswordMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useResetPasswordMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<ResetPasswordMutation, ResetPasswordMutationVariables>) {
        return ApolloReactHooks.useMutation<ResetPasswordMutation, ResetPasswordMutationVariables>(ResetPasswordDocument, baseOptions);
      }
export type ResetPasswordMutationHookResult = ReturnType<typeof useResetPasswordMutation>;
export type ResetPasswordMutationResult = ApolloReactCommon.MutationResult<ResetPasswordMutation>;
export type ResetPasswordMutationOptions = ApolloReactCommon.BaseMutationOptions<ResetPasswordMutation, ResetPasswordMutationVariables>;
export const UpdateThemeModeDocument = gql`
    mutation UpdateThemeMode($input: UpdateThemeModeInput!) {
  updateThemeMode(input: $input) {
    ...SettingBody
  }
}
    ${SettingBodyFragmentDoc}`;
export type UpdateThemeModeMutationFn = ApolloReactCommon.MutationFunction<UpdateThemeModeMutation, UpdateThemeModeMutationVariables>;

/**
 * __useUpdateThemeModeMutation__
 *
 * To run a mutation, you first call `useUpdateThemeModeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateThemeModeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateThemeModeMutation, { data, loading, error }] = useUpdateThemeModeMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateThemeModeMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateThemeModeMutation, UpdateThemeModeMutationVariables>) {
        return ApolloReactHooks.useMutation<UpdateThemeModeMutation, UpdateThemeModeMutationVariables>(UpdateThemeModeDocument, baseOptions);
      }
export type UpdateThemeModeMutationHookResult = ReturnType<typeof useUpdateThemeModeMutation>;
export type UpdateThemeModeMutationResult = ApolloReactCommon.MutationResult<UpdateThemeModeMutation>;
export type UpdateThemeModeMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdateThemeModeMutation, UpdateThemeModeMutationVariables>;
export const CreateIdeaDocument = gql`
    mutation CreateIdea($input: CreateIdeaInput!) {
  createIdea(input: $input) {
    id
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
export const UpdateIdeaDocument = gql`
    mutation UpdateIdea($input: UpdateIdeaInput!) {
  updateIdea(input: $input) {
    id
    title
    body
    tags
  }
}
    `;
export type UpdateIdeaMutationFn = ApolloReactCommon.MutationFunction<UpdateIdeaMutation, UpdateIdeaMutationVariables>;

/**
 * __useUpdateIdeaMutation__
 *
 * To run a mutation, you first call `useUpdateIdeaMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateIdeaMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateIdeaMutation, { data, loading, error }] = useUpdateIdeaMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateIdeaMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateIdeaMutation, UpdateIdeaMutationVariables>) {
        return ApolloReactHooks.useMutation<UpdateIdeaMutation, UpdateIdeaMutationVariables>(UpdateIdeaDocument, baseOptions);
      }
export type UpdateIdeaMutationHookResult = ReturnType<typeof useUpdateIdeaMutation>;
export type UpdateIdeaMutationResult = ApolloReactCommon.MutationResult<UpdateIdeaMutation>;
export type UpdateIdeaMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdateIdeaMutation, UpdateIdeaMutationVariables>;
export const DeleteIdeaDocument = gql`
    mutation DeleteIdea($id: ID!) {
  deleteIdea(id: $id) {
    id
  }
}
    `;
export type DeleteIdeaMutationFn = ApolloReactCommon.MutationFunction<DeleteIdeaMutation, DeleteIdeaMutationVariables>;

/**
 * __useDeleteIdeaMutation__
 *
 * To run a mutation, you first call `useDeleteIdeaMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteIdeaMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteIdeaMutation, { data, loading, error }] = useDeleteIdeaMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteIdeaMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<DeleteIdeaMutation, DeleteIdeaMutationVariables>) {
        return ApolloReactHooks.useMutation<DeleteIdeaMutation, DeleteIdeaMutationVariables>(DeleteIdeaDocument, baseOptions);
      }
export type DeleteIdeaMutationHookResult = ReturnType<typeof useDeleteIdeaMutation>;
export type DeleteIdeaMutationResult = ApolloReactCommon.MutationResult<DeleteIdeaMutation>;
export type DeleteIdeaMutationOptions = ApolloReactCommon.BaseMutationOptions<DeleteIdeaMutation, DeleteIdeaMutationVariables>;
export const LikeIdeaDocument = gql`
    mutation LikeIdea($idea_id: ID!) {
  likeIdea(idea_id: $idea_id) {
    ...ToggleLikeBody
  }
}
    ${ToggleLikeBodyFragmentDoc}`;
export type LikeIdeaMutationFn = ApolloReactCommon.MutationFunction<LikeIdeaMutation, LikeIdeaMutationVariables>;

/**
 * __useLikeIdeaMutation__
 *
 * To run a mutation, you first call `useLikeIdeaMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLikeIdeaMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [likeIdeaMutation, { data, loading, error }] = useLikeIdeaMutation({
 *   variables: {
 *      idea_id: // value for 'idea_id'
 *   },
 * });
 */
export function useLikeIdeaMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<LikeIdeaMutation, LikeIdeaMutationVariables>) {
        return ApolloReactHooks.useMutation<LikeIdeaMutation, LikeIdeaMutationVariables>(LikeIdeaDocument, baseOptions);
      }
export type LikeIdeaMutationHookResult = ReturnType<typeof useLikeIdeaMutation>;
export type LikeIdeaMutationResult = ApolloReactCommon.MutationResult<LikeIdeaMutation>;
export type LikeIdeaMutationOptions = ApolloReactCommon.BaseMutationOptions<LikeIdeaMutation, LikeIdeaMutationVariables>;
export const UnlikeIdeaDocument = gql`
    mutation UnlikeIdea($idea_id: ID!) {
  unlikeIdea(idea_id: $idea_id) {
    ...ToggleLikeBody
  }
}
    ${ToggleLikeBodyFragmentDoc}`;
export type UnlikeIdeaMutationFn = ApolloReactCommon.MutationFunction<UnlikeIdeaMutation, UnlikeIdeaMutationVariables>;

/**
 * __useUnlikeIdeaMutation__
 *
 * To run a mutation, you first call `useUnlikeIdeaMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUnlikeIdeaMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [unlikeIdeaMutation, { data, loading, error }] = useUnlikeIdeaMutation({
 *   variables: {
 *      idea_id: // value for 'idea_id'
 *   },
 * });
 */
export function useUnlikeIdeaMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UnlikeIdeaMutation, UnlikeIdeaMutationVariables>) {
        return ApolloReactHooks.useMutation<UnlikeIdeaMutation, UnlikeIdeaMutationVariables>(UnlikeIdeaDocument, baseOptions);
      }
export type UnlikeIdeaMutationHookResult = ReturnType<typeof useUnlikeIdeaMutation>;
export type UnlikeIdeaMutationResult = ApolloReactCommon.MutationResult<UnlikeIdeaMutation>;
export type UnlikeIdeaMutationOptions = ApolloReactCommon.BaseMutationOptions<UnlikeIdeaMutation, UnlikeIdeaMutationVariables>;
export const SaveIdeaDocument = gql`
    mutation SaveIdea($idea_id: ID!) {
  saveIdea(idea_id: $idea_id) {
    ...ToggleSaveBody
  }
}
    ${ToggleSaveBodyFragmentDoc}`;
export type SaveIdeaMutationFn = ApolloReactCommon.MutationFunction<SaveIdeaMutation, SaveIdeaMutationVariables>;

/**
 * __useSaveIdeaMutation__
 *
 * To run a mutation, you first call `useSaveIdeaMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSaveIdeaMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [saveIdeaMutation, { data, loading, error }] = useSaveIdeaMutation({
 *   variables: {
 *      idea_id: // value for 'idea_id'
 *   },
 * });
 */
export function useSaveIdeaMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<SaveIdeaMutation, SaveIdeaMutationVariables>) {
        return ApolloReactHooks.useMutation<SaveIdeaMutation, SaveIdeaMutationVariables>(SaveIdeaDocument, baseOptions);
      }
export type SaveIdeaMutationHookResult = ReturnType<typeof useSaveIdeaMutation>;
export type SaveIdeaMutationResult = ApolloReactCommon.MutationResult<SaveIdeaMutation>;
export type SaveIdeaMutationOptions = ApolloReactCommon.BaseMutationOptions<SaveIdeaMutation, SaveIdeaMutationVariables>;
export const UnsaveIdeaDocument = gql`
    mutation UnsaveIdea($idea_id: ID!) {
  unsaveIdea(idea_id: $idea_id) {
    ...ToggleSaveBody
  }
}
    ${ToggleSaveBodyFragmentDoc}`;
export type UnsaveIdeaMutationFn = ApolloReactCommon.MutationFunction<UnsaveIdeaMutation, UnsaveIdeaMutationVariables>;

/**
 * __useUnsaveIdeaMutation__
 *
 * To run a mutation, you first call `useUnsaveIdeaMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUnsaveIdeaMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [unsaveIdeaMutation, { data, loading, error }] = useUnsaveIdeaMutation({
 *   variables: {
 *      idea_id: // value for 'idea_id'
 *   },
 * });
 */
export function useUnsaveIdeaMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UnsaveIdeaMutation, UnsaveIdeaMutationVariables>) {
        return ApolloReactHooks.useMutation<UnsaveIdeaMutation, UnsaveIdeaMutationVariables>(UnsaveIdeaDocument, baseOptions);
      }
export type UnsaveIdeaMutationHookResult = ReturnType<typeof useUnsaveIdeaMutation>;
export type UnsaveIdeaMutationResult = ApolloReactCommon.MutationResult<UnsaveIdeaMutation>;
export type UnsaveIdeaMutationOptions = ApolloReactCommon.BaseMutationOptions<UnsaveIdeaMutation, UnsaveIdeaMutationVariables>;
export const CreateFeatureDocument = gql`
    mutation CreateFeature($input: CreateFeatureWithoutIdeaInput!) {
  createFeature(input: $input) {
    ...FeatureBody
  }
}
    ${FeatureBodyFragmentDoc}`;
export type CreateFeatureMutationFn = ApolloReactCommon.MutationFunction<CreateFeatureMutation, CreateFeatureMutationVariables>;

/**
 * __useCreateFeatureMutation__
 *
 * To run a mutation, you first call `useCreateFeatureMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateFeatureMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createFeatureMutation, { data, loading, error }] = useCreateFeatureMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateFeatureMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateFeatureMutation, CreateFeatureMutationVariables>) {
        return ApolloReactHooks.useMutation<CreateFeatureMutation, CreateFeatureMutationVariables>(CreateFeatureDocument, baseOptions);
      }
export type CreateFeatureMutationHookResult = ReturnType<typeof useCreateFeatureMutation>;
export type CreateFeatureMutationResult = ApolloReactCommon.MutationResult<CreateFeatureMutation>;
export type CreateFeatureMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateFeatureMutation, CreateFeatureMutationVariables>;
export const UpdateFeatureDocument = gql`
    mutation UpdateFeature($input: UpdateFeatureInput!) {
  updateFeature(input: $input) {
    ...FeatureBody
  }
}
    ${FeatureBodyFragmentDoc}`;
export type UpdateFeatureMutationFn = ApolloReactCommon.MutationFunction<UpdateFeatureMutation, UpdateFeatureMutationVariables>;

/**
 * __useUpdateFeatureMutation__
 *
 * To run a mutation, you first call `useUpdateFeatureMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateFeatureMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateFeatureMutation, { data, loading, error }] = useUpdateFeatureMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateFeatureMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateFeatureMutation, UpdateFeatureMutationVariables>) {
        return ApolloReactHooks.useMutation<UpdateFeatureMutation, UpdateFeatureMutationVariables>(UpdateFeatureDocument, baseOptions);
      }
export type UpdateFeatureMutationHookResult = ReturnType<typeof useUpdateFeatureMutation>;
export type UpdateFeatureMutationResult = ApolloReactCommon.MutationResult<UpdateFeatureMutation>;
export type UpdateFeatureMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdateFeatureMutation, UpdateFeatureMutationVariables>;
export const DeleteFeatureDocument = gql`
    mutation DeleteFeature($id: ID!) {
  deleteFeature(id: $id) {
    id
  }
}
    `;
export type DeleteFeatureMutationFn = ApolloReactCommon.MutationFunction<DeleteFeatureMutation, DeleteFeatureMutationVariables>;

/**
 * __useDeleteFeatureMutation__
 *
 * To run a mutation, you first call `useDeleteFeatureMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteFeatureMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteFeatureMutation, { data, loading, error }] = useDeleteFeatureMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteFeatureMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<DeleteFeatureMutation, DeleteFeatureMutationVariables>) {
        return ApolloReactHooks.useMutation<DeleteFeatureMutation, DeleteFeatureMutationVariables>(DeleteFeatureDocument, baseOptions);
      }
export type DeleteFeatureMutationHookResult = ReturnType<typeof useDeleteFeatureMutation>;
export type DeleteFeatureMutationResult = ApolloReactCommon.MutationResult<DeleteFeatureMutation>;
export type DeleteFeatureMutationOptions = ApolloReactCommon.BaseMutationOptions<DeleteFeatureMutation, DeleteFeatureMutationVariables>;
export const GetIdeaByIdDocument = gql`
    query GetIdeaById($id: ID!) {
  idea(id: $id) {
    ...IdeaBody
    user {
      ...UserShortBody
    }
  }
}
    ${IdeaBodyFragmentDoc}
${UserShortBodyFragmentDoc}`;

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
export const GetIdeaFeaturesDocument = gql`
    query GetIdeaFeatures($idea_id: ID!, $after_feature_id: ID, $limit: Int!) {
  features(idea_id: $idea_id, after_feature_id: $after_feature_id, limit: $limit) @connection(key: "features", filter: ["idea_id"]) {
    page {
      ...PageBody
    }
    entry {
      ...FeatureBody
      user {
        id
      }
    }
  }
}
    ${PageBodyFragmentDoc}
${FeatureBodyFragmentDoc}`;

/**
 * __useGetIdeaFeaturesQuery__
 *
 * To run a query within a React component, call `useGetIdeaFeaturesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetIdeaFeaturesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetIdeaFeaturesQuery({
 *   variables: {
 *      idea_id: // value for 'idea_id'
 *      after_feature_id: // value for 'after_feature_id'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useGetIdeaFeaturesQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetIdeaFeaturesQuery, GetIdeaFeaturesQueryVariables>) {
        return ApolloReactHooks.useQuery<GetIdeaFeaturesQuery, GetIdeaFeaturesQueryVariables>(GetIdeaFeaturesDocument, baseOptions);
      }
export function useGetIdeaFeaturesLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetIdeaFeaturesQuery, GetIdeaFeaturesQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetIdeaFeaturesQuery, GetIdeaFeaturesQueryVariables>(GetIdeaFeaturesDocument, baseOptions);
        }
export type GetIdeaFeaturesQueryHookResult = ReturnType<typeof useGetIdeaFeaturesQuery>;
export type GetIdeaFeaturesLazyQueryHookResult = ReturnType<typeof useGetIdeaFeaturesLazyQuery>;
export type GetIdeaFeaturesQueryResult = ApolloReactCommon.QueryResult<GetIdeaFeaturesQuery, GetIdeaFeaturesQueryVariables>;
export const GetMyProfileDocument = gql`
    query GetMyProfile {
  me {
    ...UserBody
  }
}
    ${UserBodyFragmentDoc}`;

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
export const GetMySettingsDocument = gql`
    query GetMySettings {
  mySetting {
    ...SettingBody
  }
}
    ${SettingBodyFragmentDoc}`;

/**
 * __useGetMySettingsQuery__
 *
 * To run a query within a React component, call `useGetMySettingsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMySettingsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMySettingsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetMySettingsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetMySettingsQuery, GetMySettingsQueryVariables>) {
        return ApolloReactHooks.useQuery<GetMySettingsQuery, GetMySettingsQueryVariables>(GetMySettingsDocument, baseOptions);
      }
export function useGetMySettingsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetMySettingsQuery, GetMySettingsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetMySettingsQuery, GetMySettingsQueryVariables>(GetMySettingsDocument, baseOptions);
        }
export type GetMySettingsQueryHookResult = ReturnType<typeof useGetMySettingsQuery>;
export type GetMySettingsLazyQueryHookResult = ReturnType<typeof useGetMySettingsLazyQuery>;
export type GetMySettingsQueryResult = ApolloReactCommon.QueryResult<GetMySettingsQuery, GetMySettingsQueryVariables>;
export const GetUserByIdDocument = gql`
    query GetUserById($id: ID!) {
  user(id: $id) {
    ...UserBody
  }
}
    ${UserBodyFragmentDoc}`;

/**
 * __useGetUserByIdQuery__
 *
 * To run a query within a React component, call `useGetUserByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetUserByIdQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetUserByIdQuery, GetUserByIdQueryVariables>) {
        return ApolloReactHooks.useQuery<GetUserByIdQuery, GetUserByIdQueryVariables>(GetUserByIdDocument, baseOptions);
      }
export function useGetUserByIdLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetUserByIdQuery, GetUserByIdQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetUserByIdQuery, GetUserByIdQueryVariables>(GetUserByIdDocument, baseOptions);
        }
export type GetUserByIdQueryHookResult = ReturnType<typeof useGetUserByIdQuery>;
export type GetUserByIdLazyQueryHookResult = ReturnType<typeof useGetUserByIdLazyQuery>;
export type GetUserByIdQueryResult = ApolloReactCommon.QueryResult<GetUserByIdQuery, GetUserByIdQueryVariables>;
export const GetUserIdeasDocument = gql`
    query GetUserIdeas($id: ID!, $after_id: ID, $limit: Int!) {
  user(id: $id) @connection(key: "user", filter: ["id"]) {
    ...UserShortBody
    ideas(after_id: $after_id, limit: $limit) @connection(key: "ideas") {
      page {
        ...PageBody
      }
      entry {
        ...IdeaShortBody
      }
    }
  }
}
    ${UserShortBodyFragmentDoc}
${PageBodyFragmentDoc}
${IdeaShortBodyFragmentDoc}`;

/**
 * __useGetUserIdeasQuery__
 *
 * To run a query within a React component, call `useGetUserIdeasQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserIdeasQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserIdeasQuery({
 *   variables: {
 *      id: // value for 'id'
 *      after_id: // value for 'after_id'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useGetUserIdeasQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetUserIdeasQuery, GetUserIdeasQueryVariables>) {
        return ApolloReactHooks.useQuery<GetUserIdeasQuery, GetUserIdeasQueryVariables>(GetUserIdeasDocument, baseOptions);
      }
export function useGetUserIdeasLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetUserIdeasQuery, GetUserIdeasQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetUserIdeasQuery, GetUserIdeasQueryVariables>(GetUserIdeasDocument, baseOptions);
        }
export type GetUserIdeasQueryHookResult = ReturnType<typeof useGetUserIdeasQuery>;
export type GetUserIdeasLazyQueryHookResult = ReturnType<typeof useGetUserIdeasLazyQuery>;
export type GetUserIdeasQueryResult = ApolloReactCommon.QueryResult<GetUserIdeasQuery, GetUserIdeasQueryVariables>;
export const GetSavedUserIdeasDocument = gql`
    query GetSavedUserIdeas($id: ID!, $after_id: ID, $limit: Int!) {
  user(id: $id) {
    ...UserShortBody
    savedIdeas(after_id: $after_id, limit: $limit) @connection(key: "savedIdeas") {
      page {
        ...PageBody
      }
      entry {
        ...IdeaShortBody
      }
    }
  }
}
    ${UserShortBodyFragmentDoc}
${PageBodyFragmentDoc}
${IdeaShortBodyFragmentDoc}`;

/**
 * __useGetSavedUserIdeasQuery__
 *
 * To run a query within a React component, call `useGetSavedUserIdeasQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSavedUserIdeasQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSavedUserIdeasQuery({
 *   variables: {
 *      id: // value for 'id'
 *      after_id: // value for 'after_id'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useGetSavedUserIdeasQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetSavedUserIdeasQuery, GetSavedUserIdeasQueryVariables>) {
        return ApolloReactHooks.useQuery<GetSavedUserIdeasQuery, GetSavedUserIdeasQueryVariables>(GetSavedUserIdeasDocument, baseOptions);
      }
export function useGetSavedUserIdeasLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetSavedUserIdeasQuery, GetSavedUserIdeasQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetSavedUserIdeasQuery, GetSavedUserIdeasQueryVariables>(GetSavedUserIdeasDocument, baseOptions);
        }
export type GetSavedUserIdeasQueryHookResult = ReturnType<typeof useGetSavedUserIdeasQuery>;
export type GetSavedUserIdeasLazyQueryHookResult = ReturnType<typeof useGetSavedUserIdeasLazyQuery>;
export type GetSavedUserIdeasQueryResult = ApolloReactCommon.QueryResult<GetSavedUserIdeasQuery, GetSavedUserIdeasQueryVariables>;
export const GetUserLikesDocument = gql`
    query GetUserLikes($id: ID!, $after_id: ID, $limit: Int!) {
  user(id: $id) @connection(key: "user", filter: ["id"]) {
    id
    likedIdeas(after_id: $after_id, limit: $limit) @connection(key: "likedIdeas") {
      page {
        ...PageBody
      }
      entry {
        ...IdeaShortBody
        user {
          ...UserShortBody
        }
      }
    }
  }
}
    ${PageBodyFragmentDoc}
${IdeaShortBodyFragmentDoc}
${UserShortBodyFragmentDoc}`;

/**
 * __useGetUserLikesQuery__
 *
 * To run a query within a React component, call `useGetUserLikesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserLikesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserLikesQuery({
 *   variables: {
 *      id: // value for 'id'
 *      after_id: // value for 'after_id'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useGetUserLikesQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetUserLikesQuery, GetUserLikesQueryVariables>) {
        return ApolloReactHooks.useQuery<GetUserLikesQuery, GetUserLikesQueryVariables>(GetUserLikesDocument, baseOptions);
      }
export function useGetUserLikesLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetUserLikesQuery, GetUserLikesQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetUserLikesQuery, GetUserLikesQueryVariables>(GetUserLikesDocument, baseOptions);
        }
export type GetUserLikesQueryHookResult = ReturnType<typeof useGetUserLikesQuery>;
export type GetUserLikesLazyQueryHookResult = ReturnType<typeof useGetUserLikesLazyQuery>;
export type GetUserLikesQueryResult = ApolloReactCommon.QueryResult<GetUserLikesQuery, GetUserLikesQueryVariables>;
export const GetNewIdeasDocument = gql`
    query GetNewIdeas($after_id: ID, $limit: Int!) {
  newIdeas(after_id: $after_id, limit: $limit) @connection(key: "newIdeas") {
    page {
      ...PageBody
    }
    entry {
      ...IdeaShortBody
      user {
        ...UserShortBody
      }
    }
  }
}
    ${PageBodyFragmentDoc}
${IdeaShortBodyFragmentDoc}
${UserShortBodyFragmentDoc}`;

/**
 * __useGetNewIdeasQuery__
 *
 * To run a query within a React component, call `useGetNewIdeasQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetNewIdeasQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetNewIdeasQuery({
 *   variables: {
 *      after_id: // value for 'after_id'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useGetNewIdeasQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetNewIdeasQuery, GetNewIdeasQueryVariables>) {
        return ApolloReactHooks.useQuery<GetNewIdeasQuery, GetNewIdeasQueryVariables>(GetNewIdeasDocument, baseOptions);
      }
export function useGetNewIdeasLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetNewIdeasQuery, GetNewIdeasQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetNewIdeasQuery, GetNewIdeasQueryVariables>(GetNewIdeasDocument, baseOptions);
        }
export type GetNewIdeasQueryHookResult = ReturnType<typeof useGetNewIdeasQuery>;
export type GetNewIdeasLazyQueryHookResult = ReturnType<typeof useGetNewIdeasLazyQuery>;
export type GetNewIdeasQueryResult = ApolloReactCommon.QueryResult<GetNewIdeasQuery, GetNewIdeasQueryVariables>;
export const GetTopIdeasDocument = gql`
    query GetTopIdeas($interval: INTERVAL!, $skip: Int!, $limit: Int!) {
  topIdeas(interval: $interval, skip: $skip, limit: $limit) @connection(key: "topIdeas", filter: ["interval"]) {
    page {
      ...PageBody
    }
    entry {
      ...IdeaShortBody
      user {
        ...UserShortBody
      }
    }
  }
}
    ${PageBodyFragmentDoc}
${IdeaShortBodyFragmentDoc}
${UserShortBodyFragmentDoc}`;

/**
 * __useGetTopIdeasQuery__
 *
 * To run a query within a React component, call `useGetTopIdeasQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTopIdeasQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTopIdeasQuery({
 *   variables: {
 *      interval: // value for 'interval'
 *      skip: // value for 'skip'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useGetTopIdeasQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetTopIdeasQuery, GetTopIdeasQueryVariables>) {
        return ApolloReactHooks.useQuery<GetTopIdeasQuery, GetTopIdeasQueryVariables>(GetTopIdeasDocument, baseOptions);
      }
export function useGetTopIdeasLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetTopIdeasQuery, GetTopIdeasQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetTopIdeasQuery, GetTopIdeasQueryVariables>(GetTopIdeasDocument, baseOptions);
        }
export type GetTopIdeasQueryHookResult = ReturnType<typeof useGetTopIdeasQuery>;
export type GetTopIdeasLazyQueryHookResult = ReturnType<typeof useGetTopIdeasLazyQuery>;
export type GetTopIdeasQueryResult = ApolloReactCommon.QueryResult<GetTopIdeasQuery, GetTopIdeasQueryVariables>;