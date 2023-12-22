import React from 'react';
import InstrumentImage from './instrumentImage';

const divStyle = {
  position: 'relative',
  margin: '10px 10px 0px 20px',
  padding: '0px 0px 0px 10px',
  width: '500px',
  border: '1px solid black',
  borderRadius: '10px',
}

const idStyle = {
  position: 'absolute',
  display: 'inline-block',
  margin:'0px 10px 0px 0px',
  right: '0'
}

class AddedSong extends React.Component {
  handleDelete(i) {
    this.props.handleDelete(i)
  }

    render() {
      return (
        <div>
          <div style={divStyle}>
            <div style={idStyle}>{this.props.song.id}</div>
            <b>{this.props.song.artist}</b> | {this.props.song.title}
            <br/>
            Tuning : {this.props.song.tuning} | {this.props.song.style} | {this.props.song.instrument.map(element => {
              return (<InstrumentImage id={element.id}/>)
            })}
            <br/>
          </div>
          <div onClick={() => this.handleDelete(this.props.song.id)}>Delete {this.props.song.id}</div>
        </div>
      );
    }
  }

  export default AddedSong