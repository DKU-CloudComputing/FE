import { React, useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import AuthUser from './service/AuthUser';
import Navi from './layout/Navi';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import NotFound from './pages/NotFound';
import EditProfile from './pages/EditProfile';
import DashBoard from './pages/DashBoard';
function App() {
  const [hasSession, setHasSession] = useState(false);
  useEffect(() => {
    const sessionId = AuthUser.getUserSessionId();
    if (sessionId) {
      setHasSession(true);
    }
  }, []);

  return (
    <BrowserRouter>
      {hasSession ? <Navi /> : null}
      <Routes>
        <Route
          path="/"
          element={hasSession ? <Home /> : <Navigate to="/signin" />}
        />
        <Route
          path="/signin"
          element={hasSession ? <Navigate to="/" /> : <SignIn />}
        />
        <Route
          path="/signup"
          element={hasSession ? <Navigate to="/" /> : <SignUp />}
        />
        <Route
          path="/dashboard"
          element={hasSession ? <DashBoard /> : <SignIn />}
        />
        <Route
          path="/profile"
          element={hasSession ? <EditProfile /> : <SignIn />}
        />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
