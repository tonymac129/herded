"use client";

import { signIn } from "next-auth/react";

function SigninBtn() {
  return <div onClick={() => signIn("google")}>Google</div>;
}

export default SigninBtn;
