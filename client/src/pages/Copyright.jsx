import React from 'react';
import { Helmet } from 'react-helmet-async';
import BackgroundImage from '../components/BackgroundImage';
import adminbg from '../assets/adminbg.jpg';

const Copyright = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-grow">
        <BackgroundImage imageUrl={adminbg}>
          <div className="py-16 px-4">
            <Helmet>
              <title>Copyright & Rights - Unheard Voices</title>
              <meta name="description" content="Copyright information and rights for Unheard Voices" />
            </Helmet>

            <div className="max-w-4xl mx-auto space-y-8">
              {/* Header */}
              <div className="text-center mb-12">
                <h1 className="text-5xl font-serif text-gray-800 mb-4">
                  Copyright & Rights
                </h1>
                <p className="text-gray-600 italic text-lg">
                  "Built with care, shared with purpose"
                </p>
              </div>

              {/* Main Content */}
              <div className="space-y-6">
                {/* Copyright Notice */}
                <div className="bg-white/40 backdrop-blur-sm p-8 rounded-2xl border border-white/50 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
                  <h2 className="text-2xl text-gray-700 mb-6 font-serif">
                    Copyright Notice
                  </h2>
                  <div className="space-y-4 text-gray-600">
                    <p className="leading-relaxed">
                      © {new Date().getFullYear()} Unheard Voices. All rights reserved.
                    </p>
                    <p className="leading-relaxed">
                      This website and all its content, features, and functionality are owned by Arjunbir Singh 
                      and are protected by international copyright, trademark, and other intellectual property laws.
                    </p>
                  </div>
                </div>

                {/* Owner Information */}
                <div className="bg-white/40 backdrop-blur-sm p-8 rounded-2xl border border-white/50 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
                  <h2 className="text-2xl text-gray-700 mb-6 font-serif">
                    Owner & Creator
                  </h2>
                  <div className="space-y-4 text-gray-600">
                    <p className="leading-relaxed">
                      <span className="font-semibold text-gray-700">Name:</span> Arjunbir Singh
                    </p>
                    <p className="leading-relaxed">
                      <span className="font-semibold text-gray-700">LinkedIn:</span>{' '}
                      <a
                        href="https://www.linkedin.com/in/arjunbir-singh/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-700 hover:text-gray-900 underline"
                      >
                        linkedin.com/in/arjunbir-singh
                      </a>
                    </p>
                    <p className="leading-relaxed">
                      <span className="font-semibold text-gray-700">Email:</span>{' '}
                      <a
                        href="mailto:arjunbirsingh1699@gmail.com"
                        className="text-gray-700 hover:text-gray-900 underline"
                      >
                        arjunbirsingh1699@gmail.com
                      </a>
                    </p>
                  </div>
                </div>

                {/* Contact for Issues */}
                <div className="bg-white/40 backdrop-blur-sm p-8 rounded-2xl border border-white/50 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
                  <h2 className="text-2xl text-gray-700 mb-6 font-serif">
                    Report Issues or Contribute
                  </h2>
                  <p className="text-gray-600 leading-relaxed mb-6">
                    If you encounter any issues with the website, have suggestions for improvement, 
                    or wish to contribute to the platform, please feel free to reach out.
                  </p>
                  <div className="space-y-3 text-gray-600">
                    <div className="flex items-start space-x-3">
                      <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2"></span>
                      <p><span className="font-semibold text-gray-700">For technical issues:</span> Please email with a detailed description of the problem</p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2"></span>
                      <p><span className="font-semibold text-gray-700">For contributions:</span> Share your ideas or proposals via email</p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2"></span>
                      <p><span className="font-semibold text-gray-700">For collaborations:</span> Connect on LinkedIn or send an email</p>
                    </div>
                  </div>
                </div>

                {/* Usage Rights */}
                <div className="bg-white/40 backdrop-blur-sm p-8 rounded-2xl border border-white/50 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
                  <h2 className="text-2xl text-gray-700 mb-6 font-serif">
                    Usage Rights
                  </h2>
                  <p className="text-gray-600 leading-relaxed">
                    Users are granted a limited license to access and use this website for personal, 
                    non-commercial purposes. Any unauthorized reproduction, distribution, or modification 
                    of the content is strictly prohibited without prior written consent.
                  </p>
                </div>

                {/* Contact Card */}
                <div className="bg-white/40 backdrop-blur-sm p-8 rounded-2xl border border-white/50 shadow-[0_8px_30px_rgb(0,0,0,0.04)] text-center">
                  <h3 className="text-2xl font-serif text-gray-700 mb-4">
                    Get in Touch
                  </h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    Have questions or want to connect?
                  </p>
                  <a
                    href="mailto:arjunbirsingh1699@gmail.com"
                    className="inline-block px-8 py-3 border border-[#e5ded7] bg-[#f7f4ef] text-[#7c6f5a] hover:bg-[#ede9e3] hover:text-[#5c5343] transition rounded-full font-medium"
                  >
                    Send an Email
                  </a>
                </div>
              </div>
            </div>
          </div>
        </BackgroundImage>
      </div>
    </div>
  );
};

export default Copyright;
