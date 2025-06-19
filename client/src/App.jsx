import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { LazyMotion, domAnimation } from "framer-motion";
import { HelmetProvider } from "react-helmet-async";
import { Suspense, lazy, useState, useEffect } from "react";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ErrorBoundary from "./components/ErrorBoundary";
import Loader from "./components/Loader";

// Lazy load all pages
const Home = lazy(() => import("./pages/Home"));
const Write = lazy(() => import("./pages/Write"));
const Explore = lazy(() => import("./pages/Explore"));
const BlogDetails = lazy(() => import("./pages/BlogDetails"));
const About = lazy(() => import("./pages/About"));
const HelpCenter = lazy(() => import("./pages/HelpCenter"));
const WritingTips = lazy(() => import("./pages/WritingTips"));
const CommunityGuidelines = lazy(() => import("./pages/CommunityGuidelines"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const TermsOfService = lazy(() => import("./pages/TermsOfService"));
const CookiePolicy = lazy(() => import("./pages/CookiePolicy"));
const AdminPortal = lazy(() => import("./pages/AdminPortal"));

// RouteChangeLoader component to handle route transitions
const RouteChangeLoader = () => {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    // Simulate minimum loading time for smoother transitions
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, [location]);

  if (!isLoading) return null;

  return <Loader fullScreen />;
};

function App() {
  return (
    <HelmetProvider>
      <LazyMotion features={domAnimation}>
        <Router>
          <div className="min-h-screen bg-[#FFFFFF] flex flex-col relative">
            <ErrorBoundary>
              <Navbar />
              <RouteChangeLoader />
              <main className="flex-1 pt-16">
                <ErrorBoundary>
                  <Suspense fallback={<Loader fullScreen />}>
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
                      <Route path="/admin-portal" element={<AdminPortal />} />
                    </Routes>
                  </Suspense>
                </ErrorBoundary>
              </main>
              <Footer />
            </ErrorBoundary>
          </div>
        </Router>
      </LazyMotion>
    </HelmetProvider>
  );
}

export default App;
