import { gql } from 'apollo-server-micro';

const typeDefs = gql`
  type Query {
    newIdeas(after_id: ID, limit: Int!): IdeaPageResponse!
    topIdeas(interval: INTERVAL!, skip: Int = 0, limit: Int!): IdeaPageResponse!
    idea(id: ID!): Idea
    features(
      idea_id: ID!
      after_feature_id: ID
      limit: Int!
    ): FeaturePageResponse!
    me: User!
    user(id: ID!): User
  }

  type Mutation {
    login(input: LoginInput!): AuthResponse!
    signup(input: SignupInput!): AuthResponse!
    # deleteUser(id: ID!): User!
    createIdea(input: CreateIdeaInput!): Idea!
    createFeature(input: CreateFeatureWithoutIdeaInput!): Feature!
    updateIdea(input: UpdateIdeaInput!): Idea!
    updateFeature(input: UpdateFeatureInput!): Feature!
    deleteIdea(id: ID!): Idea!
    deleteFeature(id: ID!): Feature!
    saveIdea(id: ID!): Save!
    deleteSavedIdea(id: ID!): Save!
    likeIdea(id: ID!): Like!
    unlikeIdea(id: ID!): Like!
  }

  input LoginInput {
    username: String!
    password: String!
  }

  input SignupInput {
    name: String!
    username: String!
    email: String!
    password: String!
  }

  input CreateFeatureInput {
    title: String!
  }

  input CreateFeatureWithoutIdeaInput {
    ideaId: ID!
    title: String!
  }

  input CreateIdeaInput {
    title: String!
    body: String!
    tags: [String!]
    features: [CreateFeatureInput!]
  }

  input UpdateIdeaInput {
    id: ID!
    title: String
    body: String
    tags: [String!]
  }

  input UpdateFeatureInput {
    id: ID!
    title: String!
  }

  enum INTERVAL {
    DAY
    WEEK
    MONTH
    YEAR
    ALL_TIME
  }

  # models

  type IdeaPageResponse {
    page: Page!
    entry: [Idea!]!
  }

  type FeaturePageResponse {
    page: Page!
    entry: [Feature!]!
  }

  type Page {
    cursor: ID
    hasNextPage: Boolean!
  }

  type AuthResponse {
    token: String!
    user: User!
  }

  type User {
    id: ID!
    name: String!
    username: String!
    email: String
    avatar: String!
    ideas(after_id: ID, limit: Int!): IdeaPageResponse!
    savedIdeas(after_id: ID, limit: Int!): IdeaPageResponse!
    likedIdeas(after_id: ID, limit: Int!): IdeaPageResponse!
    createdAt: String!
  }

  type Idea {
    id: ID!
    title: String!
    body: String!
    user: User!
    tags: [String!]!
    likesCount: Int!
    isLikedByMe: Boolean!
    isSavedByMe: Boolean!
    features(after_id: ID, limit: Int!): FeaturePageResponse!
    createdAt: String!
  }

  type Feature {
    id: ID!
    title: String!
    idea: Idea!
    user: User!
    createdAt: String!
  }

  type Like {
    id: ID!
    idea: Idea!
    user: User!
    createdAt: String!
  }

  type Save {
    id: ID!
    user: User!
    idea: Idea!
    createdAt: String!
  }
`;

export default typeDefs;
