import { Route, Routes } from "react-router-dom";
import PlayerStatsForm from "../component/PlayerStatsForm/PlayerStatsForm";
import "./App.css";
import ProtectedRoute from "../routes/ProtectedRoute";
import LoginPage from "../component/Login/LoginPage";
import { Container } from "@mui/material";

function App() {
  return (
    <Container maxWidth="sm">
      <Routes>
        {/* Public route: Login Page */}
        <Route path="/login" element={<LoginPage />} />

        {/* Protected route: Only accessible if API key exists */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <PlayerStatsForm />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Container>
  );
}

export default App;
