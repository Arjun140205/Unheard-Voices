import React from "react";
import { Link } from "react-router-dom";
import aboutBg from "../assets/aboutbg.jpg";

const About = () => {
  return (
    <div className="w-full min-h-screen bg-[#f9f7f3]">
      {/* Hero Section with background image */}
      <section className="relative h-[340px] sm:h-[420px] flex items-center justify-center overflow-hidden">
        <img
          src={aboutBg}
          alt="White flowering branch by Anton Darius"
          className="absolute inset-0 w-full h-full object-cover object-center z-0"
          style={{ filter: 'brightness(0.7) blur(0px)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/10 z-10" />
        <div className="relative z-20 flex flex-col items-center justify-center w-full px-4">
          <h1 className="text-2xl sm:text-4xl font-serif font-bold text-white text-center drop-shadow-lg mb-4">
            The most meaningful stories are often the ones we whisper to ourselves
          </h1>
          <p className="text-lg sm:text-xl text-white text-center max-w-2xl drop-shadow-md">
            Welcome to a thoughtful space where every word is valued and quiet feelings find their voice.
          </p>
        </div>
      </section>

      {/* Main Content Section */}
      <article className="max-w-3xl mx-auto px-4 py-10 sm:py-16">
        {/* Boxed Section */}
        <section className="bg-white/90 rounded-2xl shadow-lg p-8 mb-10">
          <h2 className="text-2xl font-serif font-semibold mb-4">What is Unheard Voices?</h2>
          <p className="mb-4">
            Unheard Voices is not merely a platform; it is a meeting place for unspoken thoughts and honest expression. Here, you are invited to set aside the need for perfection and simply share what is real, in your own words and in your own time.
          </p>
          <p>
            Within these digital walls, your story is liberated from the tyranny of numbers and trends. It is celebrated for its honesty, its quiet courage, and the sincerity of its heart. We believe that every voice, no matter how soft, deserves to be heard and cherished.
          </p>
        </section>

        {/* Normal Section */}
        {/* <section className="my-8">
          <blockquote className="border-l-4 border-rose-200 pl-6 text-gray-700 italic text-lg font-serif bg-rose-50 py-4 rounded">
            "The most meaningful stories are often the ones we whisper to ourselves."
          </blockquote>
        </section> */}

        {/* Normal Section */}
        <section className="mb-10">
          <h2 className="text-2xl font-serif font-semibold mb-4">Who is this for?</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Writers Card */}
            <div className="bg-white border border-rose-100 rounded-lg p-6 text-center shadow-sm">
              <h3 className="text-xl font-serif font-bold mb-2">For Writers</h3>
              <p className="mb-4">
                Let your thoughts wander without worry or expectation. Your words matter, whether they are polished or raw. This is a gentle place where your story is welcome, just as it is.
              </p>
              <Link
                to="/write"
                className="inline-block px-5 py-2 border border-[#e5ded7] bg-[#f7f4ef] text-[#7c6f5a] hover:bg-[#ede9e3] hover:text-[#5c5343] transition rounded-full text-sm"
              >
                Start Writing
              </Link>
            </div>
            {/* Readers Card */}
            <div className="bg-white border border-rose-100 rounded-lg p-6 text-center shadow-sm">
              <h3 className="text-xl font-serif font-bold mb-2">For Readers</h3>
              <p className="mb-4">
                Discover stories shared with trust and honesty. Every story, no matter how simple or unfinished, has meaning. Let these words find a quiet place in your own heart.
              </p>
              <Link
                to="/explore"
                className="inline-block px-5 py-2 border border-[#e5ded7] bg-[#f7f4ef] text-[#7c6f5a] hover:bg-[#ede9e3] hover:text-[#5c5343] transition rounded-full text-sm"
              >
                Start Reading
              </Link>
            </div>
          </div>
        </section>

        {/* Boxed Section */}
        <section className="bg-white/90 rounded-2xl shadow p-8 mb-10">
          <h2 className="text-2xl font-serif font-semibold mb-4">Our Promise</h2>
          <p className="mb-2">
            We do not track your clicks, sell your story, or chase what is popular.<br />
            We are here for what is real, for what matters.
          </p>
          <p>
            If your heart needs to speak, or simply to rest, you are always welcome here.
          </p>
        </section>

        {/* Final Call to Action */}
        <section className="text-center mt-12">
          <h2 className="text-xl font-medium mb-6">When you are ready, we are here to listen.</h2>
          <Link
            to="/write"
            className="inline-block bg-[#f7f4ef] text-[#7c6f5a] border border-[#e5ded7] px-10 py-4 text-lg font-semibold rounded-full hover:bg-[#ede9e3] hover:text-[#5c5343] transition"
          >
            Write Something Real
          </Link>
        </section>
      </article>
    </div>
  );
};

export default About;
