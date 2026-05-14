import { Toaster } from "sonner";
import HomePage from "./pages/HomePage";
import NotFound from "./pages/NotFound";
import { BrowserRouter, Routes, Route } from "react-router";

function App() {
  return (
    <>
      <Toaster />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
