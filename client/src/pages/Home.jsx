export default function Home() {
  return (
    <div className="bg-slate-50 dark:bg-slate-650">
      <div className="w-full h-40 sm:h-48 md:h-96 bg-slate-900 dark:bg-slate-700 shadow-md"></div>

      <div className="px-3 sm:px-6 md:px-8 lg:px-12 py-6 sm:py-10 max-w-3xl mx-auto space-y-5 sm:space-y-8 text-center">
        <h1 className="text-2xl sm:text-3xl md:text-5xl font-extrabold text-slate-500 dark:text-slate-200">
          Welcome to The Shop
        </h1>

        <p className="text-sm sm:text-base sm:text-lg text-slate-500 dark:text-slate-400">
          Professional car services including tuning, oil changes, track inspection,
          alignments, suspension setups, and more.
        </p>

        <a
          href="/services"
          className="inline-block px-4 sm:px-6 py-2 sm:py-3 bg-rose-250 text-white rounded-lg hover:bg-rose-400 transition"
        >
          View Our Services
        </a>
      </div>
    </div>
  );
}
