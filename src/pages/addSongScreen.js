import React from 'react'

import ButtonList from '../component/buttonList.js';
import TextInput from "../component/textInput.js";
import Error from "../object/error.js";

import { findAll, addSong } from '../services/firestoreHelper.js';
import DropdownMenu from '../component/dropdownMenu.js';

class AddSongScreen extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            tuning: {},
            instrument: {},
            style: {},
            artist: {},
            artistId: "",
            songName: ""
        }
    }

    getInstrument() {
        var instrument = []
        this.state.instrument.forEach((elem) => {
            if(elem.state){
                instrument.push(elem.id)
            }
        })

        return instrument;
    }

    getStyle() {
        var styles = []
        this.state.style.forEach((elem) => {
            if(elem.state){
                styles.push(elem.id)
            }
        })

        return styles;
    }

    checkData() {
        if(this.state.songName === ""){
            return new Error("Le titre est vide")
        } else if (this.state.artistId === "") {
            return new Error("Aucun artiste sélectionné")
        } else if(this.state.tuning.find((elem) => elem.state === true) === undefined) {
            return new Error("Aucun accordage sélectionné")
        } else if(this.state.tuning.filter((elem) => elem.state === true).length > 1){
            return new Error("Plusieurs accordage sélectionné")
        }else if(this.state.instrument.find((elem) => elem.state === true) === undefined) {
            return new Error("Aucun instrument sélectionné")
        } else if(this.state.style.find((elem) => elem.state === true) === undefined) {
            return new Error("Aucun style sélectionné")
        } else {
            return true
        }
    }

    constructSongObject() {
        var song = {
            title: this.state.songName,
            artist: this.state.artistId,
            tuning: this.state.tuning.find((elem) => elem.state === true).id,
            instrument: this.getInstrument(),
            style: this.getStyle()
        }

        return song;
    }

    addSong() {
        const dataValidity = this.checkData()
        if(dataValidity === true) {
            this.constructSongObject()

            const putSong = async () => {
                await addSong("01", this.constructSongObject())
            }

            putSong()
        } else {
            alert(dataValidity.getMessage())
        }
    }

    handleClick(i, collection) {
        const elem = collection
        elem[i].state = !elem[i].state
        this.setState({collection: elem})
    }

    handleTuningClick(i, collection) {
        const elem = collection
        elem.forEach((elem) => elem.state = false)
        elem[i].state = true
        this.setState({collection: elem})
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
            const artistRes = await findAll("artists")

            tuningRes.forEach((elem) => elem.state = false)
            instrumentRes.forEach((elem) => elem.state = false)
            styleRes.forEach((elem) => elem.state = false)

            this.setState({
                tuning: tuningRes,
                instrument: instrumentRes,
                style: styleRes,
                artist: artistRes
            })
        }

        fetchData()
     }

     handleArtistMenuClick(i) {
        this.setState({artistId: i})
     }
    
    render(){
        return (
      <div>
            <ButtonList buttonListObject={this.state.tuning} onClick={this.handleTuningClick.bind(this)}/>
            <ButtonList buttonListObject={this.state.instrument} onClick={this.handleClick.bind(this)}/>
            <ButtonList buttonListObject={this.state.style} onClick={this.handleClick.bind(this)}/>
            <DropdownMenu menuName="Artist name" menuList={this.state.artist} callback={this.handleArtistMenuClick.bind(this)}/>
            <TextInput placeholderText="Song title" onChange={this.onSongChange.bind(this)}/>
            <div onClick={() => this.addSong()}>Valider</div>
      </div>
    );
  }
}

  export default AddSongScreen