import React, { useState, useEffect, useCallback, memo } from "react";
import {
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  Sparkles,
} from "lucide-react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import AOS from "aos";
import "aos/dist/aos.css";
import { useNavigate } from 'react-router-dom';

// Memoized Components
const StatusBadge = memo(() => (
  <div
    className="inline-block animate-float lg:mx-0"
    data-aos="zoom-in"
    data-aos-delay="400"
  >
    <div className="relative group">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-[#6366f1] to-[#a855f7] rounded-full blur opacity-20 group-hover:opacity-30 transition duration-1000"></div>
      <div className="relative px-3 sm:px-4 py-2 rounded-full bg-white shadow-sm border border-gray-100">
        <span className="text-gradient sm:text-sm text-[0.7rem] font-medium flex items-center">
          <Sparkles className="sm:w-4 sm:h-4 w-3 h-3 mr-2 text-indigo-500" />
          Ready to Innovate
        </span>
      </div>
    </div>
  </div>
));

const MainTitle = memo(() => (
  <div className="space-y-2" data-aos="fade-up" data-aos-delay="600">
    <h1 className="text-5xl sm:text-6xl md:text-6xl lg:text-6xl xl:text-7xl font-bold tracking-tight text-gray-900">
      <span className="relative inline-block">
        <span className="absolute -inset-2 bg-gradient-to-r from-[#6366f1]/50 to-[#a855f7]/50 blur-3xl opacity-10"></span>
        <span className="relative text-gray-800"> 
          Dr. Suresh
        </span>
      </span>
      <br />
      <span className="relative inline-block mt-2">
        <span className="absolute -inset-2 bg-gradient-to-r from-[#6366f1]/50 to-[#a855f7]/50 blur-3xl opacity-15"></span>
        <span className="relative text-gradient">
          Kumar S
        </span>
      </span>
    </h1>
  </div>
));

const TechStack = memo(({ tech }) => (
  <div className="px-4 py-2 hidden sm:block rounded-full bg-gray-100 border border-gray-200 text-sm text-gray-600 hover:bg-gray-200 hover:border-gray-300 transition-colors">
    {tech}
  </div>
));

const CTAButton = memo(({ href, text, icon: Icon, onClick }) => (
  <button 
    onClick={onClick}
    className="group relative w-[160px]"
  >
    <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl opacity-40 blur group-hover:opacity-60 transition-all duration-700"></div>
    <div className="relative h-11 bg-white rounded-lg border border-gray-200 leading-none overflow-hidden shadow-sm hover:border-gray-300 transition">
      <div className="absolute inset-0 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 bg-gradient-to-r from-indigo-500/10 to-purple-500/10"></div>
      <span className="absolute inset-0 flex items-center justify-center gap-2 text-sm group-hover:gap-3 transition-all duration-300">
        <span className="text-gray-700 font-medium z-10 group-hover:text-indigo-700 transition">
          {text}
        </span>
        <Icon
          className={`w-4 h-4 text-gray-500 group-hover:text-indigo-600 ${
            text === "Contact"
              ? "group-hover:translate-x-1"
              : "group-hover:rotate-45"
          } transform transition-all duration-300 z-10`}
        />
      </span>
    </div>
  </button>
));

const SocialLink = memo(({ icon: Icon, link }) => (
  <a href={link} target="_blank" rel="noopener noreferrer">
    <button className="group relative p-3">
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl blur opacity-10 group-hover:opacity-20 transition duration-300"></div>
      <div className="relative rounded-xl bg-white p-2 flex items-center justify-center border border-gray-200 shadow-sm group-hover:border-gray-300 group-hover:bg-gray-50 transition-all duration-300">
        <Icon className="w-5 h-5 text-gray-500 group-hover:text-indigo-600 transition-colors" />
      </div>
    </button>
  </a>
));

// Constants
const TYPING_SPEED = 100;
const ERASING_SPEED = 50;
const PAUSE_DURATION = 2000;
const WORDS = ["Professor", "Researcher", "Tech Enthusiast"];
const TECH_STACK = ["Machine Learning", "Deep Learning", "IoT", "Cloud Computing"];
const SOCIAL_LINKS = [
  { icon: Github, link: "https://github.com/sureshkumars1975" },
  { icon: Linkedin, link: "https://www.linkedin.com/in/suresh-kumar-s-srinivasan-b5a7b435/" },
  { icon: Mail, link: "mailto:sureshkumar.s@rajalakshmi.edu.in" },
];

const Home = () => {
  const [text, setText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const navigate = useNavigate();

  // Optimize AOS initialization
  useEffect(() => {
    const initAOS = () => {
      AOS.init({
        once: true,
        offset: 10,
      });
    };

    initAOS();
    window.addEventListener("resize", initAOS);
    return () => window.removeEventListener("resize", initAOS);
  }, []);

  useEffect(() => {
    setIsLoaded(true);
    return () => setIsLoaded(false);
  }, []);

  // Optimize typing effect
  const handleTyping = useCallback(() => {
    if (isTyping) {
      if (charIndex < WORDS[wordIndex].length) {
        setText((prev) => prev + WORDS[wordIndex][charIndex]);
        setCharIndex((prev) => prev + 1);
      } else {
        setTimeout(() => setIsTyping(false), PAUSE_DURATION);
      }
    } else {
      if (charIndex > 0) {
        setText((prev) => prev.slice(0, -1));
        setCharIndex((prev) => prev - 1);
      } else {
        setWordIndex((prev) => (prev + 1) % WORDS.length);
        setIsTyping(true);
      }
    }
  }, [charIndex, isTyping, wordIndex]);

  useEffect(() => {
    const timeout = setTimeout(
      handleTyping,
      isTyping ? TYPING_SPEED : ERASING_SPEED
    );
    return () => clearTimeout(timeout);
  }, [handleTyping]);

  // Lottie configuration - Background adjusted for light theme
  const lottieOptions = {
    src: "https://lottie.host/58753882-bb6a-49f5-a2c0-950eda1e135a/NLbpVqGegK.lottie",
    loop: true,
    autoplay: true,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
      progressiveLoad: true,
    },
    style: { width: "100%", height: "100%" },
    className: `w-full h-full transition-all duration-500 ${
      isHovering
        ? "scale-[105%]" // Simpler scale effect
        : "scale-[100%]"
    }`,
  };

  return (
    <div 
      className="min-h-screen flex flex-col justify-center bg-gray-50 text-gray-800"
      id="Home"
    >
      <div className="ml-2 sm:ml-4">
        <div
          className={`relative z-10 transition-all duration-1000 ${
            isLoaded ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="container mx-auto px-[5%] sm:px-6 lg:px-[5%] min-h-screen">
            <div className="flex flex-col lg:flex-row items-center justify-center h-screen md:justify-between gap-8 sm:gap-12 lg:gap-20">
              {/* Left Column */}
              <div
                className="w-full lg:w-1/2 space-y-6 sm:space-y-8 text-left lg:text-left order-1 lg:order-1 lg:mt-0"
                data-aos="fade-right"
                data-aos-delay="200"
              >
                <div className="space-y-4 sm:space-y-6">
                  <StatusBadge />
                  <MainTitle />

                  {/* Typing Effect - Adjusted text color */}
                  <div
                    className="h-8 flex items-center"
                    data-aos="fade-up"
                    data-aos-delay="800"
                  >
                    <span className="text-xl md:text-2xl text-gray-600 font-light">
                      {text}
                    </span>
                    <span className="w-[3px] h-6 ml-1 animate-blink"></span> {/* Cursor color updated via index.css */}
                  </div>

                  {/* Description - Adjusted text color */}
                  <p
                    className="text-base md:text-lg text-gray-600 max-w-xl leading-relaxed font-light"
                    data-aos="fade-up"
                    data-aos-delay="1000"
                  >
                    Professor and Researcher with expertise in Machine Learning, Deep Learning, and IoT. 
                    Dedicated to advancing technology through research and education.
                  </p>

                  {/* Tech Stack - Updated styles */}
                  <div
                    className="flex flex-wrap gap-3 justify-start"
                    data-aos="fade-up"
                    data-aos-delay="1200"
                  >
                    {TECH_STACK.map((tech, index) => (
                      <TechStack key={index} tech={tech} />
                    ))}
                  </div>

                  {/* CTA Buttons - Updated styles */}
                  <div
                    className="flex flex-row gap-3 w-full justify-start"
                    data-aos="fade-up"
                    data-aos-delay="1400"
                  >
                    <CTAButton
                      text="Publications"
                      icon={ExternalLink}
                      onClick={() => navigate('/publications')}
                    />
                    <CTAButton 
                      text="Contact" 
                      icon={Mail}
                      onClick={() => {
                        const contactSection = document.getElementById('Contact');
                        if (contactSection) {
                          contactSection.scrollIntoView({ behavior: 'smooth' });
                        } else {
                          navigate('/#Contact');
                        }
                      }}
                    />
                  </div>

                  {/* Social Links - Updated styles */}
                  <div
                    className="hidden sm:flex gap-4 justify-start"
                    data-aos="fade-up"
                    data-aos-delay="1600"
                  >
                    {SOCIAL_LINKS.map((social, index) => (
                      <SocialLink key={index} {...social} />
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column - Optimized Lottie Animation - Updated styles */}
              <div
                className="w-full py-[10%] sm:py-0 lg:w-1/2 h-auto lg:h-[600px] xl:h-[750px] relative flex items-center justify-center order-2 lg:order-2 mt-8 lg:mt-0"
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
                data-aos="fade-left"
                data-aos-delay="600"
              >
                <div className="relative w-full opacity-100">
                  {/* Subtle background blur effect */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-3xl blur-2xl transition-all duration-700 ease-in-out ${
                      isHovering ? "opacity-30 scale-105" : "opacity-20 scale-100"
                    }`}
                  ></div>

                  {/* Lottie container */}
                  <div
                    className={`relative z-10 w-full transform transition-transform duration-500 ${
                      isHovering ? "scale-105" : "scale-100" 
                    }`}
                  >
                    <DotLottieReact {...lottieOptions} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(Home);
