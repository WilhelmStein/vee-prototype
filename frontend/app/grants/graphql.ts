import { gql } from "@apollo/client";

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
`
