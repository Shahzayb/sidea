import { GraphQLResolveInfo } from 'graphql';
import { User as CustomUser, Feature as CustomFeature, Idea as CustomIdea, Like as CustomLike, Save as CustomSave, Tag as CustomTag } from '@prisma/client';
import { FeaturePageResponse as CustomFeaturePageResponse, IdeaPageResponse as CustomIdeaPageResponse, Page as CustomPage } from './mappers/models';
import { Context } from '../../pages/api/graphql';
export type Maybe<T> = T | null;
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
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
  Month = 'MONTH',
  Year = 'YEAR',
  AllTime = 'ALL_TIME'
}

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

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;


export type LegacyStitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type NewStitchingResolver<TResult, TParent, TContext, TArgs> = {
  selectionSet: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type StitchingResolver<TResult, TParent, TContext, TArgs> = LegacyStitchingResolver<TResult, TParent, TContext, TArgs> | NewStitchingResolver<TResult, TParent, TContext, TArgs>;
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}> = (obj: T, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  String: ResolverTypeWrapper<Scalars['String']>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  Query: ResolverTypeWrapper<{}>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  Mutation: ResolverTypeWrapper<{}>;
  LoginInput: LoginInput;
  SignupInput: SignupInput;
  CreateFeatureInput: CreateFeatureInput;
  CreateFeatureWithoutIdeaInput: CreateFeatureWithoutIdeaInput;
  CreateIdeaInput: CreateIdeaInput;
  UpdateIdeaInput: UpdateIdeaInput;
  UpdateFeatureInput: UpdateFeatureInput;
  INTERVAL: Interval;
  IdeaPageResponse: ResolverTypeWrapper<CustomIdeaPageResponse>;
  FeaturePageResponse: ResolverTypeWrapper<CustomFeaturePageResponse>;
  Page: ResolverTypeWrapper<CustomPage>;
  AuthResponse: ResolverTypeWrapper<Omit<AuthResponse, 'user'> & { user: ResolversTypes['User'] }>;
  User: ResolverTypeWrapper<CustomUser>;
  Idea: ResolverTypeWrapper<CustomIdea>;
  Feature: ResolverTypeWrapper<CustomFeature>;
  Like: ResolverTypeWrapper<CustomLike>;
  Save: ResolverTypeWrapper<CustomSave>;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  String: Scalars['String'];
  Boolean: Scalars['Boolean'];
  Query: {};
  ID: Scalars['ID'];
  Int: Scalars['Int'];
  Mutation: {};
  LoginInput: LoginInput;
  SignupInput: SignupInput;
  CreateFeatureInput: CreateFeatureInput;
  CreateFeatureWithoutIdeaInput: CreateFeatureWithoutIdeaInput;
  CreateIdeaInput: CreateIdeaInput;
  UpdateIdeaInput: UpdateIdeaInput;
  UpdateFeatureInput: UpdateFeatureInput;
  INTERVAL: Interval;
  IdeaPageResponse: CustomIdeaPageResponse;
  FeaturePageResponse: CustomFeaturePageResponse;
  Page: CustomPage;
  AuthResponse: Omit<AuthResponse, 'user'> & { user: ResolversParentTypes['User'] };
  User: CustomUser;
  Idea: CustomIdea;
  Feature: CustomFeature;
  Like: CustomLike;
  Save: CustomSave;
}>;

export type QueryResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  newIdeas?: Resolver<ResolversTypes['IdeaPageResponse'], ParentType, ContextType, RequireFields<QueryNewIdeasArgs, 'limit'>>;
  topIdeas?: Resolver<ResolversTypes['IdeaPageResponse'], ParentType, ContextType, RequireFields<QueryTopIdeasArgs, 'interval' | 'skip' | 'limit'>>;
  idea?: Resolver<Maybe<ResolversTypes['Idea']>, ParentType, ContextType, RequireFields<QueryIdeaArgs, 'id'>>;
  features?: Resolver<ResolversTypes['FeaturePageResponse'], ParentType, ContextType, RequireFields<QueryFeaturesArgs, 'idea_id' | 'limit'>>;
  me?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<QueryUserArgs, 'id'>>;
}>;

