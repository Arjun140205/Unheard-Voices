import React from "react";
import { Helmet } from "react-helmet-async";
import BackgroundImage from "../components/BackgroundImage";
import Footer from "../components/Footer";

const CommunityGuidelines = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-grow">
        <BackgroundImage imageUrl="https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&q=80">
          <div className="py-16 px-4">
            <Helmet>
              <title>Community Guidelines | Unheard Voices</title>
              <meta
                name="description"
                content="Guidelines for our anonymous writing community"
              />
            </Helmet>

            <div className="max-w-3xl mx-auto space-y-8">
              <div className="text-center mb-16">
                <h1 className="text-5xl font-serif text-gray-800 mb-4">
                  Our Shared Space
                </h1>
                <p className="text-gray-600 italic text-lg">
                  "In anonymity, we find unity through understanding"
                </p>
              </div>

              <div className="bg-white/40 backdrop-blur-sm p-8 rounded-2xl border border-white/50 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
                <h2 className="text-2xl text-gray-700 mb-6 font-serif">
                  Core Values
                </h2>
                <div className="space-y-4 text-gray-600">
                  <p className="text-lg italic">
                    We believe in the power of anonymous expression to create
                    genuine connections.
                  </p>
                  <ul className="space-y-3 ml-4">
                    <li className="flex items-center space-x-3">
                      <span className="w-1.5 h-1.5 bg-gray-400 rounded-full"></span>
                      <span>Respect for every voice</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <span className="w-1.5 h-1.5 bg-gray-400 rounded-full"></span>
                      <span>Protection of anonymity</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <span className="w-1.5 h-1.5 bg-gray-400 rounded-full"></span>
                      <span>Support without judgment</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <span className="w-1.5 h-1.5 bg-gray-400 rounded-full"></span>
                      <span>Authenticity in expression</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white/40 backdrop-blur-sm p-8 rounded-2xl border border-white/50 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
                  <h2 className="text-2xl text-gray-700 mb-4 font-serif">
                    Express Freely, But Mindfully
                  </h2>
                  <p className="text-gray-600 leading-relaxed">
                    Share your deepest thoughts while being mindful of others'
                    experiences.
                  </p>
                </div>

                <div className="bg-white/40 backdrop-blur-sm p-8 rounded-2xl border border-white/50 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
                  <h2 className="text-2xl text-gray-700 mb-4 font-serif">
                    Maintain Anonymity
                  </h2>
                  <p className="text-gray-600 leading-relaxed">
                    Never share identifying information - yours or others'.
                  </p>
                </div>
              </div>

              <div className="bg-white/40 backdrop-blur-sm p-8 rounded-2xl border border-white/50 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
                <h2 className="text-2xl text-gray-700 mb-6 font-serif">
                  Content Boundaries
                </h2>
                <div className="space-y-4 text-gray-600">
                  <p className="text-lg">
                    While we embrace authentic expression, certain content is not
                    permitted:
                  </p>
                  <ul className="space-y-3 ml-4">
                    <li className="flex items-center space-x-3">
                      <span className="w-1.5 h-1.5 bg-gray-400 rounded-full"></span>
                      <span>Personal attacks or harassment</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <span className="w-1.5 h-1.5 bg-gray-400 rounded-full"></span>
                      <span>Hate speech or discrimination</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <span className="w-1.5 h-1.5 bg-gray-400 rounded-full"></span>
                      <span>Explicit or graphic content</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <span className="w-1.5 h-1.5 bg-gray-400 rounded-full"></span>
                      <span>Commercial promotion</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </BackgroundImage>
      </div>
      <Footer />
    </div>
  );
};

export default CommunityGuidelines;
