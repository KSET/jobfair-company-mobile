import gql from 'graphql-tag';

const LoginMutation = gql`
  mutation login($email: String!, $password: String!) {
    login(input: {clientMutationId: "jf-company-mobile", email: $email, password: $password}) {
      user {
        id,
        email,
        first_name,
        last_name,
        name,
        slack_mention
      }
      token
    }
  }
`;

export default LoginMutation;
