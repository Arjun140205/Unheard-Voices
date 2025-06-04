import { motion } from "framer-motion";
import { FaUserSecret } from "react-icons/fa";

const PrivacyPolicy = () => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12 text-[#292929] font-serif">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="text-center mb-10">
          <FaUserSecret className="text-5xl mx-auto text-red-600 mb-4" />
          <h1 className="text-4xl font-bold">Privacy Policy</h1>
          <p className="text-gray-600 mt-2">Last updated: June 2025</p>
        </div>

        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">No user tracking</h2>
          <p>
            We do not collect, track, or store your IP, location, or any personal identifiers.
          </p>

          <h2 className="text-2xl font-semibold">No accounts. No cookies.</h2>
          <p>
            You are not required to log in. We use no cookies for tracking, analytics, or targeting.
          </p>

          <h2 className="text-2xl font-semibold">Security</h2>
          <p>
            We take anonymous data safety seriously. If any vulnerabilities are found, email us securely.
          </p>
        </section>
      </motion.div>
    </div>
  );
};

export default PrivacyPolicy;
