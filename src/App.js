import './App.css';

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import AddSongScreen from './pages/addSongScreen';
import AddArtistScreen from './pages/addArtistScreen';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/milist" element={<AddSongScreen/>} />
        <Route path="/addArtist" element={<AddArtistScreen/>} />
      </Routes>
    </Router>
  );
}

export default App;
