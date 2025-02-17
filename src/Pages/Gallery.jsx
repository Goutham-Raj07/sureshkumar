import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const GalleryImage = ({ src, title, description }) => (
  <div 
    className="group relative overflow-hidden rounded-xl"
    data-aos="fade-up"
  >
    <img 
      src={`/gallery/${src}`} 
      alt={title}
      className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <h3 className="text-white text-lg font-semibold mb-1">{title}</h3>
        <p className="text-gray-300 text-sm">{description}</p>
      </div>
    </div>
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
    }
  ];

  return (
    <div 
      className="min-h-screen bg-[#030014] text-white py-20 px-[5%] md:px-[10%]"
      id="Gallery"
    >
      {/* Back button */}
      <button 
        onClick={() => navigate('/')}
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
          Achievement Gallery
        </h1>
        <p 
          className="text-gray-400 mt-4"
          data-aos="fade-up"
        >
          Showcasing moments of excellence and academic achievements
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {galleryItems.map((item, index) => (
          <GalleryImage 
            key={index} 
            {...item}
            data-aos-delay={index * 100}
          />
        ))}
      </div>
    </div>
  );
};

export default Gallery; 