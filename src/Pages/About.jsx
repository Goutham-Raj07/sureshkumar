import React, { useEffect, memo, useMemo } from "react";
import {
  FileText,
  Code,
  Award,
  Globe,
  ArrowUpRight,
  Sparkles,
  UserCheck,
} from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";
import { useNavigate } from 'react-router-dom';

// Memoized Components
const Header = memo(() => (
  <div className="text-center lg:mb-8 mb-2 px-[5%]">
    <div className="inline-block relative group">
      <h2
        className="text-4xl md:text-5xl font-bold text-gradient"
        data-aos="zoom-in-up"
        data-aos-duration="600"
      >
        About Me
      </h2>
    </div>
    <p
      className="mt-2 text-gray-600 max-w-2xl mx-auto text-base sm:text-lg flex items-center justify-center gap-2"
      data-aos="zoom-in-up"
      data-aos-duration="800"
    >
      <Sparkles className="w-5 h-5 text-purple-500" />
      Transforming ideas into digital experiences
      <Sparkles className="w-5 h-5 text-purple-500" />
    </p>
  </div>
));

const ProfileImage = memo(() => (
  <div className="flex justify-center lg:justify-end items-center sm:p-12 sm:py-0 sm:pb-0 p-0 py-2 pb-2">
    <div className="relative group" data-aos="fade-up" data-aos-duration="1000">
      <div className="absolute -inset-6 opacity-10 z-0 hidden sm:block">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-200 to-purple-200 rounded-full blur-3xl animate-pulse-slow" />
      </div>
      <div className="relative">
        <div className="w-72 h-72 sm:w-80 sm:h-80 rounded-full overflow-hidden shadow-lg border-4 border-white transform transition-all duration-700 group-hover:scale-105">
          <div className="absolute inset-0 border-4 border-indigo-100/50 rounded-full z-20 transition-all duration-700 group-hover:border-indigo-200/80 group-hover:scale-105 pointer-events-none" />

          <img
            src="/suresh.jpg"
            alt="Profile"
            className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:rotate-1"
            loading="lazy"
          />

          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-700 z-20 hidden sm:block pointer-events-none">
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/30 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
          </div>
        </div>
      </div>
    </div>
  </div>
));

