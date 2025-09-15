export default function Home() {
  return (
    <div>
      <div className="text-center py-10 space-y-8">
        <h1 className="text-5xl text-slate-500 font-extrabold mb-6 dark:text-slate-200">Welcome to The Race Shop</h1>

        <p className="text-lg text-slate-500 max-w-2xl mx-auto dark:text-slate-400">
          Professional car services including tuning, oil changes,
          track inspection, alignments, suspension setups, and more.
        </p>

        <div className="mt-10">
          <a
            href="/services"
            className="px-6 py-3 bg-rose-250 text-white rounded-lg hover:bg-blue-700 transition"
          >
            View Our Services
          </a>
        </div>
      </div>
    </div>
  );
}
