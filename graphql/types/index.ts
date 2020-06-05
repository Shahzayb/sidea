import { GraphQLResolveInfo } from 'graphql';
export type Maybe<T> = T | null;
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
  newIdeas: Array<Idea>;
  topIdeas: Array<Idea>;
  me: User;
  user: User;
};


export type QueryNewIdeasArgs = {
  after_id?: Maybe<Scalars['ID']>;
  limit: Scalars['Int'];
};


export type QueryTopIdeasArgs = {
  interval: Interval;
  after_id?: Maybe<Scalars['ID']>;
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
  deleteIdea: Idea;
  deleteFeature: Feature;
  updateIdea: Idea;
  updateFeature: Feature;
  saveIdea: Save;
  deleteSavedIdea: Save;
};


export type MutationLoginArgs = {
  input?: Maybe<LoginInput>;
};


export type MutationSignupArgs = {
  input?: Maybe<SignupInput>;
};


export type MutationCreateIdeaArgs = {
  input?: Maybe<CreateIdeaInput>;
};


export type MutationCreateFeatureArgs = {
  input?: Maybe<CreateFeatureInput>;
};


export type MutationDeleteIdeaArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteFeatureArgs = {
  id: Scalars['ID'];
};


export type MutationUpdateIdeaArgs = {
  input?: Maybe<UpdateIdeaInput>;
};


export type MutationUpdateFeatureArgs = {
  input?: Maybe<UpdateFeatureInput>;
};


export type MutationSaveIdeaArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteSavedIdeaArgs = {
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
  body?: Maybe<Scalars['String']>;
};

export type CreateIdeaInput = {
  title: Scalars['String'];
  body: Scalars['String'];
  user: User;
  tags: Array<Scalars['String']>;
  features: Array<CreateFeatureInput>;
};

export type UpdateIdeaInput = {
  id: Scalars['ID'];
  title?: Maybe<Scalars['String']>;
  body?: Maybe<Scalars['String']>;
};

