import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/Home";
import CategoriesPage from "./pages/Categories";
import CategoriesCreatePage from "./pages/Categories/create";
import CategoriesEditPage from "./pages/Categories/edit";
import Navbar from "./components/Navbar";
import TalentsPage from "./pages/Talents";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="" element={<HomePage />} />
        <Route path="categories" element={<CategoriesPage />} />
        <Route path="categories/create" element={<CategoriesCreatePage />} />
        <Route path="categories/edit/:id" element={<CategoriesEditPage />} />
        <Route path="talents" element={<TalentsPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

//tips kalau profile untuk pindah halaman menggunakan params

//tips kalau profile ada pagination atau tidak berpindah halaman maka menggunakan query yang tanda tanya
