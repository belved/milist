import * as React from 'react'

import ButtonList from '../component/buttonList.js';
import TextInput from "../component/textInput.js";
import Error from "../object/error.js";
import toUpperCase from '../utils/strings.js';

import { findAll, addSong, deleteSong } from '../services/firestoreHelper.js';
import SearchableDropdown from '../component/searchableDropdown.js';
import AddedSong from '../component/addedSong.js';

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
            songList: [],
            blockEvent: false,
            songListForDisplay: []
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

    getInstrumentObject() {
        var instrument = []
        this.state.instrument.forEach((elem) => {
            if(elem.state){
                instrument.push(elem)
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

    getStyleName() {
        var styles = []
        this.state.style.forEach((elem) => {
            if(elem.state){
                styles.push(elem.name)
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
        } else if(this.state.songList.find((elem) => elem.title === toUpperCase(this.state.songName) && elem.artist === this.state.selectedArtist.id) !== undefined){
            return new Error("Le morceau a déjà été ajouté")
        } else {
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

    constructDisplayedSongObject() {
        var song = {
            id: this.state.songCount,
            title: toUpperCase(this.state.songName),
            artist: this.state.selectedArtist.name,
            tuning: this.state.tuning.find((elem) => elem.state === true).name,
            instrument: this.getInstrumentObject(),
            style: this.getStyleName()
        }

        return song
    }

    resetData(isDelete, id) {
        var songListTemp = this.state.songList
        var displayedListTemp = this.state.songListForDisplay
        var soundCountTemp = this.state.songCount

        if(isDelete) {
            var posSongList = songListTemp.findIndex(elem => elem.id === id);
            var posDisplayedSongList = displayedListTemp.findIndex(elem => elem.id === id);

            songListTemp.splice(posSongList, 1)
            displayedListTemp.splice(posDisplayedSongList, 1)


            soundCountTemp = soundCountTemp - 1
        } else {
            var song = this.constructDisplayedSongObject()
            
            songListTemp.push(song)

            displayedListTemp.unshift(song)
            displayedListTemp.sort(this.compareObject);
            soundCountTemp = soundCountTemp + 1
        }
        this.setState({
            songName: "",
            songCount: soundCountTemp,
            songList: songListTemp,
            songListForDisplay: displayedListTemp
        })
    }

    addSong() {
        const dataValidity = this.checkData()
        if(dataValidity === true) {
            var song = this.constructSongObject()

            const putSong = async () => {
                await addSong(this.state.songCount.toString(), song)
                await findAll("songs")
                this.resetData(false)
            }

            putSong()
        } else {
            alert(dataValidity.getMessage())
        }
    }

    handleClickMultiple(i, collection) {
        const elem = collection
        elem[i].state = !elem[i].state
        this.setState({collection: elem})
    }

    handleClickSingle(i, collection) {
        const elem = collection
        elem.map((elem, pos) => {
            if(pos === i) {
                elem.state = !elem.state
            } else {
                elem.state = false;
            }
        })
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

    compareObject(a, b) {
        return b.id - a.id;
      }

    componentDidMount() {
        document.addEventListener("keyup", this.keyPressed.bind(this), false);

        const fetchData = async () => {
            const tuningRes = await findAll("tuning")
            const instrumentRes = await findAll("instruments")
            const styleRes = await findAll("style")
            const artistRes = await findAll("artists")
            const songListRes = await findAll("songs")

            tuningRes.forEach((elem) => elem.state = false)
            instrumentRes.forEach((elem) => elem.state = false)
            styleRes.forEach((elem) => elem.state = false)

            var list = []
            songListRes.forEach(element => {
                var song = {}
                var instrument = instrumentRes.filter(instrument => element.instrument.some(selectInstrument => instrument.id === selectInstrument))
                var instrumentList = []
                instrument.map(elem => instrumentList.push(elem))

                song.id = element.id
                song.title = element.title
                song.artist = artistRes.find((artist) => artist.id === element.artist).name
                song.instrument = instrumentList
                song.style = styleRes.find(style => element.style.some(selectStyle => style.id === selectStyle)).name;
                song.tuning = tuningRes.find((tuning) => tuning.id === element.tuning).name
                list.push(song)
            });

            list.sort(this.compareObject);

            this.setState({
                tuning: tuningRes,
                instrument: instrumentRes,
                style: styleRes,
                artist: artistRes,
                songList: songListRes,
                songCount: parseInt(list[0].id) + 1,
                songListForDisplay: list
            })
        }

        fetchData()
     }

     deleteSong(id) {
        const songDeletion = async () => {
            await deleteSong(id)
            this.resetData(true, id)
        }
        songDeletion()
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
            <ButtonList buttonListObject={this.state.tuning} onClick={this.handleClickSingle.bind(this)}/>
            <ButtonList buttonListObject={this.state.instrument} onClick={this.handleClickMultiple.bind(this)}/>
            <ButtonList buttonListObject={this.state.style} onClick={this.handleClickSingle.bind(this)}/>
            <SearchableDropdown
                options={this.state.artist}
                label="name"
                id="id"
                selectedVal={this.state.selectedArtist.name}
                handleChange={(val => this.handleArtistMenuClick(val))}
            />
            <TextInput placeholderText="Song title" value={this.state.songName} onChange={this.onSongChange.bind(this)}/>
            <div onClick={() => this.addSong()}>Valider</div>
            {this.state.songListForDisplay.length > 0 && this.state.songListForDisplay.map((song, i) => {
                return (<AddedSong song={song} handleDelete={this.deleteSong.bind(this)}/>) 
            })}
      </div>
    );
  }
}

  export default AddSongScreen