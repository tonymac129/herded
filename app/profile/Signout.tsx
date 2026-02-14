"use client";

import { signOut } from "next-auth/react";

function Signout() {
  return <div onClick={() => signOut()}>Signout</div>;
}

export default Signout;
