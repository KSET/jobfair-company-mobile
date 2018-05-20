import gql from 'graphql-tag';

const CompanyManagersQuery = gql`
  query CompanyManagersQuery($id: ID!) {
    company(id: $id) {
      id,
      managers {
        slack_mention
      }
    }
  }
`;

export default CompanyManagersQuery;
