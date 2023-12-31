import React from 'react';
import InstrumentImage from './instrumentImage';
import deleteIcon from '../icons/delete.png';
import update from '../icons/update.png';

const divContainer = {
  display: 'flex',
  alignItems: 'center'
}

const buttonStyle = {
  height: '40px',
  width: '40px',
  margin: '0px 20px 0px 20px'
}

const divStyle = {
  position: 'relative',
  margin: '10px 10px 0px 20px',
  padding: '0px 50px 0px 10px',
  width: '550px',
  border: '1px solid black',
  borderRadius: '10px'
}

const divStyleSelected = {
  position: 'relative',
  margin: '10px 10px 0px 20px',
  padding: '0px 50px 0px 10px',
  width: '550px',
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

class AddedSong extends React.Component {

  handleDelete(i) {
    const confirmation = window.confirm('Are you sure you want to delete this song ?');

    if(confirmation) {
      this.props.handleDelete(i)
    }
  }

  handleUpdate(i) {
    this.props.handleUpdate(i)
  }

    render() {
      return (
        <div style = {divContainer}>
          {this.props.selectedId===this.props.song.id? 
            <div style={divStyleSelected}>
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
          <img src={deleteIcon} style={buttonStyle} onClick={() => this.handleDelete(this.props.song.id)}/>
          <img src={update} style={buttonStyle} onClick={() => this.handleUpdate(this.props.song.id)}/>
        </div>
      );
    }
  }

  export default AddedSong