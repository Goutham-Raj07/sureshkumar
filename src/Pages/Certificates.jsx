import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const CertificateCard = ({ title, date, issuer, image }) => (
  <div 
    className="bg-white/5 backdrop-blur-xl rounded-xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10"
    data-aos="fade-up"
  >
    <img 
      src={`/certificates/${image}`} 
      alt={title} 
      className="w-full h-48 object-cover rounded-lg mb-4"
    />
    <h3 className="text-white text-lg font-semibold mb-2">{title}</h3>
    <p className="text-gray-400 text-sm mb-2">{issuer}</p>
    <p className="text-purple-400 text-sm">{date}</p>
  </div>
);

const Certificates = () => {
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({
      once: false,
    });
  }, []);

  const handleBack = () => {
    navigate('/');
    window.scrollTo(0, 0);
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
    <div className="min-h-screen bg-[#030014] text-white py-20 px-[5%] md:px-[10%]">
      <button 
        onClick={handleBack}
        className="mb-8 px-4 py-2 flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
      >
        <ArrowLeft className="w-5 h-5" />
        Back to Home
      </button>

      <div className="text-center mb-12">
        <h1 
          className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#6366f1] to-[#a855f7] bg-clip-text text-transparent"
          data-aos="fade-down"
        >
          Professional Certifications
        </h1>
        <p 
          className="text-gray-400 mt-4"
          data-aos="fade-up"
        >
          Cloud Computing, Database, and Development Certifications
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {certificates.map((cert, index) => (
          <div 
            key={index}
            className="bg-white/5 backdrop-blur-xl rounded-xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10"
            data-aos="fade-up"
            data-aos-delay={index * 100}
          >
            <img 
              src={`/certificates/${cert.image}`} 
              alt={cert.title} 
              className="w-full h-48 object-cover rounded-lg mb-4 hover:scale-105 transition-transform duration-300"
            />
            <h3 className="text-white text-lg font-semibold mb-2">{cert.title}</h3>
            <p className="text-gray-400 text-sm mb-2">{cert.issuer}</p>
            <p className="text-purple-400 text-sm mb-2">{cert.date}</p>
            {cert.verifyLink && (
              <a 
                href={`https://${cert.verifyLink}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 text-sm hover:text-blue-300 transition-colors"
              >
                Verify Certificate
              </a>
            )}
            {cert.certId && (
              <p className="text-gray-500 text-sm">Certificate ID: {cert.certId}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Certificates; 