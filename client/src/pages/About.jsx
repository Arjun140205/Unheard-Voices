import React from "react";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <article className="max-w-3xl mx-auto px-4 py-8 sm:py-12">
      {/* Header */}
      <header className="text-center mb-12 mt-4">
        <h1 className="text-4xl sm:text-5xl font-serif font-bold text-gray-900 leading-tight">
          Some voices are not meant to linger in silence.
        </h1>
        <p className="mt-4 text-lg text-gray-600 italic">
          Welcome to a gentle space where every word is cherished.
        </p>
      </header>

      {/* Intro Section */}
      <section className="mb-8">
        <h2 className="text-2xl font-serif font-semibold mb-4">What is Unheard Voices?</h2>
        <p className="mb-4">
          Unheard Voices is more than a platform—it is a sanctuary for the thoughts we hold close, a home for feelings that deserve to be heard.
        </p>
        <p>
          Here, your story is not measured by numbers or trends.<br />
          It is valued for its honesty, its courage, and its heart.
        </p>
      </section>

      {/* Quote Section */}
      <section className="my-8">
        <blockquote className="border-l-4 border-gray-300 pl-6 text-gray-700 italic text-lg font-serif bg-gray-50 py-3 rounded">
          “The most meaningful stories are often the ones we whisper to ourselves.”
        </blockquote>
      </section>

      {/* How It Works Section */}
      <section className="mb-8">
        <h2 className="text-2xl font-serif font-semibold mb-4">How It Works</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-800">
          <li>Write freely, without expectation or audience.</li>
          <li>Read slowly, savoring each unfiltered moment.</li>
          <li>Connect through shared truth, not performance.</li>
        </ul>
      </section>

      {/* For Whom Section */}
      <section className="mb-8">
        <h2 className="text-2xl font-serif font-semibold mb-4">Who is this for?</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {/* Writers Card */}
          <div className="bg-white border border-gray-200 rounded-lg p-5 text-center shadow-sm">
            <h3 className="text-xl font-serif font-bold mb-2">Writers</h3>
            <p className="mb-4">
              Let your words spill—messy, honest, unfinished.<br />
              Here, vulnerability is not a flaw; it is a gift.
            </p>
            <Link
              to="/write"
              className="inline-block px-5 py-2 border border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white transition rounded-full text-sm"
            >
              Start Writing
            </Link>
          </div>
          {/* Readers Card */}
          <div className="bg-white border border-gray-200 rounded-lg p-5 text-center shadow-sm">
            <h3 className="text-xl font-serif font-bold mb-2">Readers</h3>
            <p className="mb-4">
              Discover what is rarely spoken aloud.<br />
              Real moments. Quiet confessions. Souls on the page.
            </p>
            <Link
              to="/explore"
              className="inline-block px-5 py-2 border border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white transition rounded-full text-sm"
            >
              Start Reading
            </Link>
          </div>
        </div>
      </section>

      {/* Promise/Values Section */}
      <section className="mb-8">
        <h2 className="text-2xl font-serif font-semibold mb-4">Our Promise</h2>
        <p className="mb-2">
          We do not follow your clicks, sell your story, or chase what's popular.<br />
          We are here for what is real, for what matters.
        </p>
        <p>
          If your heart needs to speak, or simply to be, you are welcome here.
        </p>
      </section>

      {/* Final Call to Action */}
      <section className="text-center mt-12">
        <h2 className="text-xl font-medium mb-6">When you are ready, we are here to listen.</h2>
        <Link
          to="/write"
          className="inline-block bg-gray-900 text-white px-10 py-4 text-lg font-semibold rounded-full hover:bg-gray-800 transition"
        >
          Write Something Real
        </Link>
      </section>
    </article>
  );
};

export default About;
