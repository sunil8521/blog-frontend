import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./page/Login";
import Singup from "./page/Singup";
import Home from "./Home";
import { Toaster } from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import { setUser, unsetUser } from "./redux/reducer/auth";
import { server } from "./constants";
import { useEffect } from "react";
import axios from "axios";
import Protect from "./Protect";

function App() {
  const { user, loader } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get(`${server}/api/user`, { withCredentials: true })
      .then(({ data }) => {
        console.log(data)
        dispatch(setUser(data));
      })
      .catch((er) => {
        dispatch(unsetUser());
      });
  }, [dispatch]);

  return loader ? (
    <h1>Loading</h1>
  ) : (
    <>
      <BrowserRouter>
        <Routes>
          {/* <Route path="/" element={<Home/>}/> */}

          <Route element={<Protect user={user} />}>
            <Route path="/" element={<Home />} />
          </Route>

          <Route
            path="/login"
            element={
              <Protect user={!user} redirect="/">
                <Login />
              </Protect>
            }
          />
          <Route
            path="/signup"
            element={
              <Protect user={!user} redirect="/">
                <Singup />
              </Protect>
            }
          />
        </Routes>
        <Toaster position="top-right" />
      </BrowserRouter>
    </>
  );
}

export default App;
