import { motion } from "framer-motion";
import { FaUsers } from "react-icons/fa";
import communityImg from "../assets/community.svg";

const CommunityGuidelines = () => {
  return (
    <div className="max-w-5xl mx-auto px-6 py-12 text-[#292929] font-serif">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="text-center mb-10">
          <FaUsers className="text-5xl mx-auto text-yellow-600 mb-4" />
          <h1 className="text-4xl font-bold">Community Guidelines</h1>
          <p className="text-gray-600 mt-2">
            Keep Unheard Voices a safe space for all.
          </p>
        </div>

        <img src={communityImg} alt="Community" className="mx-auto w-64 mb-10" />

        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">Respect Anonymity</h2>
          <p>
            Never try to guess or expose a writer’s identity.
          </p>

          <h2 className="text-2xl font-semibold">No Hate Speech</h2>
          <p>
            Content promoting hate, harassment, or violence will be removed.
          </p>

          <h2 className="text-2xl font-semibold">Support Each Other</h2>
          <p>
            Your words may change someone's life. Be kind, be constructive, and be human.
          </p>
        </section>
      </motion.div>
    </div>
  );
};

export default CommunityGuidelines;
