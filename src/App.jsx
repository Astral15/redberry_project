import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashboardPage from "../src/pages/DashboardPage";
import DashboardGuestPage from "../src/pages/DashboardGuestPage";


export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DashboardGuestPage />} />
      </Routes>
    </BrowserRouter>
  );
}