import React from 'react';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <article className="max-w-[900px] mx-auto px-4 py-16 sm:py-24">
      <header className="text-center mb-16">
        <h1 className="text-[32px] sm:text-[40px] font-serif font-bold mb-6 text-gray-900 leading-tight">
          Everyone carries a voice waiting to be heard
        </h1>
      </header>

      <div className="space-y-8 text-gray-800">
        <section className="prose prose-lg max-w-none">
          

           <p className="text-xl leading-relaxed mb-8">
            In a world obsessed with profiles, filters, and followers, Unheard Voices offers something rare: freedom without judgment. 
            You don't need fame, perfection, or approval to write here. Just your truth: raw, real, and resonant.
          </p>

          <blockquote className="border-l-4 border-gray-900 pl-4 my-8 italic">
            We believe the most profound stories are the ones we're afraid to tell.
          </blockquote>

          <p className="text-lg leading-relaxed mb-12">
            This platform exists for the things you couldn't say out loud, the feelings you couldn't explain in a crowd, 
            the memories that shaped you when no one was watching. Whether you're healing from heartbreak, navigating loneliness, 
            celebrating small victories, or just trying to understand yourself a little better — this is your space.
          </p>

          <h2 className="text-2xl font-serif font-bold mt-12 mb-6">A quiet corner in a noisy world</h2>
          <p className="text-lg leading-relaxed mb-8">
            The internet moves fast. But healing, empathy, and connection take time. Unheard Voices was built to slow things down — 
            to make space for depth over drama, connection over clout.
          </p>

          <div className="bg-gray-50 p-8 rounded-lg my-12">
            <p className="text-xl font-medium text-center">
              No likes. No shares. No pressure.<br />
              Just stories that speak to the soul, from strangers who feel like friends.
            </p>
          </div>

          {/* For Writers and Readers section with partition */}
          <div className="relative my-16">
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gray-200 transform -translate-x-1/2"></div>
            <div className="grid md:grid-cols-2 gap-12">
              <div className="p-8">
                <div className="max-w-xs mx-auto">
                  <h3 className="text-2xl font-serif font-bold mb-6 text-center">For Writers</h3>
                  <p className="text-lg leading-relaxed text-gray-700">
                    Write without fear. Share without judgment. Connect without pretense. 
                    Whether you're sharing a personal story, exploring an idea, or processing your thoughts, 
                    this is your space to be heard.
                  </p>
                  <div className="mt-8 text-center">
                    <Link 
                      to="/write"
                      className="inline-block px-6 py-2 border-2 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white transition-colors duration-200 rounded-full text-lg"
                    >
                      Start Writing
                    </Link>
                  </div>
                </div>
              </div>

              <div className="p-8">
                <div className="max-w-xs mx-auto">
                  <h3 className="text-2xl font-serif font-bold mb-6 text-center">For Readers</h3>
                  <p className="text-lg leading-relaxed text-gray-700">
                    Discover stories that resonate, perspectives that challenge, and voices that inspire. 
                    Here, you'll find authentic human experiences that remind us we're all connected.
                  </p>
                  <div className="mt-8 text-center">
                    <Link 
                      to="/explore"
                      className="inline-block px-6 py-2 border-2 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white transition-colors duration-200 rounded-full text-lg"
                    >
                      Start Reading
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <h2 className="text-2xl font-serif font-bold mt-12 mb-6">Built on empathy, not ego</h2>
          <p className="text-lg leading-relaxed mb-8">
            We don't track your clicks. We don't sell your data. We don't push content based on algorithms.
            Instead, we're creating a home for those who write to feel, not to perform.
          </p>

          <div className="my-12">
            <h3 className="text-xl font-serif font-bold mb-4">Our mission is simple:</h3>
            <p className="text-xl leading-relaxed italic">
              To give every unheard story a place to be seen — and every silent writer a chance to be felt.
            </p>
          </div>

          <h2 className="text-2xl font-serif font-bold mt-12 mb-6">Who writes here?</h2>
          <p className="text-xl font-medium mb-4">You do.</p>
          <p className="text-lg leading-relaxed mb-12">
            So do students, survivors, wanderers, dreamers, rebels, caretakers, and anyone else who has a truth they've been carrying. 
            Some write to heal. Others write to help. All write to be human.
          </p>
        </section>

        <div className="border-t border-gray-200 pt-12 mt-16 text-center">
          <Link 
            to="/write" 
            className="inline-block bg-gray-900 text-white px-8 py-3 rounded-full text-lg font-medium hover:bg-gray-800 transition-colors duration-200"
          >
            Start Writing Your Story
          </Link>
        </div>
      </div>
    </article>
  );
};

export default About;
