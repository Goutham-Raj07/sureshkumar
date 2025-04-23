import React from "react";
import {
  Linkedin,
  Github,
  Instagram,
  Youtube,
  ExternalLink
} from "lucide-react";

const socialLinks = [
  {
    name: "LinkedIn",
    displayName: "Let's Connect on LinkedIn",
    subText: "@suresh-kumar-s-srinivasan",
    icon: Linkedin,
    url: "https://www.linkedin.com/in/suresh-kumar-s-srinivasan-b5a7b435/",
    color: "#0A66C2",
    gradient: "from-[#0A66C2] to-[#0077B5]",
    isPrimary: true
  },
  {
    name: "Instagram",
    displayName: "Instagram",
    subText: "@suresh_.nalini",
    icon: Instagram,
    url: "https://www.instagram.com/suresh_.nalini?igsh=MXg2azNtZHl2ajhh",
    color: "#E4405F",
    gradient: "from-[#833AB4] via-[#E4405F] to-[#FCAF45]"
  },
  {
    name: "GitHub",
    displayName: "Github",
    subText: "@sureshkumar-s",
    icon: Github,
    url: "https://github.com/sureshkumars1975",
    color: "#333",
    gradient: "from-[#f0f0f0] to-[#e0e0e0]"
  }
];

const SocialLinks = () => {
  const linkedIn = socialLinks.find(link => link.isPrimary);
  const otherLinks = socialLinks.filter(link => !link.isPrimary);
  const [instagram, github] = otherLinks;

  return (
    <div className="w-full bg-white rounded-2xl p-6 py-8 shadow-sm border border-gray-100">
      <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
        <span className="inline-block w-8 h-1 bg-indigo-500 rounded-full"></span>
        Connect With Me
      </h3>

      <div className="flex flex-col gap-4">
        {/* LinkedIn - Primary Row */}
        <a
          href={linkedIn.url}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative flex items-center justify-between p-4 rounded-lg 
                     bg-gray-50 border border-gray-200 overflow-hidden
                     hover:border-indigo-300 hover:bg-indigo-50 transition-all duration-300"
        >
          <div 
            className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500
                       bg-gradient-to-r ${linkedIn.gradient}`}
          />
          
          <div className="relative flex items-center gap-4">
            <div className="relative flex items-center justify-center p-2 bg-white rounded-md shadow-sm border border-gray-100 group-hover:border-indigo-200 transition">
              <linkedIn.icon
                className="w-6 h-6 transition-all duration-300 group-hover:scale-105"
                style={{ color: linkedIn.color }}
              />
            </div>

            <div className="flex flex-col">
              <span className="text-base font-semibold pt-[0.1rem] text-gray-800 tracking-tight leading-none group-hover:text-indigo-700 transition-colors duration-300">
                {linkedIn.displayName}
              </span>
              <span className="text-sm text-gray-500 group-hover:text-gray-600 transition-colors duration-300">
                {linkedIn.subText}
              </span>
            </div>
          </div>

          <ExternalLink 
            className="relative w-5 h-5 text-gray-400 group-hover:text-indigo-500
                       opacity-50 group-hover:opacity-100 transition-all duration-300
                       transform group-hover:translate-x-0 translate-x-1"
          />

          <div 
            className="absolute inset-0 opacity-0 group-hover:opacity-10 pointer-events-none overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/5 to-transparent
                          translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
          </div>
        </a>


        {/* Second Row - Instagram & GitHub */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[instagram, github].map((link) => (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex items-center gap-3 p-4 rounded-xl 
                       bg-gray-50 border border-gray-200 overflow-hidden
                       hover:border-gray-300 hover:bg-gray-100 transition-all duration-300"
            >
              <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500
                             bg-gradient-to-r ${link.gradient}`} />
              
              <div className="relative flex items-center justify-center p-2 bg-white rounded-lg shadow-sm border border-gray-100 group-hover:border-gray-200 transition">
                 <link.icon
                    className="w-5 h-5 transition-all duration-300 group-hover:scale-110"
                    style={{ color: link.color }}
                  />
              </div>

              <div className="flex flex-col min-w-0">
                <span className="text-sm font-semibold text-gray-700 group-hover:text-gray-900 transition-colors duration-300">
                  {link.displayName}
                </span>
                <span className="text-xs text-gray-500 truncate group-hover:text-gray-600 transition-colors duration-300">
                  {link.subText}
                </span>
              </div>
              
              <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-gray-600 ml-auto
                                     opacity-50 group-hover:opacity-100 transition-all duration-300
                                     transform group-hover:translate-x-0 translate-x-1" />

              <div className="absolute inset-0 opacity-0 group-hover:opacity-10 pointer-events-none overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/5 to-transparent
                              translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SocialLinks;