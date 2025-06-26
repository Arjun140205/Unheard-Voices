import React from "react";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <article className="max-w-3xl mx-auto px-4 py-20 sm:py-32">
      {/* Header */}
      <header className="text-center mb-16">
        <h1 className="text-4xl sm:text-5xl font-serif font-bold text-gray-900 leading-tight">
          Some voices are not meant to linger in silence.
        </h1>
        <p className="mt-6 text-lg text-gray-600">
          Welcome to a sanctuary where every word finds its worth.
        </p>
      </header>

      {/* Intro Section */}
      <section className="mb-10">
        <h2 className="text-2xl font-serif font-semibold mb-4">What is Unheard Voices?</h2>
        <p className="mb-4">
          Unheard Voices is not merely a platform; it is a haven for the unspoken, a refuge for thoughts that yearn to be heard.
        </p>
        <p>
          Here, there are no algorithms dictating your worth, no metrics measuring your meaning. Only stories—raw, resonant, and real—waiting to be shared and savored.
        </p>
      </section>

      {/* Quote Section */}
      <section className="my-12">
        <blockquote className="border-l-4 border-gray-300 pl-6 text-gray-700 italic text-lg font-serif bg-gray-50 py-4 rounded">
          “The most vital stories are those we seldom dare to tell.”
        </blockquote>
      </section>

      {/* How It Works Section */}
      <section className="mb-10">
        <h2 className="text-2xl font-serif font-semibold mb-4">How It Works</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-800">
          <li>Write without the burden of followers or the pressure of perfection.</li>
          <li>Read without endless scrolling or curated feeds.</li>
          <li>Connect through honesty, not pretense.</li>
        </ul>
      </section>

      {/* For Whom Section */}
      <section className="mb-10">
        <h2 className="text-2xl font-serif font-semibold mb-4">Who is this for?</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {/* Writers Card */}
          <div className="bg-white border border-gray-200 rounded-lg p-6 text-center shadow-sm">
            <h3 className="text-xl font-serif font-bold mb-2">Writers</h3>
            <p className="mb-4">
              Pour forth your truths—the beautiful, the broken, the becoming. Here, vulnerability is not a weakness; it is your art.
            </p>
            <Link
              to="/write"
              className="inline-block px-5 py-2 border border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white transition rounded-full text-sm"
            >
              Start Writing
            </Link>
          </div>
          {/* Readers Card */}
          <div className="bg-white border border-gray-200 rounded-lg p-6 text-center shadow-sm">
            <h3 className="text-xl font-serif font-bold mb-2">Readers</h3>
            <p className="mb-4">
              Discover what is rarely revealed elsewhere. Unfiltered moments. Unvarnished thoughts. Souls laid bare.
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
      <section className="mb-10">
        <h2 className="text-2xl font-serif font-semibold mb-4">Our Promise</h2>
        <p className="mb-2">
          We do not track your clicks, commodify your story, or chase trends. We are not here for engagement, but for genuine connection.
        </p>
        <p>
          If your spirit seeks to speak, to whisper, to weep, or simply to exist—let it.
        </p>
      </section>

      {/* Final Call to Action */}
      <section className="text-center mt-16">
        <h2 className="text-xl font-medium mb-6">Ready to share your truth?</h2>
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
