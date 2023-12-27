import React from 'react';

import electric_guitar from '../icons/electric_guitar.png';
import acoustic_guitar from '../icons/acoustic_guitar.png';
import bass_guitar from '../icons/bass_guitar.png';
import classical_guitar from '../icons/classical_guitar.png';
import drum from '../icons/drum.png';
import seven_string_guitar from '../icons/7_string_guitar.png';

const imageStyle = {
    width: '40px',
    height: '40px'
}

class InstrumentImage extends React.Component {

    render() {
        var uri = ""
        switch(this.props.id) {
            case "01":
                uri = electric_guitar
                break;
            case "02":
                uri = acoustic_guitar
                break;
            case "03":
                uri = classical_guitar
                break;
            case "04":
                uri = bass_guitar
                break;
            case "05":
                uri = drum
                break;
            case "06":
                uri = seven_string_guitar
                break
            default:
                uri = ""
                break;
        }
        return (<img style={imageStyle} src={uri}/>)
    }
  }

  export default InstrumentImage