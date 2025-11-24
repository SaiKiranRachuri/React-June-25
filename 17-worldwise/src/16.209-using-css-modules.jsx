// 1) Inline styles
// 2) Global styles
// 3) CSS module styles
// 4) Libraries like MUI

// Include a CSS module for PageNav and define styles
// Including classes with same names in different components using CSS modules styles then it distinguishes the classes by a unique ID.

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Product from "./pages/Product";
import PageNotFound from "./pages/PageNotFound";
import Pricing from "./pages/Pricing";
import HomePage from "./pages/HomePage";

function App() {
  // const x = 23;
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
