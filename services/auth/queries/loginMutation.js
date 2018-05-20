import gql from 'graphql-tag';

const LoginMutation = gql`
  mutation login($email: String!, $password: String!) {
    login(input: {clientMutationId: "jf-company-mobile", email: $email, password: $password}) {
      user {
        id,
        email,
        companies {
          id,
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
