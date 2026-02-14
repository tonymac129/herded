"use client";

import { signIn } from "next-auth/react";
import { motion } from "framer-motion";

type SigninBtnProps = {
  children: React.ReactNode;
  provider: string;
};

function SigninBtn({ children, provider }: SigninBtnProps) {
  return (
    <motion.div
      whileHover={{ y: -2, scale: 1.04 }}
      whileTap={{ y: -1, scale: 1.02 }}
      transition={{ duration: 0.4, type: "spring" }}
      className="border-2 border-gray-800 rounded-lg w-[80%] py-2 font-bold cursor-pointer flex items-center justify-center gap-x-3"
      onClick={() => signIn(provider.toLowerCase())}
    >
      {children}
      {provider}
    </motion.div>
  );
}

export default SigninBtn;
