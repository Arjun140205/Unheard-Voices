import React from "react";
import { Helmet } from "react-helmet-async";
import BackgroundImage from "../components/BackgroundImage";
import Footer from "../components/Footer";

const WritingTips = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-grow">
        <BackgroundImage imageUrl="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80">
          <div className="py-16 px-4">
            <Helmet>
              <title>Writing Tips | Unheard Voices</title>
              <meta
                name="description"
                content="Tips for expressing your deepest thoughts"
              />
            </Helmet>

            <div className="max-w-3xl mx-auto space-y-8">
              <div className="text-center mb-16">
                <h1 className="text-5xl font-serif text-gray-800 mb-4">
                  The Art of Authentic Expression
                </h1>
                <p className="text-gray-600 italic text-lg">
                  "Let your thoughts flow like gentle waters"
                </p>
              </div>

              <div className="bg-white/40 backdrop-blur-sm p-8 rounded-2xl border border-white/50 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
                <h2 className="text-2xl text-gray-700 mb-6 font-serif">
                  Finding Your Inner Voice
                </h2>
                <div className="prose prose-lg max-w-none text-gray-600">
                  <p>
                    Begin with silence. Listen to the whispers of your thoughts.
                    The most profound words often come from moments of quiet
                    reflection.
                  </p>
                  <ul className="space-y-3 ml-4 mt-4">
                    <li className="flex items-center space-x-3">
                      <span className="w-1.5 h-1.5 bg-gray-400 rounded-full"></span>
                      <span>Write as if no one is watching</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <span className="w-1.5 h-1.5 bg-gray-400 rounded-full"></span>
                      <span>Let your thoughts flow without judgment</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <span className="w-1.5 h-1.5 bg-gray-400 rounded-full"></span>
                      <span>
                        Embrace vulnerability - it's where authenticity lives
                      </span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-white/40 backdrop-blur-sm p-8 rounded-2xl border border-white/50 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
                <h2 className="text-2xl text-gray-700 mb-6 font-serif">
                  Crafting Your Message
                </h2>
                <div className="grid md:grid-cols-2 gap-6 text-gray-600">
                  <div className="space-y-4">
                    <h3 className="text-xl text-gray-700 font-serif">
                      Start With Raw Emotion
                    </h3>
                    <p className="leading-relaxed">
                      Let your first draft be pure feeling. Don't edit yourself
                      yet. Let the emotions guide your words.
                    </p>
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-xl text-gray-700 font-serif">
                      Find Your Rhythm
                    </h3>
                    <p className="leading-relaxed">
                      Write like you're having a conversation with your deepest
                      self. Let your natural voice shine through.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white/40 backdrop-blur-sm p-8 rounded-2xl border border-white/50 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
                <h2 className="text-2xl text-gray-700 mb-6 font-serif">
                  Before You Share
                </h2>
                <div className="space-y-4 text-gray-600">
                  <p className="text-lg">Take a moment to reflect:</p>
                  <ul className="space-y-3 ml-4">
                    <li className="flex items-center space-x-3">
                      <span className="w-1.5 h-1.5 bg-gray-400 rounded-full"></span>
                      <span>Is this true to your experience?</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <span className="w-1.5 h-1.5 bg-gray-400 rounded-full"></span>
                      <span>Could these words resonate with others?</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <span className="w-1.5 h-1.5 bg-gray-400 rounded-full"></span>
                      <span>Have you removed any identifying details?</span>
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

export default WritingTips;
