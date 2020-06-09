import { gql } from 'apollo-server-micro';

const typeDefs = gql`
  type Query {
    # newIdeas(after_id: ID, limit: Int!): [Idea!]!
    # topIdeas(interval: INTERVAL!, after_id: ID, limit: Int!): [Idea!]!
    idea(id: ID!): Idea
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
    body: String!
  }

  input CreateFeatureWithoutIdeaInput {
    ideaId: ID!
    title: String!
    body: String!
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
    title: String
    body: String
  }

  # enum INTERVAL {
  #   DAY
  #   WEEK
  #   YEAR
  #   ALL_TIME
  # }

  # models

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
    ideas(after_id: ID, limit: Int!): [Idea!]!
    savedIdeas(after_id: ID, limit: Int!): [Idea!]!
    # likedIdeas(after_id: ID, limit: Int!): [Idea!]!
    createdAt: String!
  }

  type Idea {
    id: ID!
    title: String!
    body: String!
    user: User!
    tags: [String!]
    # likes(after_id: ID, limit: Int!): [Like!]!
    likesCount: Int!
    isLikedByMe: Boolean!
    isSavedByMe: Boolean!
    features(after_id: ID, limit: Int!): [Feature!]
    createdAt: String!
  }

  type Feature {
    id: ID!
    title: String!
    body: String!
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
