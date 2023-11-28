import { useState } from 'react'
import TextInput from './textInput';
function SongInput() {
  return (
    <div>
      <TextInput placeholderText="Artist name"/>
      <TextInput placeholderText="Song name"/>
    </div>
  );
}

  export default SongInput