import gql from 'graphql-tag';

// The '!' symbol at the paremeter type, means the property must be included

const fetchSongQuery = gql`
  query SongQuery($id: ID!) {
    song(id: $id) {
      id
      title
      lyrics {
        id
        content
        likes
      }
    }
  }
`;

export default fetchSongQuery;
