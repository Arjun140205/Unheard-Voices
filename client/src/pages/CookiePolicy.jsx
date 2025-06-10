import React from "react";
import { Helmet } from "react-helmet-async";
import BackgroundImage from "../components/BackgroundImage";
import Footer from "../components/Footer";

export default function CookiePolicy() {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-grow">
        <BackgroundImage imageUrl="https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?auto=format&fit=crop&q=80">
          <div className="py-16 px-4">
            <Helmet>
              <title>Cookie Policy | Unheard Voices</title>
              <meta name="description" content="Our cookie usage policy" />
            </Helmet>

            <div className="max-w-3xl mx-auto space-y-8">
              <div className="text-center mb-16">
                <h1 className="text-5xl font-serif text-gray-800 mb-4">
                  Cookie Policy
                </h1>
                <p className="text-gray-600 italic text-lg">
                  "Transparency in technology"
                </p>
              </div>

              <div className="bg-white/40 backdrop-blur-sm p-8 rounded-2xl border border-white/50 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
                <h2 className="text-2xl text-gray-700 mb-6 font-serif">
                  Our Approach to Cookies
                </h2>
                <div className="space-y-4 text-gray-600">
                  <p className="leading-relaxed">
                    At Unheard Voices, we minimize cookie usage to protect your
                    privacy. We only use essential cookies required for the basic
                    functionality of our platform.
                  </p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white/40 backdrop-blur-sm p-8 rounded-2xl border border-white/50 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
                  <h2 className="text-2xl text-gray-700 mb-6 font-serif">
                    Essential Cookies
                  </h2>
                  <div className="space-y-3 text-gray-600">
                    <p>We use only these necessary cookies:</p>
                    <ul className="space-y-3">
                      <li className="flex items-center space-x-3">
                        <span className="w-1.5 h-1.5 bg-gray-400 rounded-full"></span>
                        <span>Session management</span>
                      </li>
                      <li className="flex items-center space-x-3">
                        <span className="w-1.5 h-1.5 bg-gray-400 rounded-full"></span>
                        <span>Basic site functionality</span>
                      </li>
                      <li className="flex items-center space-x-3">
                        <span className="w-1.5 h-1.5 bg-gray-400 rounded-full"></span>
                        <span>Security measures</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="bg-white/40 backdrop-blur-sm p-8 rounded-2xl border border-white/50 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
                  <h2 className="text-2xl text-gray-700 mb-6 font-serif">
                    What We Don't Use
                  </h2>
                  <div className="space-y-3 text-gray-600">
                    <p>We do not use cookies for:</p>
                    <ul className="space-y-3">
                      <li className="flex items-center space-x-3">
                        <span className="w-1.5 h-1.5 bg-gray-400 rounded-full"></span>
                        <span>Tracking or analytics</span>
                      </li>
                      <li className="flex items-center space-x-3">
                        <span className="w-1.5 h-1.5 bg-gray-400 rounded-full"></span>
                        <span>Advertising</span>
                      </li>
                      <li className="flex items-center space-x-3">
                        <span className="w-1.5 h-1.5 bg-gray-400 rounded-full"></span>
                        <span>Personal identification</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-white/40 backdrop-blur-sm p-8 rounded-2xl border border-white/50 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
                <h2 className="text-2xl text-gray-700 mb-6 font-serif">
                  Your Control
                </h2>
                <div className="space-y-4 text-gray-600">
                  <p className="leading-relaxed">
                    While our essential cookies are necessary for the platform to
                    function, you maintain control over your browser settings. You
                    can choose to clear cookies at any time through your browser
                    settings.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </BackgroundImage>
      </div>
      <Footer />
    </div>
  );
}
