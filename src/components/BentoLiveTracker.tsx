import { motion } from "framer-motion";
import heroDishes from "@/assets/hero-dishes.png";

const BentoLiveTracker = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, delay: 0.1, ease: [0.2, 0, 0, 1] }}
      className="group relative overflow-hidden rounded-3xl shadow-bento transition-all duration-300 bento-ease hover:shadow-bento-hover hover:-translate-y-0.5 col-span-full lg:col-span-4 min-h-[160px]"
    >
      <img
        src={heroDishes}
        alt="African dishes"
        className="w-full h-full object-cover"
      />
    </motion.div>
  );
};

export default BentoLiveTracker;
