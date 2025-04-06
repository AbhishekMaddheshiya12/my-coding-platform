import "./App.css";
import React, { Suspense, useEffect, useState } from "react";
import { Route, Routes } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { userExist, userNotExist } from "./redux/reducers/auth.js";
const Home = React.lazy(() => import("./pages/Home"));
const ProblemTable = React.lazy(() => import("./components/ProblemTable"));
const Solution = React.lazy(() => import("./pages/Solution"));
const LandingPage = React.lazy(() => import("./pages/LandingPage"));
const Profiles = React.lazy(() => import("./pages/Profiles.jsx"))
const AboutUs = React.lazy(() => import("./pages/AboutUs.jsx"))
const Discuss = React.lazy(() => import("./pages/Discuss.jsx"))
import ProtectedComponent from "./components/auth/ProtectedComponent.jsx";
import problems from "./fakeData/problems.js";
import Loader from "./components/loader/Loader.jsx";
const HomePage = React.lazy(() => import("./pages/HomePage.jsx"));

function App() {
  const [authChecked,setAuthChecked] = useState(false);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  useEffect(() => {
    const getDetails = async () => {
      try {
        const config = {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        };
        const data = await axios.get("http://localhost:4000/user/me", config);
        console.log(data);
        dispatch(userExist(data.data.user));
      } catch (error) {
        console.log(error);
        dispatch(userNotExist())
      } finally{
        setAuthChecked(true);
      }
    };
    getDetails();
  }, [dispatch]);
  return (
    <Suspense fallback = {<Loader></Loader>}>
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
    </Suspense>
  );
}

export default App;
