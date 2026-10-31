export default function Footer() {
  return (
    <footer className="w-full bg-[#D4FA70] py-16 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center gap-5">
        <span className="text-[#3B6FA3] font-medium text-lg">Supported By</span>

        {/* Placeholder Logo Institusi (RSUCM) */}
        <div className="w-20 h-20 bg-[#113B6B] rounded-full flex items-center justify-center shadow-md">
          <span className="text-white font-bold italic text-xl">RSUCM</span>
        </div>
      </div>
    </footer>
  );
}