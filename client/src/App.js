import EnterUsername from "./Pages/EnterUsername";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Welcome from "./Pages/Welcome";

import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { useState } from "react";

function App() {
  const [user, setUser] = useState(false)
  return (
    <div className="App">
      <BrowserRouter>
        <ul>
          {
            user ?
              <li>
                <Link to="/admin">Admin</Link>
              </li>
              : <></>
          }

          <li>
            <Link to="/">Homw</Link>
          </li>

        </ul>
        <Routes>
          <Route path="/" element={<EnterUsername />} />
          <Route path="/login" element={<Login />} {...user}/>
          <Route path="/Register" element={<Register />} />
          <Route path="/Welcome" element={<Welcome />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
