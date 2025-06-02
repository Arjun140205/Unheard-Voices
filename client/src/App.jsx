import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Write from "./pages/Write";
import Explore from "./pages/Explore";
import Navbar from "./components/Navbar";
import About from "./pages/About";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[#FFFFFF]">
        <Navbar />
        <div className="pt-16"> {/* Add padding-top to account for fixed navbar */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/write" element={<Write />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
