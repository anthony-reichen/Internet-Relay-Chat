import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './Pages/Home';
// import Register from './pages/Register';
// import Login from './pages/Login'
// import SpotifyRefresh from './services/spotify/Spotify_refreshToken';
// import Admin from './pages/Admin';
// import Profile from './pages/Profile';

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />}></Route>
          {/* <Route exact path="/register" element={<Register />}></Route>
          <Route exact path="/login" element={<Login />}></Route>
          <Route exact path="/admin" element={<Admin />}></Route>
          <Route exact path="/profile" element={<Profile />}></Route> */}
        </Routes>
      </Router>
    </>
  );
}

export default App;