import React from 'react';
import { Helmet } from 'react-helmet-async';
import BackgroundImage from '../components/BackgroundImage';

export default function HelpCenter() {
  return (
    <div className="min-h-screen">
      <BackgroundImage imageUrl="https://images.unsplash.com/photo-1462275646964-a0e3386b89fa?auto=format&fit=crop&q=80">
        <div className="py-16 px-4">
          <Helmet>
            <title>Help Center | Unheard Voices</title>
            <meta name="description" content="Get help with using Unheard Voices" />
          </Helmet>

          <div className="max-w-3xl mx-auto space-y-8">
            <div className="text-center mb-16">
              <h1 className="text-5xl font-serif text-gray-800 mb-4">Finding Your Voice</h1>
              <p className="text-gray-600 italic text-lg">"Let your thoughts flow like a gentle stream"</p>
            </div>

            <div className="bg-white/40 backdrop-blur-sm p-8 rounded-2xl border border-white/50 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
              <h2 className="text-2xl text-gray-700 mb-6 font-serif">Your Journey Begins</h2>
              <div className="space-y-4 text-gray-600">
                <p className="text-lg">Start your journey of self-expression:</p>
                <ul className="space-y-3 ml-4">
                  <li className="flex items-center space-x-3">
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full"></span>
                    <span>Write from your heart, free from judgment</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full"></span>
                    <span>Share your story in complete anonymity</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full"></span>
                    <span>Find solace in shared experiences</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white/40 backdrop-blur-sm p-8 rounded-2xl border border-white/50 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
                <h2 className="text-2xl text-gray-700 mb-4 font-serif">Safe Space</h2>
                <p className="text-gray-600 leading-relaxed">
                  Your identity remains protected. Express freely, connect genuinely, 
                  and find understanding in our community of anonymous writers.
                </p>
              </div>

              <div className="bg-white/40 backdrop-blur-sm p-8 rounded-2xl border border-white/50 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
                <h2 className="text-2xl text-gray-700 mb-4 font-serif">Supporting Each Other</h2>
                <p className="text-gray-600 leading-relaxed">
                  Share empathy through meaningful reactions. Let others know their words 
                  have touched, inspired, or resonated with you.
                </p>
              </div>
            </div>

            <div className="bg-white/40 backdrop-blur-sm p-8 rounded-2xl border border-white/50 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
              <h2 className="text-2xl text-gray-700 mb-4 font-serif">Need Guidance?</h2>
              <p className="text-gray-600 leading-relaxed">
                While your privacy is paramount, we're here to help. Use our anonymous 
                feedback system to reach out about any concerns or questions.
              </p>
            </div>
          </div>
        </div>
      </BackgroundImage>
    </div>
  );
}
