"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, LogOut, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    try {
      setLoading(true);

      const res = await fetch("/api/logout", {
        method: "POST",
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Logout failed. Please try again.");
        throw new Error(data.message || "Logout failed");
      }

      if (res.ok) {
        toast.success(data.message || "Logged out successfully.");
        router.push("/login");
      }
    } catch (err) {
      toast.error("Logout failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <header className="w-full bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-4 flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2 text-xl font-bold text-green-700"
        >
          <Sparkles size={22} />
          Arvyax AI
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-gray-700 font-medium">

          <Link href="/ai-history" className="hover:text-green-600 transition">
            AI History
          </Link>
        </nav>

        <div className="hidden md:block">
          <button
            onClick={handleLogout}
            disabled={loading}
            className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
          >
            <LogOut size={18} />
            {loading ? "Logging out..." : "Logout"}
          </button>
        </div>

        <button className="md:hidden" onClick={() => setOpen(!open)}>
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t bg-white">
          <div className="flex flex-col px-6 py-4 gap-4 text-gray-700">

            <Link
              href="/ai-history"
              onClick={() => setOpen(false)}
              className="hover:text-green-600"
            >
              AI History
            </Link>

            <button
              onClick={handleLogout}
              className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg w-fit"
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
