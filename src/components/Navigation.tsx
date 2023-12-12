"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

// Navigation component
const Navigation = () => {
  const pathname = usePathname();

  return (
    <nav className="bg-slate-800 p-4">
      <ul className="flex justify-center space-x-4">
        <li>
          <Link
            className={`${
              pathname === "/" ? "bg-slate-400" : "link"
            } px-4 py-2 rounded-sm transition duration-300 hover:bg-slate-400 hover:text-gray-900`}
            href="/"
          >
            Activities
          </Link>
        </li>
        <li>
          <Link
            className={`${
              pathname === "/summary" ? "bg-slate-400" : "link"
            } px-4 py-2 rounded-sm transition duration-300 hover:bg-slate-400 hover:text-gray-900`}
            href="/summary"
          >
            Summary
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
