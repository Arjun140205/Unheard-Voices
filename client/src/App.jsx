import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LazyMotion, domAnimation } from "framer-motion";
import { HelmetProvider } from "react-helmet-async";

import Home from "./pages/Home";
import Write from "./pages/Write";
import Explore from "./pages/Explore";
import BlogDetails from "./pages/BlogDetails";
import About from "./pages/About";
import HelpCenter from "./pages/HelpCenter";
import WritingTips from "./pages/WritingTips";
import CommunityGuidelines from "./pages/CommunityGuidelines";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import CookiePolicy from "./pages/CookiePolicy";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {
  return (
    <HelmetProvider>
      <LazyMotion features={domAnimation}>
        <Router>
          <div className="min-h-screen bg-[#FFFFFF] flex flex-col">
            <Navbar />
            <div className="flex-grow pt-16">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/write" element={<Write />} />
                <Route path="/explore" element={<Explore />} />
                <Route path="/explore/:slug" element={<BlogDetails />} />
                <Route path="/about" element={<About />} />
                <Route path="/help" element={<HelpCenter />} />
                <Route path="/tips" element={<WritingTips />} />
                <Route path="/guidelines" element={<CommunityGuidelines />} />
                <Route path="/privacy" element={<PrivacyPolicy />} />
                <Route path="/terms" element={<TermsOfService />} />
                <Route path="/cookies" element={<CookiePolicy />} />
                <Route path ="/BlogDetails" element={<BlogDetails />} />
              </Routes>
            </div>
            <Footer />
          </div>
        </Router>
      </LazyMotion>
    </HelmetProvider>
  );
}

export default App;
