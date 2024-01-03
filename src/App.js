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
        <Route path="/" element={<AddSongScreen/>} />
        <Route path="/addArtist" element={<AddArtistScreen/>} />
        <Route path="/playlist" element={<PlaylistScreen/>} />
      </Routes>
    </Router>
  );
}

export default App;
