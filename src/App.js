import React, { useContext, useEffect } from "react";
import { Home } from "./Home component/Home";
import "bootstrap/dist/css/bootstrap.min.css";
import Evaluation from "./components/Evaluation";
import { Route, Routes } from "react-router-dom";
import Sixcard from "./main component/Sixcard";
import Training from "./components/Training";
import { Navbar } from "./Layout/Navbar";
import GameSettings from "./Setting/GameSettings";
import "./App.css";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Contact from "./components/Contact";
import { GameContext } from "./Context/GameContext";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { ResetPassword } from "./components/Home/ResetPassword";

import NotFoundPage from "./Layout/NotFound";
import PricingComponent from "./Setting/PremiumPackage";

function App() {
  const {
    dispatch,
    setBinaryFilterCard,
    defaultbinary,
    setDefaultBinary,
    premium,
  } = useContext(GameContext);

  useEffect(() => {
    const storedCards = JSON.parse(localStorage.getItem("selectedCards"));

    const initialCards = storedCards || defaultbinary.slice(0, 6);
    // setDefaultBinary(initialCards);

    setBinaryFilterCard(initialCards);
    dispatch({ type: "cards", payload: initialCards });
  }, [dispatch, setDefaultBinary, setBinaryFilterCard]);

  const handleFullScreen = () => {
    const doc = window.document;
    const docEl = doc.documentElement;

    if (docEl.requestFullscreen) {
      docEl.requestFullscreen();
    } else if (docEl.mozRequestFullScreen) {
      // Firefox
      docEl.mozRequestFullScreen();
    } else if (docEl.webkitRequestFullscreen) {
      // Chrome, Safari, Opera
      docEl.webkitRequestFullscreen();
    } else if (docEl.msRequestFullscreen) {
      // IE/Edge
      docEl.msRequestFullscreen();
    }
  };
  return (
    <div>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home handleFullScreen={handleFullScreen} />
            </ProtectedRoute>
          }
        />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/evaluation"
          element={
            <ProtectedRoute>
              <Evaluation />
            </ProtectedRoute>
          }
        />
        <Route
          path="/sixcard"
          element={
            <ProtectedRoute>
              <Sixcard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/training"
          element={
            <ProtectedRoute>
              <Training />
            </ProtectedRoute>
          }
        />
        <Route
          path="/setting"
          element={
            <ProtectedRoute>
              <GameSettings />
            </ProtectedRoute>
          }
        />
        <Route
          path="/contact"
          element={
            <ProtectedRoute>
              <Contact />
            </ProtectedRoute>
          }
        />
        <Route path="/reset-password/:email" element={<ResetPassword />} />
        <Route path="*" element={<NotFoundPage />} />
        <Route path="/premium" element={<PricingComponent />} />
      </Routes>
    </div>
  );
}

export default App;
