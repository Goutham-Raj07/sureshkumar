import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { ArrowLeft, Image as ImageIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const GalleryImage = ({ src, title, description }) => (
  <div 
    className="relative overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm"
    data-aos="fade-up"
  >
    <img 
      src={`/gallery/${src}`} 
      alt={title}
      className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
    />
    <div 
      className="absolute inset-0 bg-white/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end"
    >
      <div className="p-4">
        <h3 className="text-gray-800 text-lg font-semibold mb-1 group-hover:text-indigo-700 transition-colors">{title}</h3>
        <p className="text-gray-600 text-sm group-hover:text-gray-700 transition-colors">{description}</p>
      </div>
      <ImageIcon className="absolute top-3 right-3 w-5 h-5 text-gray-400 opacity-0 group-hover:opacity-50 transition-opacity duration-300" />
    </div>
    <div className="group absolute inset-0"></div>
  </div>
);

const Gallery = () => {
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({
      once: false,
    });
  }, []);

  const galleryItems = [
    {
      src: "1.jpg",
      title: "Award Ceremony",
      description: "Receiving recognition for academic excellence"
    },
    {
      src: "2.jpg",
      title: "Smart City Workshop",
      description: "Presenting on IoT applications in smart cities"
    },
    {
      src: "3.jpg",
      title: "Student Interaction",
      description: "Engaging with students during a technical session"
    },
    {
      src: "5.jpg",
      title: "Award Recognition",
      description: "Receiving departmental excellence award"
    },
    {
      src: "photo-2.jpeg.jpg",
      title: "Academic Achievement",
      description: "Recognition ceremony at Rajalakshmi Engineering College"
    },
    {
      src: "broucher.jpg",
      title: "FDP Program",
      description: "Faculty Development Program on Cloud Technology"
    },
    {
      src: "gal.jpeg",
      title: "Gallery",
      description: "Additional gallery image"
    }
  ];

  return (
    <div 
      className="min-h-screen bg-gray-50 text-gray-800 py-20 px-[5%] md:px-[10%]"
      id="Gallery"
    >
      <button 
        onClick={() => navigate('/')}
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
          Achievement Gallery
        </h1>
        <p 
          className="text-gray-600 mt-4 max-w-2xl mx-auto"
          data-aos="fade-up"
        >
          Showcasing moments of excellence and academic achievements
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {galleryItems.map((item, index) => (
          <div key={index} className="group">
            <GalleryImage 
              {...item}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery; 