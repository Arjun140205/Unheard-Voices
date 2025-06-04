import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LazyMotion, domAnimation } from "framer-motion";
import Home from "./pages/Home";
import Write from "./pages/Write";
import Explore from "./pages/Explore";
import Navbar from "./components/Navbar";
import About from "./pages/About";
import Footer from "./components/Footer";
import HelpCenter from "./pages/HelpCenter";
import WritingTips from "./pages/WritingTips";
import CommunityGuidelines from "./pages/CommunityGuidelines";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import CookiePolicy from "./pages/CookiePolicy";

function App() {
  return (
    <LazyMotion features={domAnimation}>
      <Router>
        <div className="min-h-screen bg-[#FFFFFF] flex flex-col">
          <Navbar />
          <div className="flex-grow pt-16"> {/* Add padding-top to account for fixed navbar */}
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/write" element={<Write />} />
              <Route path="/explore" element={<Explore />} />
              <Route path="/about" element={<About />} />
              <Route path="/help" element={<HelpCenter />} />
              <Route path="/tips" element={<WritingTips />} />
              <Route path="/guidelines" element={<CommunityGuidelines />} />
              <Route path="/privacy" element={<PrivacyPolicy />} />
              <Route path="/terms" element={<TermsOfService />} />
              <Route path="/cookies" element={<CookiePolicy />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </Router>
    </LazyMotion>
  );
}

export default App;
