"use client";

import { motion } from "framer-motion";

function Animate({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ y: 150, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, type: "spring" }}
      className="max-w-280 w-[95%] lg:w-[80%] m-auto"
    >
      {children}
    </motion.div>
  );
}

export default Animate;
