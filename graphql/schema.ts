import { gql } from 'apollo-server-micro';

const typeDefs = gql`
  type Query {
    # newIdeas(after_id: ID, limit: Int!): [Idea!]!
    # topIdeas(interval: INTERVAL!, after_id: ID, limit: Int!): [Idea!]!
    me: User!
    user(id: ID!): User
  }

  type Mutation {
    login(input: LoginInput!): AuthResponse!
    signup(input: SignupInput!): AuthResponse!
    # createIdea(input: CreateIdeaInput!): Idea!
    # createFeature(input: CreateFeatureInput!): Feature!
    # deleteIdea(id: ID!): Idea!
    # deleteFeature(id: ID!): Feature!
    # updateIdea(input: UpdateIdeaInput!): Idea!
    # updateFeature(input: UpdateFeatureInput!): Feature!
    # saveIdea(id: ID!): Save!
    # deleteSavedIdea(id: ID!): Save!
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

  # input CreateFeatureInput {
  #   title: String!
  #   body: String
  # }

  # input CreateIdeaInput {
  #   title: String!
  #   body: String!
  #   user: User!
  #   tags: [String!]!
  #   features: [CreateFeatureInput!]!
  # }

  # input UpdateIdeaInput {
  #   id: ID!
  #   title: String
  #   body: String
  # }

  # input UpdateFeatureInput {
  #   id: ID!
  #   title: String
  #   body: String
  # }

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
    # ideas(after_id: ID, limit: Int!): [Idea!]!
    # savedIdeas(after_id: ID, limit: Int!): [Idea!]!
    createdAt: String!
  }

  # type Idea {
  #   id: ID!
  #   title: String!
  #   body: String!
  #   user: User!
  #   tags: [String!]!
  #   likes: [Like!]!
  #   likesCount: Int!
  #   isLikedByMe: Boolean!
  #   features: [Feature!]!
  #   createdAt: String!
  # }

  # type Feature {
  #   id: ID!
  #   title: String!
  #   body: String
  #   idea: Idea!
  #   createdAt: String!
  # }

  # type Like {
  #   id: ID!
  #   idea: Idea!
  #   user: User!
  #   createdAt: String!
  # }

  # type Save {
  #   id: ID!
  #   user: User!
  #   idea: Idea!
  #   createdAt: String!
  # }
`;

export default typeDefs;
