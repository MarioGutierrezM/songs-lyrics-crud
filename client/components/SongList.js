import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { Link } from 'react-router';
import fetchSongsQuery from '../queries/fetchSongs';

class SongList extends Component {
  onSongDelete(id) {
    this.props.mutate({ variables: { id } })
      .then(() => this.props.data.refetch());
      // refetch funtion is goning to refetch all the queries related with the component, in this case 'fetchSongsQuery'
  }

  renderSongs() {
    return this.props.data.songs.map(({ id, title }) => {
      return (
        <li key={id} className="collection-item">
          <Link to={`/songs/${id}`}>
            {title}
          </Link>
          <i
            className="material-icons"
            onClick={() => this.onSongDelete(id)}
          >
            delete
          </i>
        </li>
      );
    });
  }

  render() {
    console.log('SongList', this.props);
    if (this.props.data.loading) {
      return <div>Loading...</div>;
    }

    return (
      <div>
        <ul className="collection">
          {this.renderSongs()}
        </ul>
      
         <Link
           to="/songs/new"
           className="btn-floating btn-large red right"
         >
           <i className="material-icons">add</i>
         </Link>
      </div>
    );
  }
}

const mutation = gql`
  mutation DeleteSong($id: ID) {
    deleteSong(id: $id) {
      id
    }
  }
`;


// Bond the query + component using react-apollo
// Use nested 'graphql method in order to include the mutation and the query
const Connection = graphql(mutation)(
  graphql(fetchSongsQuery)(SongList)
);

export default Connection;