"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { FaSignOutAlt } from "react-icons/fa";

export const LoginStatus = () => {
  const { data, status } = useSession();
  if (status === "loading") return <div>loading...</div>;
  if (status === "unauthenticated") {
    return (
      <div>
        <button
          onClick={() => signIn("discord")}
          className="rounded border border-white p-3"
        >
          Sign in with Discord
        </button>
      </div>
    );
  }
  return (
    <div className="flex gap-3 items-center">
      User: <strong>{data?.user.name}</strong>
      <button
        onClick={() => signOut()}
        className="flex items-center rounded border border-white p-3 bg-red-500 text-white hover:bg-red-600 transition duration-300"
      >
        <FaSignOutAlt className="mr-2" /> Sign out
      </button>
    </div>
  );
};
