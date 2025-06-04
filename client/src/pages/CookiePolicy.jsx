import { motion } from "framer-motion";
import { FaCookieBite } from "react-icons/fa";

const CookiePolicy = () => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12 text-[#292929] font-serif">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="text-center mb-10">
          <FaCookieBite className="text-5xl mx-auto text-amber-500 mb-4" />
          <h1 className="text-4xl font-bold">Cookie Policy</h1>
          <p className="text-gray-600 mt-2">Spoiler: We don't use cookies 🍪</p>
        </div>

        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">We respect your digital diet</h2>
          <p>
            Unlike most platforms, Unheard Voices does not use cookies. No tracking, no ads, no distractions.
          </p>

          <h2 className="text-2xl font-semibold">No third-party scripts</h2>
          <p>
            We don't embed analytics tools or ad trackers. What you write and read stays with you.
          </p>
        </section>
      </motion.div>
    </div>
  );
};

export default CookiePolicy;
