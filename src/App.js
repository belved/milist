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
    <Router>
      <Routes>
        <Route exact path="/milist" element={<AddSongScreen/>} />
        <Route exact path="milist/addArtist" element={<AddArtistScreen/>} />
        <Route exact path="milist/playlist" element={<PlaylistScreen/>} />
      </Routes>
    </Router>
  );
}

export default App;
