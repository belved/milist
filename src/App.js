import './App.css';

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import AddSongScreen from './pages/addSongScreen';
import AddArtistScreen from './pages/addArtistScreen';
import PlaylistScreen from './pages/playlistScreen';

function App() {
  return (
    <Router basename='/milist'>
      <Routes>
        <Route exact path="/" element={<AddSongScreen/>} />
        <Route exact path="/addArtist" element={<AddArtistScreen/>} />
        <Route exact path="/playlist" element={<PlaylistScreen/>} />
      </Routes>
    </Router>
  );
}

export default App;
