"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const Navigation = () => {
  const pathname = usePathname();

  return (
    <nav className="bg-gray-200 p-4 text-lg font-bold">
      <ul className="flex justify-center space-x-4">
        <li>
          <Link
            className={`${
              pathname === "/" ? "bg-gray-500 text-white" : "text-black"
            } px-4 py-2 rounded-sm transition duration-300 hover:bg-gray-500 hover:text-white`}
            href="/"
          >
            Activities
          </Link>
        </li>
        <li>
          <Link
            className={`${
              pathname === "/summary" ? "bg-gray-500 text-white" : "text-black"
            } px-4 py-2 rounded-sm transition duration-300 hover:bg-gray-500 hover:text-white`}
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
