import React from 'react';
import InstrumentImage from './instrumentImage';
import play from '../icons/play.png';

const divContainer = {
  display: 'flex',
  alignItems: 'center'
}

const buttonStyle = {
  height: '50px',
  width: '50px',
  margin: '0px 0px 0px 20px'
}

const divStyle = {
  position: 'relative',
  margin: '10px 10px 0px 20px',
  padding: '0px 0px 0px 10px',
  width: '500px',
  border: '1px solid black',
  borderRadius: '10px'
}

const divStylePlayedToday = {
  position: 'relative',
  margin: '10px 10px 0px 20px',
  padding: '0px 0px 0px 10px',
  width: '500px',
  border: '1px solid black',
  borderRadius: '10px',
  backgroundColor: 'grey'
}

const idStyle = {
  position: 'absolute',
  display: 'inline-block',
  margin:'0px 10px 0px 0px',
  right: '0'
}

class PlaylistSong extends React.Component {
    constructor(props) {
        super(props)
    }

  handlePlayed(i) {
    this.props.handlePlayed(i)
  }

    render() {
      return (
        <div style = {divContainer}>
          {this.props.song.lastPlayed >= this.props.todayDate? 
            <div style={divStylePlayedToday}>
            <div style={idStyle}>{this.props.song.id}</div>
            <b>{this.props.song.artist.name}</b> | {this.props.song.title}
            <br/>
            Tuning : {this.props.song.tuning} | {this.props.song.style} | {this.props.song.instrument.map(element => {
              return (<InstrumentImage id={element.id}/>)
            })}
            <br/>
          </div> 
          : 
          <div style={divStyle}>
          <div style={idStyle}>{this.props.song.id}</div>
          <b>{this.props.song.artist.name}</b> | {this.props.song.title}
          <br/>
          Tuning : {this.props.song.tuning} | {this.props.song.style} | {this.props.song.instrument.map(element => {
            return (<InstrumentImage id={element.id}/>)
          })}
          <br/>
        </div>
        }
        <img src={play} style={buttonStyle} onClick={() => this.handlePlayed(this.props.song.id)}/>
        </div>
      );
    }
  }

  export default PlaylistSong