import { Routes, Route, Navigate } from "react-router-dom";
import ListPage from "./pages/ListPage";
import ItemPage from "./pages/ItemPage";
import StatsPage from "./pages/StatsPage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/list" replace />} />
      <Route path="/list" element={<ListPage />} />
      <Route path="/item/:id" element={<ItemPage />} />
      <Route path="/stats" element={<StatsPage />} />
    </Routes>
  );
}
