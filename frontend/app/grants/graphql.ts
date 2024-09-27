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

export const GET_ALL_GRANT_USER_INTERACTIONS_OF_USER = gql`
    query getAllGrantUserInteractionsOfUser($userId: ID!) {
        allGrantUserInteractionsOfUser(userId: $userId) {
            likedStatus
            status
            grant {
                name,
                applicationStartDate,
                applicationEndDate
                amountDollars,

                foundation {
                    name
                }
            }
        }
    }
`
