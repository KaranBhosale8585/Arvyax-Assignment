import Link from "next/link";
import { Sparkles, Github, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-4 flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-white font-semibold">
          <Sparkles size={18} />
          Arvyax AI
        </div>

        <div className="flex items-center gap-6 text-sm">
          <Link href="/" className="hover:text-white">
            Home
          </Link>

          <Link href="/ai-history" className="hover:text-white">
            AI History
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <a
            href="https://github.com/KaranBhosale8585"
            className="hover:text-white"
          >
            <Github size={18} />
          </a>

          <a
            href="mailto:karanbhosale8586@email.com"
            className="hover:text-white"
          >
            <Mail size={18} />
          </a>
        </div>
      </div>

      <div className="text-center text-xs text-gray-500 pb-3">
        © {new Date().getFullYear()} Arvyax AI Assignment | Built by Karan
        Bhosale
      </div>
    </footer>
  );
}
