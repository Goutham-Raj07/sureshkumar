import React, { useEffect, useState, useCallback, memo } from "react";
import { db, collection } from "../firebase";
import { getDocs } from "firebase/firestore";
import PropTypes from "prop-types";
import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import CardProject from "../components/CardProject";
import TechStackIcon from "../components/TechStackIcon";
import AOS from "aos";
import "aos/dist/aos.css";
import Certificate from "../components/Certificate";
import { Code, Award, Boxes, ArrowLeft } from "lucide-react";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { useNavigate } from 'react-router-dom';

// Separate ShowMore/ShowLess button component
const ToggleButton = ({ onClick, isShowingMore }) => (
  <button
    onClick={onClick}
    className="
      px-3 py-1.5
      text-slate-300 
      hover:text-white 
      text-sm 
      font-medium 
      transition-all 
      duration-300 
      ease-in-out
      flex 
      items-center 
      gap-2
      bg-white/5 
      hover:bg-white/10
      rounded-md
      border 
      border-white/10
      hover:border-white/20
      backdrop-blur-sm
      group
      relative
      overflow-hidden
    "
  >
    <span className="relative z-10 flex items-center gap-2">
      {isShowingMore ? "See Less" : "See More"}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`
          transition-transform 
          duration-300 
          ${isShowingMore ? "group-hover:-translate-y-0.5" : "group-hover:translate-y-0.5"}
        `}
      >
        <polyline points={isShowingMore ? "18 15 12 9 6 15" : "6 9 12 15 18 9"}></polyline>
      </svg>
    </span>
    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-500/50 transition-all duration-300 group-hover:w-full"></span>
  </button>
);

function TabPanel({ children, value, index, ...other }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: { xs: 1, sm: 3 } }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

const techStacks = [
  { icon: "html.svg", language: "HTML" },
  { icon: "css.svg", language: "CSS" },
  { icon: "javascript.svg", language: "JavaScript" },
  { icon: "tailwind.svg", language: "Tailwind CSS" },
  { icon: "reactjs.svg", language: "ReactJS" },
  { icon: "vite.svg", language: "Vite" },
  { icon: "nodejs.svg", language: "Node JS" },
  { icon: "bootstrap.svg", language: "Bootstrap" },
  { icon: "firebase.svg", language: "Firebase" },
  { icon: "MUI.svg", language: "Material UI" },
  { icon: "vercel.svg", language: "Vercel" },
  { icon: "SweetAlert.svg", language: "SweetAlert2" },
];

// Update the publications data
const publications = [
  {
    year: "2021",
    title: "Nonvolatile kernel rootkit detection using cross-view clean boot in cloud computing",
    authors: "Geetha Ramani R, Suresh Kumar S",
    journal: "Concurrency Computat Pract Exper",
    citation: "2021;33:e5239",
    doi: "https://doi.org/10.1002/cpe.5239"
  },
  {
    year: "2020",
    title: "Automated Attendance Management using One Shot Learning",
    authors: "K. Arvind Vignesh, S. Suresh Kumar",
    journal: "International Journal of Computer Science and Mobile Computing",
    citation: "Vol. 9(3), pp. 244-247, March 2020"
  },
  {
    year: "2020",
    title: "Assessing Car Damage using Mask R-CNN",
    authors: "P. Sarath, M. Soorya, A. Shaik Abdul Rahman, S. Suresh Kumar, K. Devaki",
    journal: "International Journal of Engineering and Advanced Technology (IJEAT)",
    citation: "Vol. 9(3), pp. 2287-2290, February 2020"
  },
  {
    year: "2019",
    title: "Knowledge Representation and Answer Evaluation System using Language Processing Algorithm",
    authors: "Sridevi, V., Suresh Kumar, S., Supraja, B., Udhayakumar, S",
    journal: "International Conference on Vision Towards Emerging Trends in Communication and Networking, ViTECoN 2019",
    citation: "2019, 8899525"
  },
  {
    year: "2019",
    title: "Non-Volatile Kernel Root kit Detection and Prevention in Cloud Computing",
    authors: "R. Geetha Ramani, S. Suresh Kumar",
    journal: "International Journal of Engineering and Advanced Technology (IJEAT)",
    citation: "Vol. 8 (5S3), pp 139-144, July 2019"
  },
  {
    year: "2015",
    title: "Detecting the Rootkit through Dynamic Analysis",
    authors: "D. Suganya Gandhi and S. Suresh Kumar",
    journal: "International Journal of Science and Research",
    citation: "Vol. 4, no. 3, pp. 1864-1868, 2015"
  },
  {
    year: "2013",
    title: "Rootkit (malicious code) prediction through data mining methods and techniques",
    authors: "R. Geetha Ramani, S. Suresh Kumar, Shomona Gracia Jacob",
    journal: "IEEE International Conference on Computational Intelligence and Computing Research",
    citation: "2013"
  },
  {
    year: "2011",
    title: "Asynchronous packet scheduling for combined input-cross point -output queued switch by optimizing the buffer size",
    authors: "R. Saranya, Suresh kumar",
    journal: "International conference on Intelligent Science and Technology-SUNIST",
    citation: "2011"
  }
];

