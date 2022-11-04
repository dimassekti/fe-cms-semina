import { BrowserRouter, Routes, Route } from "react-router-dom";
import AboutPage from "./pages/About";
import HomePage from "./pages/Home";

import Home from "./pages/Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="" element={<HomePage />} />
        <Route path="about" element={<AboutPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

//tips kalau profile untuk pindah halaman menggunakan params

//tips kalau profile ada pagination atau tidak berpindah halaman maka menggunakan query yang tanda tanya
