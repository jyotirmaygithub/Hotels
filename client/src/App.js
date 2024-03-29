import React from "react";
import { Slide, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/header";
import LoginPage from "./pages/Login";
import SignUp from "./pages/SignUp";
import NotFoundPage from "./pages/NotFound";
import { AuthFunction } from "./context/front-auth";
import { TokenStatusFunction } from "./context/tokenStatus";
import ProfilePage from "./pages/ProfilePage";
import { StatesFunction } from "./context/States";

function App() {
  return (
    <>
      <GoogleOAuthProvider clientId={process.env.REACT_APP_AUTH_CLIENT_ID}>
        <StatesFunction>
          <TokenStatusFunction>
            <AuthFunction>
              <Router>
                <Routes>
                  <Route exact path="/" element={<Header />} />
                  <Route exact path="/login" element={<LoginPage />} />
                  <Route exact path="/signup" element={<SignUp />} />
                  <Route
                    exact
                    path="/account/edit-profile"
                    element={<ProfilePage />}
                  />
                  <Route exact path="*" element={<NotFoundPage />} />
                </Routes>
              </Router>
              <ToastContainer autoClose={2000} transition={Slide} />
            </AuthFunction>
          </TokenStatusFunction>
        </StatesFunction>
      </GoogleOAuthProvider>
    </>
  );
}

export default App;