// Update the research areas/interests
const researchAreas = [
  "Cloud Computing Security",
  "Machine Learning",
  "Network Security",
  "Rootkit Detection",
  "Computer Vision",
  "Natural Language Processing",
  "Data Mining"
];

const PublicationCard = memo(({ publication }) => (
  <div className="bg-white/5 backdrop-blur-xl rounded-xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10">
    <div className="text-purple-400 text-sm mb-2">{publication.year}</div>
    <h3 className="text-white text-lg font-semibold mb-2">{publication.title}</h3>
    <p className="text-gray-400 text-sm mb-2">{publication.authors}</p>
    <p className="text-gray-500 text-sm italic">{publication.journal}</p>
    <p className="text-gray-600 text-xs mt-2">{publication.citation}</p>
    {publication.doi && (
      <a 
        href={publication.doi}
        target="_blank"
        rel="noopener noreferrer"
        className="text-purple-400 text-sm mt-2 inline-block hover:text-purple-300"
      >
        DOI: {publication.doi}
      </a>
    )}
  </div>
));

// Add new components for My Works section
const WorkCard = memo(({ title, description, link, icon: Icon }) => (
  <div className="bg-white/5 backdrop-blur-xl rounded-xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10">
    <div className="flex items-start justify-between mb-4">
      <h3 className="text-white text-lg font-semibold">{title}</h3>
      {Icon && <Icon className="w-6 h-6 text-purple-400" />}
    </div>
    <p className="text-gray-400 text-sm mb-4">{description}</p>
    {link && (
      <a 
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center text-purple-400 text-sm hover:text-purple-300 transition-colors"
      >
        Visit Link
        <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
        </svg>
      </a>
    )}
  </div>
));

const ProgramCard = memo(({ title, description, date }) => (
  <div className="bg-white/5 backdrop-blur-xl rounded-xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10">
    <div className="text-purple-400 text-sm mb-2">{date}</div>
    <h3 className="text-white text-lg font-semibold mb-2">{title}</h3>
    <p className="text-gray-400 text-sm">{description}</p>
  </div>
));

// Add data for My Works section
const academicProfiles = [
  {
    title: "Scopus",
    description: "Scopus is a comprehensive academic database that indexes and abstracts research articles from various disciplines. It provides citation analysis tools and helps researchers track and assess scholarly publications. Developed by Elsevier, Scopus is widely used for literature review and research impact assessment.",
    link: "https://www.scopus.com/authid/[your-scopus-id]" // Add your Scopus profile link
  },
  {
    title: "ORCID",
    description: "ORCID, or Open Researcher and Contributor ID, is a non-profit organization that provides researchers with a unique digital identifier. This persistent identifier distinguishes individual researchers and ensures accurate attribution of their work. Visit my ORCID work below link provided.",
    link: "https://orcid.org/[your-orcid-id]" // Add your ORCID link
  }
];

const programs = [
  {
    title: "Faculty Development Program",
    description: "A 5-day online Faculty Development Program (FDP) on Emerging Cloud Technology - Microsoft Azure AI Engineer, organized by Rajalakshmi Engineering College and associated organizations, scheduled from July 5th to July 9th, 2022. The event is aimed at faculty members and emerging cloud technology (Microsoft Azure AI Engineer).",
    date: "July 5-9, 2022"
  },
  {
    title: "AWS Event",
    description: "The main objective of the workshop was to enhance the skills on AWS services along with current research studies and challenges as well as practical experiences in the field. The first day was about the Introduction to AWS and cloud computing covering various domains such as the history, advantages.",
    date: "2022"
  }
];

