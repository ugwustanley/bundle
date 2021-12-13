import { motion, AnimatePresence } from "framer-motion";

export default function Preloader() {
  return (
    <motion.div
      exit={{ opacity: 0, scale: 2 }}
      transition={{ duration: 1, ease: "easeInOut" }}
      className="preloader"
    >
      <motion.svg
        width="102"
        height="102"
        viewBox="0 0 62 42"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <motion.circle
          initial={{ pathLength: 0 }}
          animate={{
            pathLength: 1.1,
            strokeWidth: [0.5, 1, 1.5],
            x: [10, 10, 10, 10, 10, 10, 0],
          }}
          transition={{ duration: 3, ease: "easeInOut" }}
          cx="20.6667"
          cy="20.6667"
          r="19.1667"
          stroke="white"
          stroke-width="3"
        />
        <motion.circle
          initial={{ pathLength: 0 }}
          animate={{
            pathLength: 1.1,
            strokeWidth: [0.5, 1, 1.5],
            x: [-11, -11, -11, -11, -11, -11, 0],
          }}
          transition={{ duration: 3, ease: "easeInOut" }}
          cx="41.3332"
          cy="20.6667"
          r="19.1667"
          stroke="white"
          stroke-width="3"
        />
      </motion.svg>
    </motion.div>
  );
}
