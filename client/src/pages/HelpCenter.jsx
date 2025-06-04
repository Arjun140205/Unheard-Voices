import { motion } from "framer-motion";
import { FaQuestionCircle } from "react-icons/fa";
import helpImg from "../assets/help-center.svg"; 

const HelpCenter = () => {
  return (
    <div className="max-w-5xl mx-auto px-6 py-12 text-[#292929] font-serif">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="text-center mb-10">
          <FaQuestionCircle className="text-5xl mx-auto text-green-600 mb-4" />
          <h1 className="text-4xl font-bold">Help Center</h1>
          <p className="text-gray-600 mt-2">
            Get support, find answers, and understand how to use Unheard Voices better.
          </p>
        </div>

        <img src={helpImg} alt="Help Illustration" className="mx-auto w-60 mb-10" />

        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">How do I start writing?</h2>
          <p>
            Just visit the "Write" page and begin. No sign-ups. No profiles. Just your words, anonymously shared with the world.
          </p>

          <h2 className="text-2xl font-semibold">Can I edit or delete my story?</h2>
          <p>
            Since we don't store user data or have accounts, deletion and edits are not currently supported. We're exploring secure, anonymous edit links.
          </p>

          <h2 className="text-2xl font-semibold">Still need help?</h2>
          <p>
            Contact us at <span className="text-green-700">unheardvoices4u@gmail.com</span>. Our tiny but passionate team will get back to you soon.
          </p>
        </section>
      </motion.div>
    </div>
  );
};

export default HelpCenter;
