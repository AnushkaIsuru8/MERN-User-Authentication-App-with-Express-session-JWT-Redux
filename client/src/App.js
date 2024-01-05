import EnterUsername from "./Pages/EnterUsername";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Welcome from "./Pages/Welcome";

import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "./store";
axios.defaults.withCredentials  = true
function App() {
  const dispatch = useDispatch()
  const isLoggedIn = useSelector(state => state.isLoggedIn)

  const sendLogoutReq = async () => {
    const res = await axios.post("http://localhost:5000/logout", {},)

    if (res.status = 202) {
      return res
    }
    return new Error("Unable to logout")
  }

  const handleLogout = () => {
    sendLogoutReq().then(() => {
      dispatch(authActions.logout())
    })
  }
  return (
    <div className="App">
      <BrowserRouter>
        <ul>
          {
            isLoggedIn ?
              <li>
                <button onClick={handleLogout}>Logout</button>
              </li>
              : <></>
          }

          <li>
            <Link to="/">Home</Link>
          </li>

        </ul>
        <Routes>
          <Route path="/" element={<EnterUsername />} />
          <Route path="/login" element={<Login />} />
          <Route path="/Register" element={<Register />} />
          {isLoggedIn &&
            <Route path="/Welcome" element={<Welcome />} />}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
