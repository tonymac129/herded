"use client";

import { signOut } from "next-auth/react";
import Btn from "@/components/ui/Btn";

type DeleteBtnProps = {
  deleteAccount: (email: string) => Promise<void>;
  email: string;
};

function DeleteBtn({ deleteAccount, email }: DeleteBtnProps) {
  function handleDeleteAccount() {
    if (
      confirm(
        "Are you sure you want to delete your Herded account? This action cannot be undone and will not delete the quizzes you've created.",
      )
    ) {
      deleteAccount(email);
      signOut();
    }
  }

  return <Btn text="Delete account" onclick={handleDeleteAccount} />;
}

export default DeleteBtn;
