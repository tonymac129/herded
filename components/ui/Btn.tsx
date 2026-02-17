"use client";

import { motion } from "framer-motion";
import Link from "next/link";

type BtnProps = {
  text: string;
  link?: string;
  primary?: boolean;
  onclick?: () => void;
};

function Btn({ text, link, primary, onclick }: BtnProps) {
  return (
    <>
      {!link ? (
        <motion.div
          whileHover={{ y: -3, scale: 1.06 }}
          whileTap={{ y: -1, scale: 1.03 }}
          transition={{ duration: 0.4, type: "spring" }}
          className={`w-fit rounded-lg cursor-pointer border-2 border-gray-800 px-5 py-2 text-lg font-bold
        ${primary ? "bg-green-400" : "bg-transparent"}`}
          onClick={onclick}
        >
          {text}
        </motion.div>
      ) : (
        <Link href={link}>
          <motion.div
            whileHover={{ y: -3, scale: 1.06 }}
            whileTap={{ y: -1, scale: 1.03 }}
            transition={{ duration: 0.4, type: "spring" }}
            className={`w-fit rounded-lg cursor-pointer border-2 border-gray-800 px-5 py-2 text-lg font-bold
        ${primary ? "bg-green-400" : "bg-transparent"}`}
          >
            {text}
          </motion.div>
        </Link>
      )}
    </>
  );
}

export default Btn;
