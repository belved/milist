import logo from './logo.svg';
import './App.css';

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import AddSongScreen from './pages/addSongScreen';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/milist" element={<AddSongScreen/>} />
      </Routes>
    </Router>
  );
}

export default App;
