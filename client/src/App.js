import SignIn from "./Pages/SignIn";
import SignIn2 from "./Pages/SignIn2";
import SignUp from "./Pages/SignUp";
import Admin from "./Pages/Admin";

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
          <Route path="/" element={<SignIn />} />
          <Route path="/SignIn2" element={<SignIn2 />} {...user}/>
          <Route path="Signup" element={<SignUp />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
