export default function Home() {
  return (
    <div className="bg-gray-50 dark:bg-slate-650">
      <div className="w-full h-84 md:h-96 bg-slate-900 dark:bg-slate-700 shadow-md min-h-[20rem] md:min-h-[24rem]"></div>

      <div className="px-4 md:px-8 lg:px-12 py-10 max-w-3xl mx-auto space-y-8">
        <h1 className="text-5xl font-extrabold text-slate-500 dark:text-slate-200">
          Welcome to The Race Shop
        </h1>

        <p className="text-lg text-slate-500 dark:text-slate-400">
          Professional car services including tuning, oil changes, track inspection,
          alignments, suspension setups, and more.
        </p>

        <a
          href="/services"
          className="inline-block px-6 py-3 bg-rose-250 text-white rounded-lg hover:bg-rose-400 transition"
        >
          View Our Services
        </a>
      </div>
    </div>
  );
}
