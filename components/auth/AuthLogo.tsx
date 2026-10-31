import Link from "next/link";

export default function AuthLogo() {
  return (
    <Link href="/" className="inline-flex items-center gap-2">
      <span className="w-7 h-7 rounded-full bg-gradient-to-br from-[#9FD8F5] to-[#D4FA70]" />
      <span className="text-[#3B6FA3] font-semibold text-lg">Rangkul</span>
    </Link>
  );
}