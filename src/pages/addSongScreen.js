import React from 'react'

import ButtonList from '../component/buttonList.js'
import TextInput from "../component/textInput.js";

import { findAll } from '../services/firestoreHelper.js'

class AddSongScreen extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            tuning: {},
            instrument: {},
            style: {},
            artistName: "",
            songName: ""
        }
    }

    addSong() {
        console.log("send...")
    }

    handleClick(i, collection) {
        const elem = collection
        elem[i].state = !elem[i].state
        this.setState({collection: elem})
    }

    onArtistChange(artist) {
        this.setState({
            artistName: artist
        })
    }

    onSongChange(song) {
        this.setState({
            songName: song
        })
    }

    componentDidMount() {
        const fetchData = async () => {
            const tuningRes = await findAll("tuning")
            const instrumentRes = await findAll("instruments")
            const styleRes = await findAll("style")

            tuningRes.forEach((elem) => elem.state = false)
            instrumentRes.forEach((elem) => elem.state = false)
            styleRes.forEach((elem) => elem.state = false)

            this.setState({
                tuning: tuningRes,
                instrument: instrumentRes,
                style: styleRes
            })
        }

        fetchData()
     }
    
    render(){
        return (
      <div>
          <ButtonList buttonListObject={this.state.tuning} onClick={this.handleClick.bind(this)}/>
          <ButtonList buttonListObject={this.state.instrument} onClick={this.handleClick.bind(this)}/>
          <ButtonList buttonListObject={this.state.style} onClick={this.handleClick.bind(this)}/>
          <TextInput placeholderText="Artist name" onChange={this.onArtistChange.bind(this)}/>
          <TextInput placeholderText="Song name" onChange={this.onSongChange.bind(this)}/>
          <div onClick={() => this.addSong()}>Valider</div>
      </div>
    );
  }
}

  export default AddSongScreen