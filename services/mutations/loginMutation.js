import gql from 'graphql-tag';

const LoginMutation = gql`
  mutation LoginMutation($email: String!, $password: String!) {
    login(input: {clientMutationId: "jf-company-mobile", email: $email, password: $password}) {
      user {
        id,
        email,
        companies {
          id,
          name,
          booth {
            id,
            location
          }
        }
      }
      token
    }
  }
`;

export default LoginMutation;
