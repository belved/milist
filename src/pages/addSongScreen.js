import * as React from 'react'

import ButtonList from '../component/buttonList.js';
import TextInput from "../component/textInput.js";
import Error from "../object/error.js";
import toUpperCase from '../utils/strings.js';

import { findAll, addSong } from '../services/firestoreHelper.js';
import SearchableDropdown from '../component/searchableDropdown.js';

class AddSongScreen extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            tuning: {},
            instrument: {},
            style: {},
            artist: [{id: 0, name: "No data loaded"}],
            selectedArtist: {id: 0, name: ""},
            songName: "",
            songCount: "",
            songList: {},
            blockEvent: false
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
        } else if (this.state.selectedArtist.id === 0) {
            return new Error("Aucun artiste sélectionné")
        } else if(this.state.tuning.find((elem) => elem.state === true) === undefined) {
            return new Error("Aucun accordage sélectionné")
        } else if(this.state.tuning.filter((elem) => elem.state === true).length > 1){
            return new Error("Plusieurs accordage sélectionné")
        }else if(this.state.instrument.find((elem) => elem.state === true) === undefined) {
            return new Error("Aucun instrument sélectionné")
        } else if(this.state.style.find((elem) => elem.state === true) === undefined) {
            return new Error("Aucun style sélectionné")
        } else if(this.state.songList.find((elem) => elem.title === this.state.songName && elem.artist === this.state.selectedArtist.id) !== undefined){
            return new Error("Le morceau a déjà été ajouté")
        } else {
            console.log(this.state.songList)
            console.log(this.state.selectedArtist.id)
            return true
        }
    }

    constructSongObject() {
        var song = {
            title: toUpperCase(this.state.songName),
            artist: this.state.selectedArtist.id,
            tuning: this.state.tuning.find((elem) => elem.state === true).id,
            instrument: this.getInstrument(),
            style: this.getStyle()
        }

        return song;
    }

    resetData() {
        this.state.tuning.forEach((elem) => elem.state = false)
        this.state.instrument.forEach((elem) => elem.state = false)
        this.state.style.forEach((elem) => elem.state = false)

        this.setState({
            selectedArtist: {id: 0, name: ""},
            songName: ""
        })
    }

    addSong() {
        const dataValidity = this.checkData()
        if(dataValidity === true) {
            this.constructSongObject()

            const putSong = async () => {
                await addSong(this.state.songCount.toString(), this.constructSongObject())
                this.resetData()
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

    keyPressed(event){
        if (event.key === 'Enter' && this.state.blockEvent === false) {
            this.setState({blockEvent: true})
            this.addSong()
        } else {
            this.setState({blockEvent: false})
        }
      }

    componentDidMount() {
        document.addEventListener("keydown", this.keyPressed.bind(this), false);

        const fetchData = async () => {
            const tuningRes = await findAll("tuning")
            const instrumentRes = await findAll("instruments")
            const styleRes = await findAll("style")
            const artistRes = await findAll("artists")
            const songListRes = await findAll("songs")

            tuningRes.forEach((elem) => elem.state = false)
            instrumentRes.forEach((elem) => elem.state = false)
            styleRes.forEach((elem) => elem.state = false)

            this.setState({
                tuning: tuningRes,
                instrument: instrumentRes,
                style: styleRes,
                artist: artistRes,
                songList: songListRes,
                songCount: songListRes.length + 1
            })
        }

        fetchData()
     }

     handleArtistMenuClick(val) {
        if(val === null) {
            this.setState({selectedArtist: {id: 0, name: val}})
        } else {
            this.setState({selectedArtist: val})
        }
     }
    
    render(){
        return (
      <div>
            <ButtonList buttonListObject={this.state.tuning} onClick={this.handleTuningClick.bind(this)}/>
            <ButtonList buttonListObject={this.state.instrument} onClick={this.handleClick.bind(this)}/>
            <ButtonList buttonListObject={this.state.style} onClick={this.handleClick.bind(this)}/>
            <SearchableDropdown
                options={this.state.artist}
                label="name"
                id="id"
                selectedVal={this.state.selectedArtist.name}
                handleChange={(val => this.handleArtistMenuClick(val))}
            />
            <TextInput placeholderText="Song title" value={this.state.songName} onChange={this.onSongChange.bind(this)}/>
            <div onClick={() => this.addSong()}>Valider</div>
      </div>
    );
  }
}

  export default AddSongScreen