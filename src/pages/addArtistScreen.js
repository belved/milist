import React from 'react'

import { findAll, addArtist } from '../services/firestoreHelper.js';

import toUpperCase from '../utils/strings.js'

class AddArtistScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            artist: {},
            artistName: ""
        }
    }

    componentDidMount() {
        const fetchData = async () => {
            const artistRes = await findAll("artists")

            this.setState({ artist: artistRes })
        }

        fetchData()
     }

     onNameChange(name) {
        this.setState({
            artistName: name
        })
    }

     addArtist() {
        const id = this.state.artist.length+1;
        const artist = {name: toUpperCase(this.state.artistName)}

        this.state.artist.push(artist)

        this.setState({
            artist: this.state.artist,
            artistName: ""
        })

        const putArtist = async () => {
            await addArtist(id.toString(), artist)
        }

        putArtist()
     }

    render(){
        return (
      <div>
            <input 
                placeholder="Artist Name"
                value={this.state.artistName} 
                onChange={evt => this.setState({ artistName: evt.target.value}) }/>
            <div onClick={() => this.addArtist()}>Valider</div>
            {this.state.artist.length > 0 && this.state.artist.map((artist, i) => {
                return (<p>{artist.name}</p>) 
            })}
      </div>
    );
  }
}

export default AddArtistScreen;