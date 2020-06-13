import { gql } from 'apollo-boost';

export default gql`
  query GetIdeaById($id: ID!) {
    idea(id: $id) {
      id
      title
      body
    }
  }
`;
