import React from 'react'

import { findAll, updateSong } from '../services/firestoreHelper.js';

import ButtonList from '../component/buttonList.js';
import PlaylistSong from '../component/playlistSong.js';
import DatePicker from "react-datepicker";

import Close from '../icons/close.png'
import Random from '../icons/random.png'
import List from '../icons/list.png'

import "react-datepicker/dist/react-datepicker.css";

const lineSeparatorStyle = {
    margin:'40px 20px 10px 20px',
    border: 'none',
    backgroundColor: 'black',
    height: '3px',
    opacity: '1'
}

const imageCloseStyle = {
    height: '50px'
}

const randomButtonStyle = {
    position: 'absolute',
    display: 'inline-block',
    margin:'0px 20px 0px 0px',
    right: '0',
    height: '50px'
}

const numberOFSongStyle = {
    position: 'absolute',
    display: 'inline-block',
    margin:'20px 20px 0px 0px',
    right: '0'
}

const datePickerStyle = {
    margin: '0px 0px 0px 20px',
    width: '300px'
}

class PlaylistScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            tuning: {},
            instrument: {},
            style: {},
            artist: {},
            songCount: 0,
            songList: [],
            songListForDisplay: {},
            todayDate: 0,
            filteredList: {},
            startDate: null,
            isRandom: false
        }
    }

    compareObject(a, b) {
        return b.id - a.id;
      }

    componentDidMount() {
        const fetchData = async () => {
            const tuningRes = await findAll("tuning")
            const instrumentRes = await findAll("instruments")
            const styleRes = await findAll("style")
            const artistRes = await findAll("artists")
            const songListRes = await findAll("songs")

            const currentDate = new Date();
            currentDate.setHours(0,0,0,0);
            this.setState({todayDate: currentDate.getTime()})

            var list = []
            songListRes.forEach(element => {
                var song = {}
                var instrument = instrumentRes.filter(instrument => element.instrument.some(selectInstrument => instrument.id === selectInstrument))
                var instrumentList = []
                instrument.map(elem => instrumentList.push(elem))

                song.id = element.id
                song.title = element.title
                song.artist = artistRes.find((artist) => artist.id === element.artist)
                song.instrument = instrumentList
                song.style = styleRes.find((style) => style.id === element.style).name;
                song.tuning = tuningRes.find((tuning) => tuning.id === element.tuning).name
                song.lastPlayed = element.lastPlayed
                list.push(song)
            });

            list.sort(this.compareObject);

            this.setState({
                tuning: tuningRes,
                instrument: instrumentRes,
                style: styleRes,
                artist: artistRes,
                songCount: parseInt(list[0].id) + 1,
                songList: songListRes,
                songListForDisplay: list,
                filteredList: list
            })
        }

        fetchData()
     }

     handleClickMultiple(i, collection) {
        const elem = collection
        elem[i].state = !elem[i].state
        this.setState({collection: elem})
        this.refreshSongList()
    }

    refreshSongList() {
        var listTemp = Array.from(this.state.songListForDisplay)

        listTemp = this.state.songListForDisplay.filter(song => {
            const tunningMatch = !this.state.tuning.some(tuning => tuning.state) || this.state.tuning.some(tuning => tuning.state && song.tuning === tuning.name)
            const styleMatch = !this.state.style.some(style => style.state) || this.state.style.some(style => style.state && song.style === style.name)
            const instrumentMatch = !this.state.instrument.some(instrument => instrument.state) || song.instrument.some(songInstrument => this.state.instrument.some(instrument => instrument.state && instrument.id === songInstrument.id));
            const dateMatch = this.state.startDate === null || song.lastPlayed <= this.state.startDate

            return tunningMatch && styleMatch && instrumentMatch && dateMatch;
        })

        if(this.state.isRandom) {
            listTemp = this.randomizeSongList(listTemp)
        } else {
            listTemp.sort(this.compareObject);
        }

        this.setState({filteredList: listTemp})
    }

     handlePlayed(id) {
        const currentDate = new Date();

        const update = async () => {
            const displayListTemp = this.state.songListForDisplay
            const listTemp = this.state.songList

            var displaySongPos = this.state.songListForDisplay.findIndex(song => song.id === id)
            var songPos = this.state.songList.findIndex(song => song.id === id)

            var song = this.state.songList.find(song => song.id === id)
            var displaySong = this.state.songListForDisplay.find(song => song.id === id)

            song.lastPlayed = currentDate.getTime()
            displaySong.lastPlayed = currentDate.getTime()

            await updateSong(id, song)

            displayListTemp[displaySongPos] = displaySong
            listTemp[songPos] = song

            this.setState({
                songListForDisplay: displayListTemp,
                songList: listTemp
            })
        }

        update()
     }

     setStartDate(date) {
        const setDate = async() => {
            if(date !== null) {
                date.setHours(23,59,59,0);
                await this.setState({startDate: date.getTime()})
            } else {
                await this.setState({startDate: undefined})
            }
            this.refreshSongList()
        }
        setDate()
     }

     setRandomizeState() {
        const setRandom = async() => {
            await this.setState({isRandom: !this.state.isRandom})
            this.refreshSongList()
        }
        setRandom()
     }

    randomizeSongList(list) {
        const listTemp = list
        for (let i = listTemp.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [listTemp[i], listTemp[j]] = [listTemp[j], listTemp[i]];
        }
    
        return listTemp
    }

    render(){
        return (
      <div>
        <ButtonList buttonListObject={this.state.tuning} onClick={this.handleClickMultiple.bind(this)}/>
        <ButtonList buttonListObject={this.state.instrument} onClick={this.handleClickMultiple.bind(this)}/>
        <ButtonList buttonListObject={this.state.style} onClick={this.handleClickMultiple.bind(this)}/>
        <div style={datePickerStyle}>
            <DatePicker selected={this.state.startDate} onChange={(date) => this.setStartDate(date)} />
            <img style={imageCloseStyle} src={Close} onClick={() => this.setStartDate(null)}/>
        </div>
        {this.state.isRandom?
        <img style={randomButtonStyle} src={List} onClick={() => this.setRandomizeState()}/>
        :
        <img style={randomButtonStyle} src={Random} onClick={() => this.setRandomizeState()}/>}
        <br/>
        <div style={numberOFSongStyle}>Selected song : {this.state.filteredList.length}</div>
        <hr style={lineSeparatorStyle}/>

        {this.state.filteredList.length > 0 && this.state.filteredList.map((song, i) => {
            return (<PlaylistSong song={song} todayDate={this.state.todayDate} handlePlayed={this.handlePlayed.bind(this)}/>)
        })}
      </div>
    );
  }
}

export default PlaylistScreen;