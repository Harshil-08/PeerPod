import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export const Welcome = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative w-full min-h-screen overflow-hidden bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
      <div className="absolute inset-0 bg-black opacity-10 z-0"></div>
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='4' height='4' viewBox='0 0 4 4'%3E%3Cpath fill='%23ffffff' fill-opacity='0.4' d='M1 3h1v1H1V3zm2-2h1v1H3V1z'%3E%3C/path%3E%3C/svg%3E")`,
        }}
      ></div>
      <div className="relative container mx-auto px-6 py-12 md:py-24 lg:py-32  z-10">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-8 items-center">
          <div
            className={`space-y-8 ${
              isVisible ? "animate-fade-in-up" : "opacity-0"
            }`}
          >
            <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight">
              PeerPod
            </h1>
            <h1 className="text-2xl md:text-4xl font-extrabold text-white leading-tight">
              Connect. Collaborate.
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">
                Elevate.
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-white/80 max-w-2xl">
              Join our next-gen community platform where ideas flourish,
              connections thrive, and communication knows no bounds.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to={"/login"}
                className="px-8 py-4 bg-white text-purple-600 rounded-full font-bold text-lg transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 shadow-lg"
              >
                Register
              </Link>
              <Link
                to={"/chat"}
                className="px-8 py-4 bg-purple-800/20 text-white rounded-full font-bold text-lg transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50 shadow-lg"
              >
                Start Chatting
              </Link>
            </div>
          </div>
          <div
            className={`relative ${isVisible ? "animate-float" : "opacity-0"}`}
          >
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-yellow-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-indigo-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
            <div className="relative bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-2xl p-4 shadow-2xl">
              <img
                src="peerpod-alumni-chat.png"
                className="w-full h-auto rounded-md"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