// Update the header section
const Header = () => (
  <div className="text-center pb-10" data-aos="fade-up" data-aos-duration="1000">
    <h2 className="inline-block text-3xl md:text-5xl font-bold text-center mx-auto text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] to-[#a855f7]">
      <span style={{
        color: '#6366f1',
        backgroundImage: 'linear-gradient(45deg, #6366f1 10%, #a855f7 93%)',
        WebkitBackgroundClip: 'text',
        backgroundClip: 'text',
        WebkitTextFillColor: 'transparent'
      }}>
        Research Publications
      </span>
    </h2>
    <p className="text-slate-400 max-w-2xl mx-auto text-sm md:text-base mt-2">
      Explore my research contributions in Cloud Computing, Security, and Machine Learning
    </p>
  </div>
);

// Update the main component
const PublicationsPage = () => {
  const theme = useTheme();
  const [value, setValue] = useState(0);
  const [projects, setProjects] = useState([]);
  const [certificates, setCertificates] = useState([]);
  const [showAllProjects, setShowAllProjects] = useState(false);
  const [showAllCertificates, setShowAllCertificates] = useState(false);
  const isMobile = window.innerWidth < 768;
  const initialItems = isMobile ? 4 : 6;
  const navigate = useNavigate();

  useEffect(() => {
    // Initialize AOS once
    AOS.init({
      once: false, // This will make animations occur only once
    });
  }, []);

  const fetchData = useCallback(async () => {
    try {
      const projectCollection = collection(db, "projects");
      const certificateCollection = collection(db, "certificates");

      const [projectSnapshot, certificateSnapshot] = await Promise.all([
        getDocs(projectCollection),
        getDocs(certificateCollection),
      ]);

      const projectData = projectSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        TechStack: doc.data().TechStack || [],
      }));

      const certificateData = certificateSnapshot.docs.map((doc) => doc.data());

      setProjects(projectData);
      setCertificates(certificateData);

      // Store in localStorage
      localStorage.setItem("projects", JSON.stringify(projectData));
      localStorage.setItem("certificates", JSON.stringify(certificateData));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const toggleShowMore = useCallback((type) => {
    if (type === 'projects') {
      setShowAllProjects(prev => !prev);
    } else {
      setShowAllCertificates(prev => !prev);
    }
  }, []);

  const displayedProjects = showAllProjects ? projects : projects.slice(0, initialItems);
  const displayedCertificates = showAllCertificates ? certificates : certificates.slice(0, initialItems);

  return (
    <div 
      className="md:px-[10%] px-[5%] w-full sm:mt-0 mt-[3rem] bg-[#030014] overflow-hidden" 
      id="Research-Publications"
    >
      <button 
        onClick={() => navigate('/')}
        className="mb-8 px-4 py-2 flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
      >
        <ArrowLeft className="w-5 h-5" />
        Back to Home
      </button>

      <Header />
      
      {/* Research Areas */}
      <div className="mb-10">
        <h3 className="text-xl font-semibold text-white mb-4">Research Areas</h3>
        <div className="flex flex-wrap gap-3">
          {researchAreas.map((area, index) => (
            <span 
              key={index}
              className="px-4 py-2 bg-white/5 backdrop-blur-sm rounded-full text-gray-300 text-sm border border-white/10"
            >
              {area}
          </span>
          ))}
        </div>
      </div>

      {/* Publications Grid */}
      <div className="mb-16">
        <h3 className="text-xl font-semibold text-white mb-6">Publications</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {publications.map((pub, index) => (
            <PublicationCard key={index} publication={pub} />
                ))}
              </div>
            </div>

      {/* Academic Profiles */}
      <div className="mb-16">
        <h3 className="text-xl font-semibold text-white mb-6">Academic Profiles</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {academicProfiles.map((profile, index) => (
            <WorkCard key={index} {...profile} />
                ))}
              </div>
            </div>

      {/* Programs */}
      <div className="mb-16">
        <h3 className="text-xl font-semibold text-white mb-6">Programs & Events</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {programs.map((program, index) => (
            <ProgramCard key={index} {...program} />
                ))}
              </div>
            </div>
    </div>
  );
};

export default memo(PublicationsPage);