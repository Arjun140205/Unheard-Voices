import { motion } from "framer-motion";
import { FaRegFileAlt } from "react-icons/fa";

const TermsOfService = () => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12 text-[#292929] font-serif">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="text-center mb-10">
          <FaRegFileAlt className="text-5xl mx-auto text-blue-700 mb-4" />
          <h1 className="text-4xl font-bold">Terms of Service</h1>
          <p className="text-gray-600 mt-2">Please read these terms carefully before using the platform.</p>
        </div>

        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">Use responsibly</h2>
          <p>
            Do not use Unheard Voices to spread misinformation, defame others, or violate laws.
          </p>

          <h2 className="text-2xl font-semibold">Content rights</h2>
          <p>
            You retain rights to your content. We do not claim ownership of your stories.
          </p>

          <h2 className="text-2xl font-semibold">Platform limitations</h2>
          <p>
            As an anonymous platform, we cannot verify user identities or validate authenticity.
          </p>
        </section>
      </motion.div>
    </div>
  );
};

export default TermsOfService;
