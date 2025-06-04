import { motion } from "framer-motion";
import { FaPenFancy } from "react-icons/fa";
import writingImg from "../assets/writing-tips.svg";

const WritingTips = () => {
  return (
    <div className="max-w-5xl mx-auto px-6 py-12 text-[#292929] font-serif">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="text-center mb-10">
          <FaPenFancy className="text-5xl mx-auto text-indigo-600 mb-4" />
          <h1 className="text-4xl font-bold">Writing Tips</h1>
          <p className="text-gray-600 mt-2">
            Create powerful, honest content. Here's how.
          </p>
        </div>

        <img src={writingImg} alt="Writing" className="mx-auto w-64 mb-10" />

        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">1. Be raw, not polished</h2>
          <p>
            Anonymous doesn't mean careless. Let your voice echo your truth.
          </p>

          <h2 className="text-2xl font-semibold">2. Write in scenes</h2>
          <p>
            Paint pictures with words. Describe what you felt, saw, heard, and feared.
          </p>

          <h2 className="text-2xl font-semibold">3. Respect others' privacy</h2>
          <p>
            Don’t use real names or identifiers. Let stories speak without harming anyone.
          </p>
        </section>
      </motion.div>
    </div>
  );
};

export default WritingTips;
