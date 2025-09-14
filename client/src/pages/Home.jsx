export default function Home() {
  return (
    <div>
      <div className="text-center py-10 space-y-8">
        <h1 className="text-5xl font-extrabold mb-6">Welcome to The Race Shop</h1>

        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Professional car services including tuning, oil changes,
          track inspection, alignments, suspension setups, and more.
        </p>

        <div className="mt-10">
          <a
            href="/services"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            View Our Services
          </a>
        </div>
      </div>
    </div>
  );
}
