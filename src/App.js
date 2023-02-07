import * as React from "react";
import MainRoutes from "./routes/main-routes";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
    return (
        <Router>
          <Routes basename="/">
            <Route path="*" element={<MainRoutes />} />
          </Routes>
        </Router>
    );
}

export default App;
