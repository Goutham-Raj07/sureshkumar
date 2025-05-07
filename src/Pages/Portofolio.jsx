import React, { useEffect, useState, useCallback, memo } from "react";
import PropTypes from "prop-types";
import AOS from "aos";
import "aos/dist/aos.css";
import { Code, Award, Boxes, ArrowLeft, ExternalLink, BookOpen, Users, Calendar } from "lucide-react";
import { useNavigate } from 'react-router-dom';

// Update the publications data
const publications = [
  {
    title: "Nonvolatile kernel rootkit detection using cross‐view clean boot in cloud computing",
    authors: "R Geetha Ramani, S Suresh Kumar",
    journal: "Concurrency and Computation: Practice and Experience 33 (3), e5239",
    year: 2021,
    citedBy: 9
  },
  {
    title: "Rootkit (malicious code) prediction through data mining methods and techniques",
    authors: "RG Ramani, SS Kumar, SG Jacob",
    journal: "2013 IEEE International Conference on Computational Intelligence and …",
    year: 2013,
    citedBy: 7
  },
  {
    title: "Advance Kernel Rootkit Detection: Survey",
    authors: "SS Kumar, T SudalaiMuthu",
    journal: "2023 7th International Conference on Intelligent Computing and Control …",
    year: 2023,
    citedBy: 3
  },
  {
    title: "Knowledge representation and answer evaluation system using language processing algorithm",
    authors: "V Sridevi, B Supraja, S Udhayakumar",
    journal: "2019 International Conference on Vision Towards Emerging Trends in …",
    year: 2019,
    citedBy: 3
  },
  {
    title: "Rootkit detection using deep learning: A comprehensive survey",
    authors: "SS Kumar, S Stephen, MS Rumysia",
    journal: "2024 10th International Conference on Communication and Signal Processing …",
    year: 2024,
    citedBy: 2
  },
  {
    title: "Enhancing deep learning models for sentiment analysis integrating texts and emojis: A comprehensive survey",
    authors: "SS Kumar, D Gayathri, R Shugavaneshwar",
    journal: "2024 10th International Conference on Communication and Signal Processing …",
    year: 2024,
    citedBy: 2
  },
  {
    title: "Prevention of Kernel Rootkit in Cloud Computing",
    authors: "SS Kumar, AP Valavan, V Prathiksha",
    journal: "2023 7th International Conference on Intelligent Computing and Control …",
    year: 2023,
    citedBy: 1
  },
  {
    title: "Exploring techniques for web phishing detection: A comprehensive survey",
    authors: "SS Kumar, B Swarnagowri, R Susmitha, R Sujitha",
    journal: "2023 7th International Conference on Intelligent Computing and Control …",
    year: 2023,
    citedBy: 1
  },
  {
    title: "Visual Impaired Assist Mobile App using CNN",
    authors: "SS Kumar, B Prasana, SP Kumar",
    journal: "2023 5th International Conference on Smart Systems and Inventive Technology …",
    year: 2023,
    citedBy: 1
  },
  {
    title: "Volatile Kernel Rootkit Hidden Process Detection in Cloud Computing",
    authors: "T SudalaiMuthu",
    journal: "2022 1st International Conference on Computational Science and Technology …",
    year: 2022,
    citedBy: 1
  },
  {
    title: "Kernel Rootkit Secret Detection in Cloud Computing",
    authors: "T SudalaiMuthu",
    journal: "2022 1st International Conference on Computational Science and Technology …",
    year: 2022,
    citedBy: 1
  },
  {
    title: "Non-Volatile Kernel Root kit Detection and Prevention in Cloud Computing",
    authors: "R Geetha Ramani, SS Kumar",
    journal: "arXiv e-prints, arXiv: 2004.14924",
    year: 2020,
    citedBy: 1
  },
  {
    title: "Analyzing Classroom Behavior to Enhance Student Engagement and Learning Outcomes",
    authors: "A Sivaprakasam, RE Joseph, AS Sandeep",
    journal: "2024 International Conference on Emerging Research in Computational Science …",
    year: 2024,
    citedBy: 0
  },
  {
    title: "Kernel rootkit prevention model using multiclass",
    authors: "SK Srinivasan, S Thalavaipillai",
    journal: "International Journal of Reconfigurable and Embedded Systems 13 (2), 395",
    year: 2024,
    citedBy: 0
  },
  {
    title: "Kernel rootkit detection multi class on deep learning techniques",
    authors: "SK Srinivasan, SM Thalavaipillai",
    journal: "Bulletin of Electrical Engineering and Informatics 13 (3), 2000-2008",
    year: 2024,
    citedBy: 0
  },
  {
    title: "Video Analytics using Deep Learning in Cloud Services to Detect Corrosion-A Comprehensive Survey",
    authors: "SS Kumar, K Gokul, I Hemanand, MS Eaknath, VM Jayabharanivelu",
    journal: "2023 3rd International Conference on Innovative Mechanisms for Industry …",
    year: 2023,
    citedBy: 0
  },
  {
    title: "Assessing Car Damage using Mask R-CNN",
    authors: "SA Rahman A, SS Kumar, K Devaki",
    journal: "arXiv e-prints, arXiv: 2004.14173",
    year: 2020,
    citedBy: 0
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

// Update the header section
const Header = () => (
  <div className="text-center pb-10" data-aos="fade-up" data-aos-duration="800">
    <h2 className="inline-block text-3xl md:text-5xl font-bold text-center mx-auto text-gradient">
      Research & Publications
    </h2>
    <p className="text-gray-600 max-w-2xl mx-auto text-sm md:text-base mt-3">
      Explore my research contributions, academic profiles, and program involvement.
    </p>
  </div>
);

// Updated Publication Card styles for light theme
const PublicationCard = memo(({ publication }) => (
  // Card base style
  <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm transition-all duration-300 hover:shadow-md hover:border-gray-300">
    {/* Year */}
    <div className="text-indigo-600 text-sm font-semibold mb-2 flex items-center gap-1.5">
        <Calendar className="w-4 h-4 opacity-70" />
        {publication.year}
    </div>
    {/* Title */}
    <h3 className="text-gray-800 text-lg font-semibold mb-2 leading-tight">{publication.title}</h3>
    {/* Authors */}
    <div className="text-gray-600 text-sm mb-3 flex items-start gap-1.5">
        <Users className="w-4 h-4 mt-0.5 opacity-70 shrink-0" />
        <span>{publication.authors}</span>
    </div>
    {/* Journal */}
    <div className="text-gray-500 text-sm italic mb-2 flex items-start gap-1.5">
        <BookOpen className="w-4 h-4 mt-0.5 opacity-70 shrink-0" />
        <span>{publication.journal}</span>
    </div>
    {/* Citation (optional, can be smaller) */}
    {/* <p className="text-gray-400 text-xs mt-2">{publication.citation}</p> */}
    {/* DOI Link */}
    {publication.doi && (
      <a 
        href={publication.doi}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800 hover:underline transition-colors mt-2"
      >
        View Publication
        <ExternalLink className="w-3.5 h-3.5" />
      </a>
    )}
  </div>
));

// Updated Work Card (Academic Profiles) styles for light theme
const WorkCard = memo(({ title, description, link, icon: Icon }) => (
  // Card base style
  <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm transition-all duration-300 hover:shadow-md hover:border-gray-300 h-full flex flex-col">
    <div className="flex items-start justify-between mb-3">
       {/* Title */}
      <h3 className="text-gray-800 text-lg font-semibold">{title}</h3>
      {/* Icon */}
      {Icon && <Icon className="w-6 h-6 text-indigo-500 opacity-80" />}
    </div>
     {/* Description */}
    <p className="text-gray-600 text-sm mb-4 flex-grow">{description}</p>
    {/* Link */}
    {link && (
      <a 
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800 hover:underline transition-colors mt-auto" // mt-auto pushes link down
      >
        Visit Profile
        <ExternalLink className="w-3.5 h-3.5" />
      </a>
    )}
  </div>
));

// Updated Program Card styles for light theme
const ProgramCard = memo(({ title, description, date }) => (
  // Card base style
  <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm transition-all duration-300 hover:shadow-md hover:border-gray-300">
     {/* Date */}
    <div className="text-indigo-600 text-sm font-semibold mb-2 flex items-center gap-1.5">
        <Calendar className="w-4 h-4 opacity-70" />
        {date}
    </div>
    {/* Title */}
    <h3 className="text-gray-800 text-lg font-semibold mb-2 leading-tight">{title}</h3>
     {/* Description */}
    <p className="text-gray-600 text-sm">{description}</p>
  </div>
));

// Add data for My Works section
const academicProfiles = [
  {
    title: "Scopus",
    description: "Scopus is a comprehensive academic database that indexes and abstracts research articles from various disciplines. It provides citation analysis tools and helps researchers track and assess scholarly publications. Developed by Elsevier, Scopus is widely used for literature review and research impact assessment.",
    link: "https://www.scopus.com/authid/detail.uri?authorId=57215495873" // Add your Scopus profile link
  },
  {
    title: "ORCID",
    description: "ORCID, or Open Researcher and Contributor ID, is a non-profit organization that provides researchers with a unique digital identifier. This persistent identifier distinguishes individual researchers and ensures accurate attribution of their work. Visit my ORCID work below link provided.",
    link: "https://orcid.org/my-orcid?orcid=0000-0001-5655-2718" // Add your ORCID link
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

// Updated main component structure and styles
const PublicationsPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({
      once: false, // Keep animations potentially repeating on scroll
      duration: 600, // Slightly faster animation
      offset: 50, // Trigger animation slightly earlier
    });
  }, []);

  return (
    <div 
      // Updated main container styles
      className="md:px-[10%] px-[5%] py-20 w-full min-h-screen bg-gray-50 text-gray-800 overflow-hidden" 
      id="Research-Publications"
    >
       {/* Back button - Updated styles */}
      <button 
        onClick={() => navigate('/')}
        className="mb-12 px-4 py-2 flex items-center gap-2 text-gray-500 hover:text-indigo-600 transition-colors rounded-lg hover:bg-gray-100"
        aria-label="Back to Home"
      >
        <ArrowLeft className="w-5 h-5" />
        Back to Home
      </button>

      <Header />
      
      {/* Research Areas Section */}
      <section className="mb-16" data-aos="fade-up" data-aos-delay="100">
        <h3 className="text-2xl font-semibold text-gray-800 mb-5">Research Areas</h3>
        <div className="flex flex-wrap gap-3">
          {researchAreas.map((area, index) => (
            <span 
              key={index}
              // Updated research area tag styles
              className="px-4 py-2 bg-white border border-gray-200 shadow-xs rounded-full text-gray-700 text-sm hover:bg-gray-100 transition-colors"
            >
              {area}
            </span>
          ))}
                  </div>
      </section>

      {/* Publications Grid Section */}
      <section className="mb-16" data-aos="fade-up" data-aos-delay="200">
        <h3 className="text-2xl font-semibold text-gray-800 mb-6">Publications</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {publications.map((pub, index) => (
            // Pass AOS delay individually if needed, or rely on parent section fade-up
            <PublicationCard key={index} publication={pub} /> 
                ))}
              </div>
      </section>

      {/* Academic Profiles Section */}
      <section className="mb-16" data-aos="fade-up" data-aos-delay="300">
        <h3 className="text-2xl font-semibold text-gray-800 mb-6">Academic Profiles</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {academicProfiles.map((profile, index) => (
            <WorkCard key={index} {...profile} />
                ))}
              </div>
      </section>

      {/* Programs Section */}
      <section className="pb-10" data-aos="fade-up" data-aos-delay="400"> 
        <h3 className="text-2xl font-semibold text-gray-800 mb-6">Programs & Events</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {programs.map((program, index) => (
            <ProgramCard key={index} {...program} />
                ))}
              </div>
      </section>
    </div>
  );
};

export default memo(PublicationsPage);