import React from "react";

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 text-sm text-gray-600 mt-16 w-full">
      <div className="flex flex-col md:flex-row justify-between items-center px-4 py-6 w-full max-w-screen-xl mx-auto">
        {/* Left: Call to Action */}
        <div className="w-full md:w-1/2 flex flex-col items-start gap-2">
          <h3 className="text-base font-semibold text-gray-800 mb-2">
            Stay in the loop with the latest updates
          </h3>
          <form className="flex gap-2 w-full max-w-xs">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#6A38C2]"
            />
            <button
              type="submit"
              className="bg-[#6A38C2] text-white px-4 py-2 rounded-md hover:bg-[#5b30a6] transition"
            >
              Subscribe
            </button>
          </form>
        </div>

        {/* Right: Links + Socials */}
        <div className="w-full md:w-1/2 flex flex-col items-end gap-2 mt-6 md:mt-0">
          <div className="flex gap-4 mb-2">
            <a href="/jobs" className="hover:text-[#6A38C2]">
              Jobs
            </a>
            <a href="/about" className="hover:text-[#6A38C2]">
              About
            </a>
            <a href="/contact" className="hover:text-[#6A38C2]">
              Contact
            </a>
          </div>

          <div className="flex gap-4">
            <a href="https://facebook.com" target="_blank" rel="noreferrer">
              <img
                src="https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/facebook.svg"
                alt="Facebook"
                className="w-4 h-4 hover:opacity-70"
              />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer">
              <img
                src="https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/twitter.svg"
                alt="Twitter"
                className="w-4 h-4 hover:opacity-70"
              />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer">
              <img
                src="https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/linkedin.svg"
                alt="LinkedIn"
                className="w-4 h-4 hover:opacity-70"
              />
            </a>
          </div>

          <p className="text-xs text-gray-400 mt-2">
            © 2024 SkillSphere. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
