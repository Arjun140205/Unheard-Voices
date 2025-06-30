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
              In this sanctuary of anonymity, every whisper finds its echo. Here, stories are not measured by the fame of their teller, but by the truth they carry.
            </p>
            <div className="flex flex-col items-center sm:flex-row sm:space-x-4 space-y-3 sm:space-y-0 w-full max-w-xs sm:max-w-none mx-auto justify-center mt-4">
              <a
                href="/explore"
                className="inline-block max-w-[220px] sm:w-auto bg-white text-[#292929] px-5 py-2 sm:px-8 sm:py-3 rounded-full text-base sm:text-lg font-medium hover:bg-gray-100 transition text-center border-2 border-[#e7c77f] shadow-sm"
              >
                Start reading
              </a>
              <a
                href="/write"
                className="inline-block max-w-[220px] sm:w-auto bg-white text-[#292929] px-5 py-2 sm:px-8 sm:py-3 rounded-full text-base sm:text-lg font-medium hover:bg-gray-100 transition text-center border-2 border-[#e7c77f] shadow-sm"
              >
                Start writing
              </a>
            </div>
          </div>
        </div>

        {/* Featured Section */}
        <div className="max-w-7xl mx-auto px-6 py-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300">
              <h3 className="font-bold text-xl mb-4">Whispers from Within</h3>
              <p className="text-gray-600">Curated stories that resonate with the soul—each one a testament to the courage of anonymous expression and the beauty of unfiltered truth.</p>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300">
              <h3 className="font-bold text-xl mb-4">Voices in the Dark</h3>
              <p className="text-gray-600">Journey into the depths of human experience through stories that speak to the heart, written by souls who understand the power of vulnerability.</p>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300">
              <h3 className="font-bold text-xl mb-4">Stories That Matter</h3>
              <p className="text-gray-600">From the quiet corners of the mind to the universal truths that bind us all, explore narratives that illuminate the human condition in its most authentic form.</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
