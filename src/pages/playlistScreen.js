import React from 'react'

import { findAll, updateSong } from '../services/firestoreHelper.js';

import ButtonList from '../component/buttonList.js';
import PlaylistSong from '../component/playlistSong.js';

const lineSeparatorStyle = {
    margin:'20px 20px 10px 20px',
    border: 'none',
    backgroundColor: 'black',
    height: '3px',
    opacity: '1'
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
            filteredList: {}
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

            return tunningMatch && styleMatch && instrumentMatch;
        })

        listTemp.sort(this.compareObject);

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

    render(){
        return (
      <div>
        <ButtonList buttonListObject={this.state.tuning} onClick={this.handleClickMultiple.bind(this)}/>
        <ButtonList buttonListObject={this.state.instrument} onClick={this.handleClickMultiple.bind(this)}/>
        <ButtonList buttonListObject={this.state.style} onClick={this.handleClickMultiple.bind(this)}/>
        Selected song : {this.state.filteredList.length}
        <hr style={lineSeparatorStyle}/>

        {this.state.filteredList.length > 0 && this.state.filteredList.map((song, i) => {
            return (<PlaylistSong song={song} todayDate={this.state.todayDate} handlePlayed={this.handlePlayed.bind(this)}/>)
        })}
      </div>
    );
  }
}

export default PlaylistScreen;