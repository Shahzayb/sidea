import gql from 'graphql-tag';

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

export const GetUserById = gql`
  query GetUserById($id: ID!) {
    user(id: $id) {
      id
      name
      username
      avatar
      createdAt
    }
  }
`;

export const GetUserIdeas = gql`
  query GetUserIdeas($id: ID!, $after_id: ID, $limit: Int!) {
    user(id: $id) {
      id
      username
      avatar
      ideas(after_id: $after_id, limit: $limit) {
        page {
          cursor
          hasNextPage
        }
        entry {
          id
          title
          createdAt
        }
      }
    }
  }
`;

export const GetSavedUserIdeas = gql`
  query GetSavedUserIdeas($id: ID!, $after_id: ID, $limit: Int!) {
    user(id: $id) {
      id
      username
      avatar
      savedIdeas(after_id: $after_id, limit: $limit) {
        page {
          cursor
          hasNextPage
        }
        entry {
          id
          title
          createdAt
        }
      }
    }
  }
`;

export const GetUserLikes = gql`
  query GetUserLikes($id: ID!, $after_id: ID, $limit: Int!) {
    user(id: $id) {
      id
      likedIdeas(after_id: $after_id, limit: $limit) {
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

export const GetTopIdeas = gql`
  query GetTopIdeas($interval: INTERVAL!, $skip: Int!, $limit: Int!) {
    topIdeas(interval: $interval, skip: $skip, limit: $limit) {
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
