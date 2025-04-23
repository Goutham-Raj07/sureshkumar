import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ExternalLink } from 'lucide-react';

const Certificates = () => {
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({
      once: false,
    });
  }, []);

  const handleBack = () => {
    navigate('/');
  };

  const certificates = [
    {
      title: "Reliable Google Cloud Infrastructure: Design and Process",
      date: "July 26, 2020",
      issuer: "Google Cloud & Coursera",
      image: "c1.jpeg",
      verifyLink: "coursera.org/verify/LUHGP2sCS9TN"
    },
    {
      title: "Creating New BigQuery Datasets and Visualizing Insights",
      date: "August 09, 2020",
      issuer: "Google Cloud & Coursera",
      image: "c2.jpeg",
      verifyLink: "coursera.org/verify/LK3BUNPDRLL9"
    },
    {
      title: "Oracle Autonomous Database Cloud 2019 Certified Specialist",
      date: "April 18, 2020",
      issuer: "Oracle University",
      image: "c3.jpeg",
      certId: "274Z20634OADB19-F"
    },
    {
      title: "Exploring and Preparing your Data with BigQuery",
      date: "July 31, 2020",
      issuer: "Google Cloud & Coursera",
      image: "c4.jpeg",
      verifyLink: "coursera.org/verify/VG3XS98CGU7R"
    },
    {
      title: "Build Your Portfolio Website with HTML and CSS",
      date: "June 07, 2020",
      issuer: "Coursera Project Network",
      image: "c5.jpeg",
      verifyLink: "coursera.org/verify/2ZE3MNQSKQRW"
    },
    {
      title: "Essential Google Cloud Infrastructure: Core Services",
      date: "July 23, 2020",
      issuer: "Google Cloud & Coursera",
      image: "c6.jpeg",
      verifyLink: "coursera.org/verify/QCDPLMSFFMKK"
    },
    {
      title: "Essential Google Cloud Infrastructure: Foundation",
      date: "July 22, 2020",
      issuer: "Google Cloud & Coursera",
      image: "c7.jpeg",
      verifyLink: "coursera.org/verify/SRWGNZ8QEXQ9"
    },
    {
      title: "Google Cloud Platform Fundamentals: Core Infrastructure",
      date: "July 08, 2020",
      issuer: "Google Cloud & Coursera",
      image: "c8.jpeg",
      verifyLink: "coursera.org/verify/8D9GM9CSNQZQ"
    },
    {
      title: "Elastic Google Cloud Infrastructure: Scaling and Automation",
      date: "July 25, 2020",
      issuer: "Google Cloud & Coursera",
      image: "c9.jpeg",
      verifyLink: "coursera.org/verify/4BRPA4AMZWES"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 py-20 px-[5%] md:px-[10%]">
      <button 
        onClick={handleBack}
        className="mb-8 px-4 py-2 flex items-center gap-2 text-gray-500 hover:text-indigo-600 transition-colors rounded-lg hover:bg-gray-100"
      >
        <ArrowLeft className="w-5 h-5" />
        Back to Home
      </button>

      <div className="text-center mb-12">
        <h1 
          className="text-4xl md:text-5xl font-bold text-gradient"
          data-aos="fade-down"
        >
          Professional Certifications
        </h1>
        <p 
          className="text-gray-600 mt-4 max-w-2xl mx-auto"
          data-aos="fade-up"
        >
          Cloud Computing, Database, and Development Certifications
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {certificates.map((cert, index) => (
          <div 
            key={index}
            className="group bg-white rounded-xl p-6 border border-gray-200 transition-all duration-300 hover:shadow-lg hover:border-gray-300"
            data-aos="fade-up"
            data-aos-delay={index * 50}
          >
            <div className="overflow-hidden rounded-lg mb-4">
              <img 
                src={`/certificates/${cert.image}`} 
                alt={cert.title} 
                className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <h3 className="text-gray-800 text-lg font-semibold mb-2">{cert.title}</h3>
            <p className="text-gray-500 text-sm mb-2">{cert.issuer}</p>
            <p className="text-indigo-600 text-sm font-medium mb-3">{cert.date}</p>
            {cert.verifyLink && (
              <a 
                href={`https://${cert.verifyLink}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800 hover:underline transition-colors"
              >
                Verify Certificate
                <ExternalLink className="w-3 h-3" />
              </a>
            )}
            {cert.certId && (
              <p className="text-gray-400 text-xs mt-2">Certificate ID: {cert.certId}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Certificates; 