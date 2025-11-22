// 1) Link and NavLink
// 2) On using NavLink the page that is rendered will have an active class

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Product from "./pages/Product";
import PageNotFound from "./pages/PageNotFound";
import Pricing from "./pages/Pricing";
import HomePage from "./pages/HomePage";

function App() {
  const x = 23;
  return (
    <div>
      Hello Router!
      <BrowserRouter>
        <Routes>
          <Route path="product" element={<Product />} />
          <Route path="/" element={<HomePage />} />
          <Route path="pricing" element={<Pricing />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
