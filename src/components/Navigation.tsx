"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

// Navigation component
const Navigation = () => {
  const pathname = usePathname();

  return (
    <nav className="bg-slate-800 p-10">
      <ul className="flex justify-end space-x-2">
        <li>
          <Link
            className={`${
              pathname === "/" ? "bg-slate-400" : "link"
            } rounded-lg px-2 py-2`}
            href="/"
          >
            Activities
          </Link>
        </li>
        <li>
          <Link
            className={`${
              pathname === "/summary" ? "bg-slate-400" : "link"
            } rounded-lg px-2 py-2`}
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
