import React from "react";
import { Helmet } from "react-helmet-async";
import BackgroundImage from "../components/BackgroundImage";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-grow">
        <BackgroundImage imageUrl="https://images.unsplash.com/photo-1483921020237-2ff51e8e4b22?auto=format&fit=crop&q=80">
          <div className="py-16 px-4">
            <Helmet>
              <title>Privacy Policy | Unheard Voices</title>
              <meta
                name="description"
                content="Our commitment to your privacy and anonymity"
              />
            </Helmet>

            <div className="max-w-3xl mx-auto space-y-8">
              <div className="text-center mb-16">
                <h1 className="text-5xl font-serif text-gray-800 mb-4">
                  Privacy Policy
                </h1>
                <p className="text-gray-600 italic text-lg">
                  "Your anonymity is our priority"
                </p>
              </div>

              <div className="bg-white/40 backdrop-blur-sm p-8 rounded-2xl border border-white/50 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
                <h2 className="text-2xl text-gray-700 mb-6 font-serif">
                  Our Privacy Commitment
                </h2>
                <div className="space-y-4 text-gray-600">
                  <p className="leading-relaxed">
                    At Unheard Voices, we believe in the power of anonymous
                    expression. Our platform is built with privacy at its core,
                    ensuring your thoughts remain yours alone.
                  </p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white/40 backdrop-blur-sm p-8 rounded-2xl border border-white/50 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
                  <h2 className="text-2xl text-gray-700 mb-6 font-serif">
                    Information We Don't Collect
                  </h2>
                  <div className="space-y-3 text-gray-600">
                    <ul className="space-y-3">
                      <li className="flex items-center space-x-3">
                        <span className="w-1.5 h-1.5 bg-gray-400 rounded-full"></span>
                        <span>Personal identification information</span>
                      </li>
                      <li className="flex items-center space-x-3">
                        <span className="w-1.5 h-1.5 bg-gray-400 rounded-full"></span>
                        <span>Location data</span>
                      </li>
                      <li className="flex items-center space-x-3">
                        <span className="w-1.5 h-1.5 bg-gray-400 rounded-full"></span>
                        <span>Social media connections</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="bg-white/40 backdrop-blur-sm p-8 rounded-2xl border border-white/50 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
                  <h2 className="text-2xl text-gray-700 mb-6 font-serif">
                    Limited Data Collection
                  </h2>
                  <div className="space-y-3 text-gray-600">
                    <p>We only store:</p>
                    <ul className="space-y-3">
                      <li className="flex items-center space-x-3">
                        <span className="w-1.5 h-1.5 bg-gray-400 rounded-full"></span>
                        <span>Your anonymous written content</span>
                      </li>
                      <li className="flex items-center space-x-3">
                        <span className="w-1.5 h-1.5 bg-gray-400 rounded-full"></span>
                        <span>Anonymous reaction counts</span>
                      </li>
                      <li className="flex items-center space-x-3">
                        <span className="w-1.5 h-1.5 bg-gray-400 rounded-full"></span>
                        <span>Timestamps (for content organization)</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-white/40 backdrop-blur-sm p-8 rounded-2xl border border-white/50 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
                <h2 className="text-2xl text-gray-700 mb-6 font-serif">Contact</h2>
                <p className="text-gray-600 leading-relaxed">
                  For privacy concerns, use our anonymous feedback form. We respond
                  to all inquiries while maintaining your anonymity.
                </p>
              </div>
            </div>
          </div>
        </BackgroundImage>
      </div>
    </div>
  );
}
