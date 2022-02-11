import gql from 'graphql-tag';

// create the query using 'graphql-tag'
const fetchSongsQuery = gql`
  {
    songs {
      title
      id
    }
  }
`;

export default fetchSongsQuery;
