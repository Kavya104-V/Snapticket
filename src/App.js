import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Register from "./Register";
import UserDetails from "./UserDetails";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebaseconfig";
import { useEffect, useState } from "react";
import ScanQr from "./components/ScanQr";
import { ThemeProvider } from './context/ThemeContext'; 
import HomePage from "./components/HomePage";




const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsub();
  }, []);

  return (
    <ThemeProvider>
      <Router>
        <Routes>
        <Route path="/" element={<HomePage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/scan" element={<ScanQr />} />
          <Route
            path="/register"
            element={user ? <Register /> : <Navigate to="/login" />}
          />
          <Route path="/users/:aadhar" element={<UserDetails />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};  

export default App;
