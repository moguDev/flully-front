"use client";
import React from "react";

const GOOGLE_LOGIN_URL = `${process.env.NEXT_PUBLIC_API_URL}/auth/google_oauth2`;

export const GoogleLoginButton: React.FC = () => {
  return (
    <a href={GOOGLE_LOGIN_URL}>
      <button className="bg-blue-500 text-white px-4 py-2 rounded">
        Sign in with Google
      </button>
    </a>
  );
};
