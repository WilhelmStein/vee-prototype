import { gql } from '@apollo/client';

export const GET_MATCHING_GRANTS_OF_USER = gql`
  query getMatchingGrantsOfUser($userId: ID!) {
    matchingGrantsOfUser(userId: $userId) {
      id
      name
      applicationStartDate
      applicationEndDate
      location
      foundation {
        name
      }
      amountDollars
      areasOfFunding
    }
  }
`;

export const GET_ALL_GRANT_USER_INTERACTIONS_OF_USER = gql`
  query getAllGrantUserInteractionsOfUser($userId: ID!) {
    allGrantUserInteractionsOfUser(userId: $userId) {
      likedStatus
      status
      matchDate
      grant {
        name
        applicationStartDate
        applicationEndDate
        amountDollars

        foundation {
          name
        }
      }
    }
  }
`;

export const INTERACT_WITH_GRANT = gql`
  mutation InteractWithGrant(
    $grantId: ID!
    $userId: ID!
    $interactionType: GrantInteractionType!
    $feedbackText: String
  ) {
    interactWithGrant(
      grantId: $grantId
      userId: $userId
      interactionType: $interactionType
      feedbackText: $feedbackText
    ) {
      id
    }
  }
`;
