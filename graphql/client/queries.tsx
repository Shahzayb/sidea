import gql from 'graphql-tag';

export const UserBody = gql`
  fragment UserBody on User {
    id
    name
    username
    email
    avatar
    createdAt
  }
`;

export const UserShortBody = gql`
  fragment UserShortBody on User {
    id
    username
    avatar
  }
`;

export const IdeaBody = gql`
  fragment IdeaBody on Idea {
    id
    title
    body
    tags
    isLikedByMe
    likesCount
    createdAt
  }
`;

export const IdeaShortBody = gql`
  fragment IdeaShortBody on Idea {
    id
    title
    createdAt
  }
`;

export const PageBody = gql`
  fragment PageBody on Page {
    cursor
    hasNextPage
  }
`;

export const GetIdeaById = gql`
  query GetIdeaById($id: ID!) {
    idea(id: $id) {
      ...IdeaBody
      user {
        ...UserShortBody
      }
    }
  }
`;

export const GetMyProfile = gql`
  query GetMyProfile {
    me {
      ...UserBody
    }
  }
`;

export const GetUserById = gql`
  query GetUserById($id: ID!) {
    user(id: $id) {
      ...UserBody
    }
  }
`;

export const GetUserIdeas = gql`
  query GetUserIdeas($id: ID!, $after_id: ID, $limit: Int!) {
    user(id: $id) {
      ...UserShortBody
      ideas(after_id: $after_id, limit: $limit) {
        page {
          ...PageBody
        }
        entry {
          ...IdeaShortBody
        }
      }
    }
  }
`;

export const GetSavedUserIdeas = gql`
  query GetSavedUserIdeas($id: ID!, $after_id: ID, $limit: Int!) {
    user(id: $id) {
      ...UserShortBody
      savedIdeas(after_id: $after_id, limit: $limit) {
        page {
          ...PageBody
        }
        entry {
          ...IdeaShortBody
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
`;

export const GetNewIdeas = gql`
  query GetNewIdeas($after_id: ID, $limit: Int!) {
    newIdeas(after_id: $after_id, limit: $limit) {
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
`;

export const GetTopIdeas = gql`
  query GetTopIdeas($interval: INTERVAL!, $skip: Int!, $limit: Int!) {
    topIdeas(interval: $interval, skip: $skip, limit: $limit) {
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
`;
