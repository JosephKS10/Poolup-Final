import './App.css';
import Signup from './components/Signup';
import Login from './components/Login';
import Homepage from './components/Homepage';
import Profile from './components/Profile';
import Group from './components/Group';
import {
  Routes,
  Route,
} from "react-router-dom";
function App() {
  return (
    <> 
    <Routes>
          <Route path="/" element={<Homepage/>}/>
          <Route path="/login" element={<Login/>} />
          <Route path="/signup" element={<Signup/>} />
          <Route path="/profile" element={<Profile/>} />
          <Route path="/groups" element={<Group/>} />
    </Routes>
   
    </>    
  );
}

export default App;
