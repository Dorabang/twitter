import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Auth from "routes/Auth";
import Home from "routes/Home";

function AppRouter({ isLoggedIn }) {
  return (
    <Router>
      <Routes>
        {isLoggedIn ? (
          <>
            <Route path={`${process.env.PUBLIC_URL}/`} element={<Home />} />
          </>
        ) : (
          <Route path="/" element={<Auth />} />
        )}
      </Routes>
    </Router>
  );
}

export default AppRouter;