export type MutationResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = ResolversObject<{
  login?: Resolver<ResolversTypes['AuthResponse'], ParentType, ContextType, RequireFields<MutationLoginArgs, 'input'>>;
  signup?: Resolver<ResolversTypes['AuthResponse'], ParentType, ContextType, RequireFields<MutationSignupArgs, 'input'>>;
  createIdea?: Resolver<ResolversTypes['Idea'], ParentType, ContextType, RequireFields<MutationCreateIdeaArgs, 'input'>>;
  createFeature?: Resolver<ResolversTypes['Feature'], ParentType, ContextType, RequireFields<MutationCreateFeatureArgs, 'input'>>;
  updateIdea?: Resolver<ResolversTypes['Idea'], ParentType, ContextType, RequireFields<MutationUpdateIdeaArgs, 'input'>>;
  updateFeature?: Resolver<ResolversTypes['Feature'], ParentType, ContextType, RequireFields<MutationUpdateFeatureArgs, 'input'>>;
  deleteIdea?: Resolver<ResolversTypes['Idea'], ParentType, ContextType, RequireFields<MutationDeleteIdeaArgs, 'id'>>;
  deleteFeature?: Resolver<ResolversTypes['Feature'], ParentType, ContextType, RequireFields<MutationDeleteFeatureArgs, 'id'>>;
  saveIdea?: Resolver<ResolversTypes['Save'], ParentType, ContextType, RequireFields<MutationSaveIdeaArgs, 'id'>>;
  deleteSavedIdea?: Resolver<ResolversTypes['Save'], ParentType, ContextType, RequireFields<MutationDeleteSavedIdeaArgs, 'id'>>;
  likeIdea?: Resolver<ResolversTypes['Like'], ParentType, ContextType, RequireFields<MutationLikeIdeaArgs, 'id'>>;
  unlikeIdea?: Resolver<ResolversTypes['Like'], ParentType, ContextType, RequireFields<MutationUnlikeIdeaArgs, 'id'>>;
}>;

export type IdeaPageResponseResolvers<ContextType = Context, ParentType extends ResolversParentTypes['IdeaPageResponse'] = ResolversParentTypes['IdeaPageResponse']> = ResolversObject<{
  page?: Resolver<ResolversTypes['Page'], ParentType, ContextType>;
  entry?: Resolver<Array<ResolversTypes['Idea']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;

export type FeaturePageResponseResolvers<ContextType = Context, ParentType extends ResolversParentTypes['FeaturePageResponse'] = ResolversParentTypes['FeaturePageResponse']> = ResolversObject<{
  page?: Resolver<ResolversTypes['Page'], ParentType, ContextType>;
  entry?: Resolver<Array<ResolversTypes['Feature']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;

export type PageResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Page'] = ResolversParentTypes['Page']> = ResolversObject<{
  cursor?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  hasNextPage?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;

export type AuthResponseResolvers<ContextType = Context, ParentType extends ResolversParentTypes['AuthResponse'] = ResolversParentTypes['AuthResponse']> = ResolversObject<{
  token?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;

export type UserResolvers<ContextType = Context, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  username?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  avatar?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  ideas?: Resolver<ResolversTypes['IdeaPageResponse'], ParentType, ContextType, RequireFields<UserIdeasArgs, 'limit'>>;
  savedIdeas?: Resolver<ResolversTypes['IdeaPageResponse'], ParentType, ContextType, RequireFields<UserSavedIdeasArgs, 'limit'>>;
  likedIdeas?: Resolver<ResolversTypes['IdeaPageResponse'], ParentType, ContextType, RequireFields<UserLikedIdeasArgs, 'limit'>>;
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;

export type IdeaResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Idea'] = ResolversParentTypes['Idea']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  body?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  tags?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  likesCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  isLikedByMe?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  isSavedByMe?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  features?: Resolver<ResolversTypes['FeaturePageResponse'], ParentType, ContextType, RequireFields<IdeaFeaturesArgs, 'limit'>>;
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;

export type FeatureResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Feature'] = ResolversParentTypes['Feature']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  idea?: Resolver<ResolversTypes['Idea'], ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;

export type LikeResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Like'] = ResolversParentTypes['Like']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  idea?: Resolver<ResolversTypes['Idea'], ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;

export type SaveResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Save'] = ResolversParentTypes['Save']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  idea?: Resolver<ResolversTypes['Idea'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;

export type Resolvers<ContextType = Context> = ResolversObject<{
  Query?: QueryResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  IdeaPageResponse?: IdeaPageResponseResolvers<ContextType>;
  FeaturePageResponse?: FeaturePageResponseResolvers<ContextType>;
  Page?: PageResolvers<ContextType>;
  AuthResponse?: AuthResponseResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
  Idea?: IdeaResolvers<ContextType>;
  Feature?: FeatureResolvers<ContextType>;
  Like?: LikeResolvers<ContextType>;
  Save?: SaveResolvers<ContextType>;
}>;


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = Context> = Resolvers<ContextType>;
