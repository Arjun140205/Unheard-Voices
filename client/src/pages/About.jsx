import React from "react";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <article className="max-w-3xl mx-auto px-4 py-20 sm:py-32">
      <header className="text-center mb-20">
        <h1 className="text-4xl sm:text-5xl font-serif font-bold text-gray-900 leading-tight">
          Some voices were never meant to echo in silence.
        </h1>
        <p className="mt-6 text-lg text-gray-600">
          Welcome to the place where words don’t need permission to matter.
        </p>
      </header>

      <section className="space-y-10 text-gray-800 text-lg leading-relaxed">
        <p>
          Unheard Voices isn’t just a platform — it’s a soft place to land.
        </p>

        <p>
          No likes. No algorithms. No “you should post this instead.”
          <br />
          Just stories that hit where it hurts, heals, and stays.
        </p>

        <p>
          Whether you’re feeling too much or nothing at all —
          <br />
          this space was made for you.
        </p>

        <blockquote className="border-l-4 border-black pl-5 text-gray-700 italic">
          The most important stories are often the ones we never get to tell.
        </blockquote>

        <p>
          Here, you don’t need to be a writer. You just need to be honest.
          <br />
          Journal entries. Midnight thoughts. Open letters to no one.
          <br />
          They all belong here.
        </p>

        <div className="bg-gray-50 p-8 rounded-xl shadow-md text-center my-16">
          <p className="text-xl text-gray-900 font-medium">
            Write without a following. <br />
            Read without scrolling. <br />
            Connect without pretending.
          </p>
        </div>

        <hr className="border-t border-gray-300 my-10" />

        <h2 className="text-2xl sm:text-3xl font-serif font-semibold mt-16 mb-6">
          For the ones who feel too much
        </h2>

        <p>
          You don’t need to write a bestseller to be understood.
          <br />
          You don’t need a platform to be heard.
          <br />
          You just need a place that listens.
        </p>

        <div className="grid md:grid-cols-2 gap-12 mt-16">
          <div className="text-center space-y-6 p-8 bg-white shadow-lg rounded-xl">
            <h3 className="text-2xl font-serif font-bold">Writers</h3>
            <p>
              Pour it out — the messy, the raw, the healing.
              <br />
              This is where vulnerability isn’t weakness. It’s art.
            </p>
            <Link
              to="/write"
              className="inline-block mt-4 px-6 py-3 border-2 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white transition rounded-full"
            >
              Start Writing
            </Link>
          </div>

          <div className="text-center space-y-6 p-8 bg-white shadow-lg rounded-xl">
            <h3 className="text-2xl font-serif font-bold">Readers</h3>
            <p>
              Read what people never post on Instagram.
              <br />
              Real moments. Unedited thoughts. Souls on paper.
            </p>
            <Link
              to="/explore"
              className="inline-block mt-4 px-6 py-3 border-2 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white transition rounded-full"
            >
              Start Reading
            </Link>
          </div>
        </div>

        <hr className="border-t border-gray-300 my-20" />

        <h2 className="text-2xl sm:text-3xl font-serif font-semibold mt-20 mb-6">
          This isn’t a product. It’s a promise.
        </h2>

        <p>
          We don’t track your clicks. We don’t sell your story. We don’t push what trends.
          <br />
          We’re not here for engagement — we’re here for connection.
        </p>

        <p>
          If something inside you needs to speak, whisper, cry, confess, or simply exist — let it out.
        </p>

        <p className="text-xl font-medium text-center mt-16">
          And when you’re ready…
        </p>

        <div className="text-center mt-8">
          <Link
            to="/write"
            className="inline-block bg-gray-900 text-white px-10 py-4 text-lg font-semibold rounded-full hover:bg-gray-800 transition"
          >
            Write Something Real
          </Link>
        </div>
      </section>
    </article>
  );
};

export default About;
