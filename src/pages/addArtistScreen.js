import React from 'react'

import { findAll, addArtist } from '../services/firestoreHelper.js';

class AddArtistScreen extends React.Component {
    constructor(props) {
        super.props
        this.state = {
            artist: {}
        }
    }

    componentDidMount() {
        const fetchData = async () => {
            const artistRes = await findAll("artists")

            this.setState({ artist: artistRes })
        }

        fetchData()
     }

    render(){
        return (
      <div>
            {this.state.artist.length > 0 && this.state.artist.map((artist, i) => {
                {artist.name}
            })}
            <div onClick={() => this.addSong()}>Valider</div>
      </div>
    );
  }
}

export default AddArtistScreen;