import { compose } from 'recompose';
import { graphql } from 'react-apollo';

import { deleteDirectorrMutation } from "./mutation";
import { directorsQuery } from "../DirectorsTable/queries";


const withGrapqhlDelete = graphql(deleteDirectorrMutation, {
    props: ({ mutate }) => ({
        deleteDirector: id => mutate({
            variables: id,
            refetchQueries: [{ query: directorsQuery }]
        })
    })
});

export default compose(withGrapqhlDelete);