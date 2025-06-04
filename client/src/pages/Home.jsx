import bgImage from "../assets/bg.jpg";

export default function Home() {
  return (
    <div className="font-serif text-[#292929] min-h-screen flex flex-col">
      {/* Hero Section */}
      <main className="relative">
        {/* Background Image Section */}
        <div className="relative h-[70vh] overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${bgImage})` }}
          >
            <div className="absolute inset-0 bg-black bg-opacity-50" />
          </div>
          <div className="relative z-10 h-full flex flex-col items-center justify-center text-white px-6">
            <h1 className="text-6xl font-dancing  mb-6 max-w-4xl text-center">
              You don't need a name to be heard.
            </h1>
            <p className="text-xl max-w-2xl text-center mb-8">
              Read and share ideas from independent voices, world-class publications, and experts from around the globe.
            </p>
            <div className="space-x-4">
              <a
                href="/explore"
                className="inline-block bg-white text-[#292929] px-8 py-3 rounded-full text-lg font-medium hover:bg-gray-100 transition"
              >
                Start reading
              </a>
              <a
                href="/write"
                className="inline-block bg-white text-[#292929] px-8 py-3 rounded-full text-lg font-medium hover:bg-gray-100 transition"
              >
                Start writing
              </a>
            </div>
          </div>
        </div>

        {/* Featured Section */}
        <div className="max-w-7xl mx-auto px-6 py-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-4">
              <h3 className="font-bold text-xl">Staff Picks</h3>
              <p className="text-gray-600">Stories selected by our editors, featuring unique perspectives and thoughtful analysis.</p>
            </div>
            <div className="space-y-4">
              <h3 className="font-bold text-xl">Member Features</h3>
              <p className="text-gray-600">Dive deep into expert insights and personal experiences from our community.</p>
            </div>
            <div className="space-y-4">
              <h3 className="font-bold text-xl">Topics that matter</h3>
              <p className="text-gray-600">Explore stories on culture, science, business, and more from voices that need to be heard.</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
