import React from "react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-3 text-center text-sm">
      © {new Date().getFullYear()} vScamSniffer. All rights reserved.
    </footer>
  );
}
