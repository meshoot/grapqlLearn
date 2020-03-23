import { gql } from 'apollo-boost';

export const deleteDirectorrMutation = gql`
    mutation deleteDirector($id: ID!) {
        deleteDirector(id: $id) {
            id
        }
    }
`;