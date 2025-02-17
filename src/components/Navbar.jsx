import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState("Home");
    const location = useLocation();
    const navigate = useNavigate();
    
    const navItems = [
        { href: "/", label: "Home" },
        { href: "/#About", label: "About" },
        { href: "/publications", label: "Publications" },
        { href: "/#Gallery", label: "Gallery" },
        { href: "/#Contact", label: "Contact" },
    ];

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
            
            if (location.pathname === '/') {
                const sections = [
                    { id: 'Home', href: '/' },
                    { id: 'About', href: '/#About' },
                    { id: 'Research-Publications', href: '/publications' },
                    { id: 'Gallery', href: '/#Gallery' },
                    { id: 'Contact', href: '/#Contact' }
                ].map(item => {
                    const section = document.getElementById(item.id);
                    if (section) {
                        return {
                            id: item.id,
                            offset: section.offsetTop - 100,
                            height: section.offsetHeight,
                            href: item.href
                        };
                    }
                    return null;
                }).filter(Boolean);

                const currentPosition = window.scrollY;
                
                // Find the active section
                const active = sections.find(section => 
                    currentPosition >= section.offset && 
                    currentPosition < section.offset + section.height
                );

                if (active) {
                    if (active.id === 'Research-Publications') {
                        setActiveSection('Publications');
                    } else {
                        setActiveSection(active.id);
                    }
                }
            } else if (location.pathname === '/publications') {
                setActiveSection('Publications');
            }
        };

        window.addEventListener("scroll", handleScroll);
        handleScroll();
        return () => window.removeEventListener("scroll", handleScroll);
    }, [location.pathname]);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [isOpen]);

    const handleNavigation = (e, href) => {
        e.preventDefault();
        setIsOpen(false);

        if (href.includes('#') || href === '/publications') {
            // Handle hash navigation and publications
            if (location.pathname !== '/') {
                navigate('/');
                // Wait for navigation to complete before scrolling
                setTimeout(() => {
                    const sectionId = href === '/publications' ? 'Research-Publications' : href.split('#')[1];
                    const section = document.getElementById(sectionId);
                    if (section) {
                        const top = section.offsetTop - 100;
                        window.scrollTo({
                            top: top,
                            behavior: "smooth"
                        });
                    }
                }, 100);
            } else {
                const sectionId = href === '/publications' ? 'Research-Publications' : href.split('#')[1];
                const section = document.getElementById(sectionId);
                if (section) {
                    const top = section.offsetTop - 100;
                    window.scrollTo({
                        top: top,
                        behavior: "smooth"
                    });
                }
            }
        } else {
            // Handle other route navigation
            navigate(href);
        }
    };

    return (
        <nav
            className={`fixed w-full top-0 z-50 transition-all duration-500 ${
                isOpen
                    ? "bg-[#030014] opacity-100"
                    : scrolled
                    ? "bg-[#030014]/50 backdrop-blur-xl"
                    : "bg-transparent"
            }`}
        >
            <div className="mx-auto px-4 sm:px-6 lg:px-[10%]">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <a
                            href="/"
                            onClick={(e) => handleNavigation(e, "/")}
                            className="text-xl font-bold bg-gradient-to-r from-[#a855f7] to-[#6366f1] bg-clip-text text-transparent"
                        >
                            Suresh Kumar S
                        </a>
                    </div>
    
                    {/* Desktop Navigation */}
                    <div className="hidden md:block">
                        <div className="ml-8 flex items-center space-x-8">
                            {navItems.map((item) => (
                                <a
                                    key={item.label}
                                    href={item.href}
                                    onClick={(e) => handleNavigation(e, item.href)}
                                    className="group relative px-1 py-2 text-sm font-medium"
                                >
                                    <span
                                        className={`relative z-10 transition-colors duration-300 ${
                                            (item.href === location.pathname || 
                                             (activeSection === 'Publications' && item.href === '/publications') ||
                                             activeSection === item.href.split('#')[1])
                                                ? "bg-gradient-to-r from-[#6366f1] to-[#a855f7] bg-clip-text text-transparent font-semibold"
                                                : "text-[#e2d3fd] group-hover:text-white"
                                        }`}
                                    >
                                        {item.label}
                                    </span>
                                    <span
                                        className={`absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-[#6366f1] to-[#a855f7] transform origin-left transition-transform duration-300 ${
                                            (item.href === location.pathname || 
                                             (activeSection === 'Publications' && item.href === '/publications') ||
                                             activeSection === item.href.split('#')[1])
                                                ? "scale-x-100"
                                                : "scale-x-0 group-hover:scale-x-100"
                                        }`}
                                    />
                                </a>
                            ))}
                        </div>
                    </div>
    
                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className={`relative p-2 text-[#e2d3fd] hover:text-white transition-transform duration-300 ease-in-out transform ${
                                isOpen ? "rotate-90 scale-125" : "rotate-0 scale-100"
                            }`}
                        >
                            {isOpen ? (
                                <X className="w-6 h-6" />
                            ) : (
                                <Menu className="w-6 h-6" />
                            )}
                        </button>
                    </div>
                </div>
            </div>
    
            {/* Mobile Menu Overlay */}
            <div
                className={`md:hidden h-2/5 fixed inset-0 bg-[#030014] transition-all duration-300 ease-in-out ${
                    isOpen
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-[-100%] pointer-events-none"
                }`}
                style={{ top: "64px" }}
            >
                <div className="flex flex-col h-full">
                    <div className="px-4 py-6 space-y-4 flex-1 ">
                        {navItems.map((item, index) => (
                            <a
                                key={item.label}
                                href={item.href}
                                onClick={(e) => handleNavigation(e, item.href)}
                                className={`block px-4 py-3 text-lg font-medium transition-all duration-300 ease ${
                                    (item.href === location.pathname || 
                                     (activeSection === 'Publications' && item.href === '/publications') ||
                                     activeSection === item.href.split('#')[1])
                                        ? "bg-gradient-to-r from-[#6366f1] to-[#a855f7] bg-clip-text text-transparent font-semibold"
                                        : "text-[#e2d3fd] hover:text-white"
                                }`}
                                style={{
                                    transitionDelay: `${index * 100}ms`,
                                    transform: isOpen ? "translateX(0)" : "translateX(50px)",
                                    opacity: isOpen ? 1 : 0,
                                }}
                            >
                                {item.label}
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;