export type UpdateFeatureInput = {
  id: Scalars['ID'];
  title?: Maybe<Scalars['String']>;
  body?: Maybe<Scalars['String']>;
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
  email: Scalars['String'];
  avatar: Scalars['String'];
  ideas: Array<Idea>;
  savedIdeas: Array<Idea>;
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

export type Idea = {
  __typename?: 'Idea';
  id: Scalars['ID'];
  title: Scalars['String'];
  body: Scalars['String'];
  user: User;
  tags: Array<Scalars['String']>;
  likes: Array<Like>;
  likesCount: Scalars['Int'];
  isLikedByMe: Scalars['Boolean'];
  features: Array<Feature>;
  createdAt: Scalars['String'];
};

export type Feature = {
  __typename?: 'Feature';
  id: Scalars['ID'];
  title: Scalars['String'];
  body?: Maybe<Scalars['String']>;
  idea: Idea;
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
export type ResolversTypes = {
  String: ResolverTypeWrapper<Scalars['String']>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  Query: ResolverTypeWrapper<{}>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  Mutation: ResolverTypeWrapper<{}>;
  LoginInput: LoginInput;
  SignupInput: SignupInput;
  CreateFeatureInput: CreateFeatureInput;
  CreateIdeaInput: CreateIdeaInput;
  UpdateIdeaInput: UpdateIdeaInput;
  UpdateFeatureInput: UpdateFeatureInput;
  INTERVAL: Interval;
  AuthResponse: ResolverTypeWrapper<AuthResponse>;
  User: ResolverTypeWrapper<User>;
  Idea: ResolverTypeWrapper<Idea>;
  Feature: ResolverTypeWrapper<Feature>;
  Like: ResolverTypeWrapper<Like>;
  Save: ResolverTypeWrapper<Save>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  String: Scalars['String'];
  Boolean: Scalars['Boolean'];
  Query: {};
  ID: Scalars['ID'];
  Int: Scalars['Int'];
  Mutation: {};
  LoginInput: LoginInput;
  SignupInput: SignupInput;
  CreateFeatureInput: CreateFeatureInput;
  CreateIdeaInput: CreateIdeaInput;
  UpdateIdeaInput: UpdateIdeaInput;
  UpdateFeatureInput: UpdateFeatureInput;
  INTERVAL: Interval;
  AuthResponse: AuthResponse;
  User: User;
  Idea: Idea;
  Feature: Feature;
  Like: Like;
  Save: Save;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  newIdeas?: Resolver<Array<ResolversTypes['Idea']>, ParentType, ContextType, RequireFields<QueryNewIdeasArgs, 'limit'>>;
  topIdeas?: Resolver<Array<ResolversTypes['Idea']>, ParentType, ContextType, RequireFields<QueryTopIdeasArgs, 'interval' | 'limit'>>;
  me?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<QueryUserArgs, 'id'>>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  login?: Resolver<ResolversTypes['AuthResponse'], ParentType, ContextType, RequireFields<MutationLoginArgs, never>>;
  signup?: Resolver<ResolversTypes['AuthResponse'], ParentType, ContextType, RequireFields<MutationSignupArgs, never>>;
  createIdea?: Resolver<ResolversTypes['Idea'], ParentType, ContextType, RequireFields<MutationCreateIdeaArgs, never>>;
  createFeature?: Resolver<ResolversTypes['Feature'], ParentType, ContextType, RequireFields<MutationCreateFeatureArgs, never>>;
  deleteIdea?: Resolver<ResolversTypes['Idea'], ParentType, ContextType, RequireFields<MutationDeleteIdeaArgs, 'id'>>;
  deleteFeature?: Resolver<ResolversTypes['Feature'], ParentType, ContextType, RequireFields<MutationDeleteFeatureArgs, 'id'>>;
  updateIdea?: Resolver<ResolversTypes['Idea'], ParentType, ContextType, RequireFields<MutationUpdateIdeaArgs, never>>;
  updateFeature?: Resolver<ResolversTypes['Feature'], ParentType, ContextType, RequireFields<MutationUpdateFeatureArgs, never>>;
  saveIdea?: Resolver<ResolversTypes['Save'], ParentType, ContextType, RequireFields<MutationSaveIdeaArgs, 'id'>>;
  deleteSavedIdea?: Resolver<ResolversTypes['Save'], ParentType, ContextType, RequireFields<MutationDeleteSavedIdeaArgs, 'id'>>;
};

export type AuthResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['AuthResponse'] = ResolversParentTypes['AuthResponse']> = {
  token?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  username?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  avatar?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  ideas?: Resolver<Array<ResolversTypes['Idea']>, ParentType, ContextType, RequireFields<UserIdeasArgs, 'limit'>>;
  savedIdeas?: Resolver<Array<ResolversTypes['Idea']>, ParentType, ContextType, RequireFields<UserSavedIdeasArgs, 'limit'>>;
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type IdeaResolvers<ContextType = any, ParentType extends ResolversParentTypes['Idea'] = ResolversParentTypes['Idea']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  body?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  tags?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  likes?: Resolver<Array<ResolversTypes['Like']>, ParentType, ContextType>;
  likesCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  isLikedByMe?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  features?: Resolver<Array<ResolversTypes['Feature']>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type FeatureResolvers<ContextType = any, ParentType extends ResolversParentTypes['Feature'] = ResolversParentTypes['Feature']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  body?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  idea?: Resolver<ResolversTypes['Idea'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type LikeResolvers<ContextType = any, ParentType extends ResolversParentTypes['Like'] = ResolversParentTypes['Like']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  idea?: Resolver<ResolversTypes['Idea'], ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type SaveResolvers<ContextType = any, ParentType extends ResolversParentTypes['Save'] = ResolversParentTypes['Save']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  idea?: Resolver<ResolversTypes['Idea'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type Resolvers<ContextType = any> = {
  Query?: QueryResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  AuthResponse?: AuthResponseResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
  Idea?: IdeaResolvers<ContextType>;
  Feature?: FeatureResolvers<ContextType>;
  Like?: LikeResolvers<ContextType>;
  Save?: SaveResolvers<ContextType>;
};


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = any> = Resolvers<ContextType>;
