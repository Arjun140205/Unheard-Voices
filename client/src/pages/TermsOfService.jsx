import React from "react";
import { Helmet } from "react-helmet-async";
import BackgroundImage from "../components/BackgroundImage";
import Footer from "../components/Footer";

export default function TermsOfService() {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-grow">
        <BackgroundImage imageUrl="https://images.unsplash.com/photo-1444021465936-c6ca81d39b84?auto=format&fit=crop&q=80">
          <div className="py-16 px-4">
            <Helmet>
              <title>Terms of Service | Unheard Voices</title>
              <meta name="description" content="Terms of Service for using Unheard Voices" />
            </Helmet>

            <div className="max-w-3xl mx-auto space-y-8">
              <div className="text-center mb-16">
                <h1 className="text-5xl font-serif text-gray-800 mb-4">Terms of Service</h1>
                <p className="text-gray-600 italic text-lg">"Guidelines for our shared journey"</p>
              </div>

              <div className="bg-white/40 backdrop-blur-sm p-8 rounded-2xl border border-white/50 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
                <h2 className="text-2xl text-gray-700 mb-6 font-serif">Acceptance of Terms</h2>
                <div className="space-y-4 text-gray-600">
                  <p className="leading-relaxed">
                    By using Unheard Voices, you agree to these terms. Our platform exists to provide a safe space
                    for anonymous expression while maintaining respect for all users.
                  </p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white/40 backdrop-blur-sm p-8 rounded-2xl border border-white/50 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
                  <h2 className="text-2xl text-gray-700 mb-6 font-serif">Your Rights</h2>
                  <div className="space-y-3 text-gray-600">
                    <ul className="space-y-3">
                      <li className="flex items-center space-x-3">
                        <span className="w-1.5 h-1.5 bg-gray-400 rounded-full"></span>
                        <span>Share thoughts anonymously</span>
                      </li>
                      <li className="flex items-center space-x-3">
                        <span className="w-1.5 h-1.5 bg-gray-400 rounded-full"></span>
                        <span>Delete your content</span>
                      </li>
                      <li className="flex items-center space-x-3">
                        <span className="w-1.5 h-1.5 bg-gray-400 rounded-full"></span>
                        <span>Report inappropriate content</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="bg-white/40 backdrop-blur-sm p-8 rounded-2xl border border-white/50 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
                  <h2 className="text-2xl text-gray-700 mb-6 font-serif">Your Responsibilities</h2>
                  <div className="space-y-3 text-gray-600">
                    <ul className="space-y-3">
                      <li className="flex items-center space-x-3">
                        <span className="w-1.5 h-1.5 bg-gray-400 rounded-full"></span>
                        <span>Respect community guidelines</span>
                      </li>
                      <li className="flex items-center space-x-3">
                        <span className="w-1.5 h-1.5 bg-gray-400 rounded-full"></span>
                        <span>Maintain anonymity</span>
                      </li>
                      <li className="flex items-center space-x-3">
                        <span className="w-1.5 h-1.5 bg-gray-400 rounded-full"></span>
                        <span>Foster meaningful discussions</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-white/40 backdrop-blur-sm p-8 rounded-2xl border border-white/50 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
                <h2 className="text-2xl text-gray-700 mb-6 font-serif">Content Ownership</h2>
                <p className="text-gray-600 leading-relaxed">
                  While you retain rights to your content, you grant Unheard Voices permission to display and store it anonymously
                  on our platform. You can delete your content at any time.
                </p>
              </div>
            </div>
          </div>
        </BackgroundImage>
      </div>
      <Footer />
    </div>
  );
}
