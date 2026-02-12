"use client";

import { motion } from "framer-motion";
import Link from "next/link";

type BtnProps = {
  text: string;
  link: string;
  primary?: boolean;
};

function Btn({ text, link, primary }: BtnProps) {
  return (
    <Link href={link}>
      <motion.div
        whileHover={{ y: -3, scale: 1.06 }}
        whileTap={{ y: -1, scale: 1.03 }}
        transition={{ duration: 0.4, type: "spring" }}
        className={`rounded-lg cursor-pointer border-2 border-gray-800 px-5 py-2 text-lg font-bold
        ${primary ? "bg-green-400" : "bg-transparent"}`}
      >
        {text}
      </motion.div>
    </Link>
  );
}

export default Btn;
