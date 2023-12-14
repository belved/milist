import React from 'react'
import TextInput from './textInput';

class SongInput extends React.Component {

  onChange(id, value){
    this.props.onChange(value)
  }

  render(){
    return (
      <div>
        
      </div>
    );
  }
}

  export default SongInput