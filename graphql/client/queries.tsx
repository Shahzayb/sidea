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

export const GetNewIdeas = gql`
  query GetNewIdeas($after_id: ID, $limit: Int!) {
    newIdeas(after_id: $after_id, limit: $limit) {
      page {
        cursor
        hasNextPage
      }
      entry {
        id
        title
        createdAt
        user {
          id
          username
          avatar
        }
      }
    }
  }
`;
