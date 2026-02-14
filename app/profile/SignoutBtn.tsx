"use client";

import { signOut } from "next-auth/react";
import { useState } from "react";
import Btn from "@/components/ui/Btn";

function SignoutBtn() {
  const [loading, setLoading] = useState<boolean>(false);

  function handleSignOut() {
    setLoading(true);
    signOut();
  }

  return (
    <Btn
      text={loading ? "Loading..." : "Sign out"}
      onclick={handleSignOut}
      primary
    />
  );
}

export default SignoutBtn;
