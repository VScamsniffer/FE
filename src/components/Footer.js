import React from "react";

export default function Footer() {
  return (
    <footer className="w-full bg-gray-900 text-white text-center p-3 text-sm">
      © {new Date().getFullYear()} vScamSniffer. All rights reserved.
    </footer>
  );
}
