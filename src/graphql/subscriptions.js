/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreatePerson = /* GraphQL */ `
  subscription OnCreatePerson($filter: ModelSubscriptionPersonFilterInput) {
    onCreatePerson(filter: $filter) {
      id
      firstName
      lastName
      email
      gender
      city
      zip
      profilePicture {
        bucket
        region
        key
        __typename
      }
      isBoxChecked
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdatePerson = /* GraphQL */ `
  subscription OnUpdatePerson($filter: ModelSubscriptionPersonFilterInput) {
    onUpdatePerson(filter: $filter) {
      id
      firstName
      lastName
      email
      gender
      city
      zip
      profilePicture {
        bucket
        region
        key
        __typename
      }
      isBoxChecked
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeletePerson = /* GraphQL */ `
  subscription OnDeletePerson($filter: ModelSubscriptionPersonFilterInput) {
    onDeletePerson(filter: $filter) {
      id
      firstName
      lastName
      email
      gender
      city
      zip
      profilePicture {
        bucket
        region
        key
        __typename
      }
      isBoxChecked
      createdAt
      updatedAt
      __typename
    }
  }
`;