const StatCard = memo(
  ({ icon: Icon, color, value, label, description, animation, onClick }) => (
    <div
      data-aos={animation}
      data-aos-duration={1300}
      className={`relative group ${onClick ? 'cursor-pointer' : ''}`}
      onClick={onClick}
    >
      <div className="relative z-10 bg-white rounded-2xl p-6 border border-gray-200 overflow-hidden transition-all duration-300 hover:scale-[1.03] hover:shadow-lg hover:border-gray-300 h-full flex flex-col justify-between">
        <div
          className={`absolute -z-10 inset-0 bg-gradient-to-br ${color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
        ></div>

        <div className="flex items-center justify-between mb-4">
          <div className="w-16 h-16 rounded-full flex items-center justify-center bg-indigo-50 border border-indigo-100 transition-transform group-hover:rotate-6">
            <Icon className="w-8 h-8 text-indigo-600" />
          </div>
          <span
            className="text-4xl font-bold text-gray-800"
            data-aos="fade-up-left"
            data-aos-duration="1500"
            data-aos-anchor-placement="top-bottom"
          >
            {value}
          </span>
        </div>

        <div>
          <p
            className="text-sm uppercase tracking-wider text-gray-500 mb-2"
            data-aos="fade-up"
            data-aos-duration="800"
            data-aos-anchor-placement="top-bottom"
          >
            {label}
          </p>
          <div className="flex items-center justify-between">
            <p
              className="text-xs text-gray-500"
              data-aos="fade-up"
              data-aos-duration="1000"
              data-aos-anchor-placement="top-bottom"
            >
              {description}
            </p>
            <ArrowUpRight className="w-4 h-4 text-gray-400 group-hover:text-indigo-600 transition-colors" />
          </div>
        </div>
      </div>
    </div>
  )
);

const EducationCard = memo(({ year, degree, institution }) => (
  <div 
    className="relative p-6 bg-white rounded-2xl border border-gray-200 transition-all duration-300 hover:scale-[1.03] hover:shadow-md hover:border-gray-300"
    data-aos="fade-up"
  >
    <div className="text-indigo-600 text-sm font-semibold mb-2">{year}</div>
    <h3 className="text-gray-800 text-lg font-semibold mb-1">{degree}</h3>
    <p className="text-gray-600">{institution}</p>
  </div>
));

const ExperienceCard = memo(({ period, position, institution }) => (
  <div 
    className="relative p-6 bg-white rounded-2xl border border-gray-200 transition-all duration-300 hover:scale-[1.03] hover:shadow-md hover:border-gray-300"
    data-aos="fade-up"
  >
    <div className="text-indigo-600 text-sm font-semibold mb-2">{period}</div>
    <h3 className="text-gray-800 text-lg font-semibold mb-1">{position}</h3>
    <p className="text-gray-600">{institution}</p>
  </div>
));

const educationData = [
  {
    year: "1999",
    degree: "BE Computer Science and Engineering",
    institution: "Priyadarshini Engineering College"
  },
  {
    year: "2008",
    degree: "ME Computer Science and Engineering",
    institution: "Rajalakshmi Engineering College"
  }
];

const experienceData = [
  {
    period: "2008 - 2021",
    position: "Associate Professor",
    institution: "Rajalakshmi Engineering College (Autonomous)"
  },
  {
    period: "2005 - 2006",
    position: "Senior Lecturer",
    institution: "Rajalakshmi Engineering College (Autonomous)"
  },
  {
    period: "2002 - 2005",
    position: "Lecturer",
    institution: "Prathyusha Engineering College (Autonomous)"
  },
  {
    period: "2001 - 2002",
    position: "Lecturer",
    institution: "Sree Sastha College of Engineering"
  }
];

const skillsData = [
  "Machine Learning",
  "Deep Learning",
  "IoT",
  "Cloud Computing",
  "React",
  "HTML 5",
  "CSS 3",
  "Javascript"
];

const AboutPage = () => {
  const navigate = useNavigate();

  const { totalPublications, totalCertificates, YearExperience } = useMemo(() => {
    const storedPublications = 8;
    const storedCertificates = 9;

    return {
      totalPublications: storedPublications,
      totalCertificates: storedCertificates,
      YearExperience: 20,
    };
  }, []);

  useEffect(() => {
    const initAOS = () => {
      AOS.init({
        once: false,
      });
    };

    initAOS();

    let resizeTimer;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(initAOS, 250);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(resizeTimer);
    };
  }, []);

  const statsData = useMemo(
    () => [
      {
        icon: Code,
        color: "from-[#6366f1] to-[#a855f7]",
        value: totalPublications,
        label: "Publications",
        description: "Research papers published",
        animation: "fade-right",
        onClick: () => navigate('/publications')
      },
      {
        icon: Award,
        color: "from-[#a855f7] to-[#6366f1]",
        value: totalCertificates,
        label: "Certificates",
        description: "Professional achievements",
        animation: "fade-up",
        onClick: () => navigate('/certificates')
      },
      {
        icon: Globe,
        color: "from-[#6366f1] to-[#a855f7]",
        value: `${YearExperience}+`,
        label: "Years of Experience",
        description: "In academia and research",
        animation: "fade-left",
      },
    ],
    [totalPublications, totalCertificates, YearExperience, navigate]
  );

  return (
    <div
      className="h-auto pb-[10%] text-gray-800 overflow-hidden px-[5%] sm:px-[5%] lg:px-[10%] pt-20 bg-gray-50"
      id="About"
    >
      <Header />

      <div className="w-full mx-auto relative">
        <div className="flex flex-col-reverse lg:grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div className="space-y-6 text-center lg:text-left">
            <h2
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800"
              data-aos="fade-right"
              data-aos-duration="1000"
            >
              <span className="text-gradient">
                Hello, I'm
              </span>
              <span
                className="block mt-2 text-gray-800"
                data-aos="fade-right"
                data-aos-duration="1300"
              >
                Suresh Kumar S
              </span>
            </h2>

            <p
              className="text-base sm:text-lg lg:text-xl text-gray-600 leading-relaxed lg:leading-loose text-justify pb-4 sm:pb-0"
              data-aos="fade-right"
              data-aos-duration="1500"
            >
              Professor and Researcher with over 20 years of experience in Computer Science and Engineering. 
              Specializing in Machine Learning, Deep Learning, and IoT, dedicated to advancing technology through research and education.
            </p>

            <div className="flex flex-col lg:flex-row items-center lg:items-start gap-4 lg:gap-4 lg:px-0 w-full">
              <a
                href="/CV SURESH KUMAR.pdf"
                download
                className="w-full lg:w-auto"
              >
                <button
                  data-aos="fade-up"
                  data-aos-duration="800"
                  className="w-full lg:w-auto sm:px-6 py-2 sm:py-3 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium transition-all duration-300 hover:scale-105 flex items-center justify-center lg:justify-start gap-2 shadow-md hover:shadow-lg"
                >
                  <FileText className="w-4 h-4 sm:w-5 sm:h-5" /> Download CV
                </button>
              </a>
              <button
                onClick={() => navigate('/publications')}
                data-aos="fade-up"
                data-aos-duration="1000"
                className="w-full lg:w-auto sm:px-6 py-2 sm:py-3 rounded-lg border border-indigo-500/50 text-indigo-600 font-medium transition-all duration-300 hover:scale-105 flex items-center justify-center lg:justify-start gap-2 hover:bg-indigo-500/10 hover:border-indigo-500"
              >
                <Code className="w-4 h-4 sm:w-5 sm:h-5" /> View Research Publications
              </button>
            </div>
          </div>

          <ProfileImage />
        </div>

        <div className="mt-16">
          <h3 className="text-2xl font-bold mb-6 text-gray-800">Education</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {educationData.map((edu, index) => (
              <EducationCard key={index} {...edu} />
            ))}
          </div>
        </div>

        <div className="mt-16">
          <h3 className="text-2xl font-bold mb-6 text-gray-800">Experience</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {experienceData.map((exp, index) => (
              <ExperienceCard key={index} {...exp} />
            ))}
          </div>
        </div>

        <div className="mt-16">
          <h3 className="text-2xl font-bold mb-6 text-gray-800">Skills</h3>
          <div className="flex flex-wrap gap-4">
            {skillsData.map((skill, index) => (
              <div 
                key={index}
                className="px-4 py-2 bg-white border border-gray-200 shadow-xs rounded-full text-gray-700 text-sm hover:bg-gray-100 transition-colors"
                data-aos="fade-up"
                data-aos-delay={index * 50}
              >
                {skill}
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
          {statsData.map((stat) => (
            <StatCard key={stat.label} {...stat} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default memo(AboutPage);
