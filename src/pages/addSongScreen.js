import React from "react";
import ButtonListSection from "../component/buttonListSection";
import SongInput from "../component/songInput";

function addSong() {
    console.log('Send');
}

class AddSongScreen extends React.Component {
    render() {
        return (
            <div>
                <ButtonListSection/>
                <SongInput/>
                <div onClick={() => addSong()}>Valider</div>
            </div>
        )
    }
}

export default AddSongScreen