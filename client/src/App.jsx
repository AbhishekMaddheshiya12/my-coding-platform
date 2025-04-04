import "./App.css";
import Home from "./pages/Home";
import ProblemTable from "./components/ProblemTable";
import Solution from "./pages/Solution";
import LandingPage from "./pages/LandingPage";
import { Route, Routes } from "react-router";
import problems from "./fakeData/problems.js";
import Profiles from "./pages/Profiles";
import AboutUs from "./pages/AboutUs.jsx";
import Discuss from "./pages/Discuss.jsx";
import ProtectedComponent from "./components/auth/ProtectedComponent.jsx";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useEffect, useState } from "react";
import { userExist } from "./redux/reducers/auth.js";
import HomePage from "./pages/HomePage.jsx";

function App() {
  const [authChecked,setAuthChecked] = useState(false);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  useEffect(() => {
    const getDetails = async () => {
      try {
        const config = {
          withCredentials: true,
          header: { "Content-Type": "application/json" },
        };
        const data = await axios.get("http://localhost:4000/user/me", config);
        console.log(data);
        dispatch(userExist(data.data.user));
      } catch (error) {
        console.log(error);
      } finally{
        setAuthChecked(true);
      }
    };
    getDetails();
  }, []);
  return (
    <Routes>
      <Route element={<ProtectedComponent user={user} authChecked={authChecked}></ProtectedComponent>}>
        <Route path="/home" element={<Home />} />
        <Route
          path="/problems/:problemId"
          problems={problems}
          element={<Solution />}
        />
        <Route path="/problems" element={<ProblemTable />} />
        <Route path="/profile" element={<Profiles></Profiles>}></Route>
        <Route path="/aboutUs" element={<AboutUs></AboutUs>}></Route>
        <Route path="/discuss" element={<Discuss></Discuss>}></Route>
      </Route>
      <Route
        path="/"
        element={
          <ProtectedComponent user={!user} authChecked={authChecked} redirect="/home">
            <HomePage />
          </ProtectedComponent>
        }
      />
      <Route
        path="/authentication"
        element={<ProtectedComponent user={!user} authChecked={authChecked}>
          <LandingPage />
        </ProtectedComponent>}
      ></Route>
    </Routes>
  );
}

export default App;
