import gql from 'graphql-tag';

export const ToggleLikeBody = gql`
  fragment ToggleLikeBody on Like {
    id
    idea {
      id
      likesCount
      isLikedByMe
    }
  }
`;

export const ToggleSaveBody = gql`
  fragment ToggleSaveBody on Save {
    id
    idea {
      id
      isSavedByMe
    }
  }
`;

export const Login = gql`
  mutation Login($input: LoginInput!) {
    login(input: $input) {
      user {
        id
      }
      token
    }
  }
`;

export const SignUp = gql`
  mutation SignUp($input: SignupInput!) {
    signup(input: $input) {
      user {
        id
      }
      token
    }
  }
`;

export const CreateIdea = gql`
  mutation CreateIdea($input: CreateIdeaInput!) {
    createIdea(input: $input) {
      id
    }
  }
`;

export const UpdateIdea = gql`
  mutation UpdateIdea($input: UpdateIdeaInput!) {
    updateIdea(input: $input) {
      id
      title
      body
      tags
    }
  }
`;

export const DeleteIdea = gql`
  mutation DeleteIdea($id: ID!) {
    deleteIdea(id: $id) {
      id
    }
  }
`;

export const LikeIdea = gql`
  mutation LikeIdea($idea_id: ID!) {
    likeIdea(idea_id: $idea_id) {
      ...ToggleLikeBody
    }
  }
`;

export const UnlikeIdea = gql`
  mutation UnlikeIdea($idea_id: ID!) {
    unlikeIdea(idea_id: $idea_id) {
      ...ToggleLikeBody
    }
  }
`;

export const SaveIdea = gql`
  mutation SaveIdea($idea_id: ID!) {
    saveIdea(idea_id: $idea_id) {
      ...ToggleSaveBody
    }
  }
`;

export const UnsaveIdea = gql`
  mutation UnsaveIdea($idea_id: ID!) {
    unsaveIdea(idea_id: $idea_id) {
      ...ToggleSaveBody
    }
  }
`;

export const CreateFeature = gql`
  mutation CreateFeature($input: CreateFeatureWithoutIdeaInput!) {
    createFeature(input: $input) {
      ...FeatureBody
    }
  }
`;
