import { gql } from 'apollo-boost';

export const GetIdeaById = gql`
  query GetIdeaById($id: ID!) {
    idea(id: $id) {
      id
      title
      body
      tags
      createdAt
      user {
        id
        username
        avatar
      }
    }
  }
`;

export const GetMyProfile = gql`
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
