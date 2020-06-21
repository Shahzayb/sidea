import { gql } from 'apollo-boost';

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
      title
      body
      tags
    }
  }
`;
