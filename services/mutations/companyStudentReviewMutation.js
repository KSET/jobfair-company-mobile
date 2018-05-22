import gql from 'graphql-tag';

const CompanyStudentReviewMutation = gql`
  mutation CompanyStudentReviewMutation($resume: ID!, $social: Int!, $ambition: Int!, $notes: String!) {
    company_resume_review(
      input: {
        clientMutationId: "jf-company-mobile",
        resume_uid: $resume,
        social: $social,
        ambition: $ambition,
        notes: $notes,
        followup: false,
        skill: 0
      }
    ) {
      data {
        id
      }
    }
  }
`;

export default CompanyStudentReviewMutation;
