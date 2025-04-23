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
                const sectionsData = [
                    { id: 'Home', href: '/' },
                    { id: 'About', href: '/#About' },
                    { id: 'Research-Publications', href: '/publications', navLabel: 'Publications' },
                    { id: 'Gallery', href: '/#Gallery' },
                    { id: 'Contact', href: '/#Contact' }
                ];

                const sections = sectionsData.map(item => {
                    const section = document.getElementById(item.id);
                    if (section) {
                        return {
                            id: item.id,
                            offset: section.offsetTop - 150,
                            height: section.offsetHeight,
                            navLabel: item.navLabel || item.id
                        };
                    }
                    return null;
                }).filter(Boolean)
                  .sort((a, b) => a.offset - b.offset);

                const currentPosition = window.scrollY;
                
                let currentActiveSection = 'Home';

                for (const section of sections) {
                    if (currentPosition >= section.offset) {
                        currentActiveSection = section.navLabel;
                    } else {
                        break;
                    }
                }
                
                setActiveSection(currentActiveSection);

            } else if (location.pathname === '/publications') {
                setActiveSection('Publications');
            } else if (location.pathname === '/gallery') {
                setActiveSection('Gallery');
            } else if (location.pathname === '/certificates') {
                // setActiveSection('Certificates'); // Uncomment and adjust if needed
            } else {
                setActiveSection('');
            }
        };

        let scrollTimeout;
        const debouncedScrollHandler = () => {
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(handleScroll, 50);
        };

        window.addEventListener("scroll", debouncedScrollHandler);
        handleScroll();
        return () => {
            window.removeEventListener("scroll", debouncedScrollHandler);
            clearTimeout(scrollTimeout);
        };
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

        if (href.startsWith('/#') || href === '/publications' || href.startsWith('/#Gallery') || href.startsWith('/#Contact')) {
            if (location.pathname !== '/') {
                navigate('/');
                setTimeout(() => {
                    const sectionId = href === '/publications' ? 'Research-Publications' : href.split('#')[1];
                    const section = document.getElementById(sectionId);
                    if (section) {
                        const top = section.offsetTop - 80;
                        window.scrollTo({ top: top, behavior: "smooth" });
                    }
                }, 150);
            } else {
                const sectionId = href === '/publications' ? 'Research-Publications' : href.split('#')[1];
                 const section = document.getElementById(sectionId);
                 if (section) {
                     const top = section.offsetTop - 80;
                     window.scrollTo({ top: top, behavior: "smooth" });
                 } else if (href === '/publications') {
                    navigate('/publications'); 
                 }
            }
        } else if (href === '/') {
             if (location.pathname !== '/') {
                 navigate('/');
             }
              window.scrollTo({ top: 0, behavior: "smooth" });
             setActiveSection('Home');
        }
         else {
            navigate(href);
        }
    };

    const isActive = (item) => {
        if (location.pathname === '/publications' && item.href === '/publications') return true;
        if (location.pathname === '/gallery' && item.label === 'Gallery') return true;
        if (location.pathname === '/') {
            if (item.href === '/') return activeSection === 'Home';
            if (item.href.includes('#')) return activeSection === item.href.split('#')[1];
            if (item.href === '/publications') return activeSection === 'Publications';
        }
        return false;
    };

    return (
        <nav
            className={`fixed w-full top-0 z-50 transition-all duration-300 ${
                isOpen || scrolled
                    ? "bg-white shadow-sm"
                    : "bg-transparent"
            }`}
        >
            <div className="mx-auto px-4 sm:px-6 lg:px-[10%]">
                <div className="flex items-center justify-between h-16">
                    <div className="flex-shrink-0">
                        <a
                            href="/"
                            onClick={(e) => handleNavigation(e, "/")}
                            className="text-xl font-bold text-indigo-600 hover:text-purple-600 transition-colors"
                        >
                            Suresh Kumar S
                        </a>
                    </div>
    
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
                                            isActive(item)
                                                ? "text-indigo-600 font-semibold"
                                                : "text-gray-600 group-hover:text-indigo-600"
                                        }`}
                                    >
                                        {item.label}
                                    </span>
                                    <span
                                        className={`absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 transform origin-left transition-transform duration-300 ${
                                            isActive(item)
                                                ? "scale-x-100"
                                                : "scale-x-0 group-hover:scale-x-100"
                                        }`}
                                    />
                                </a>
                            ))}
                        </div>
                    </div>
    
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className={`relative p-2 text-gray-600 hover:text-indigo-600 transition-transform duration-300 ease-in-out transform ${
                                isOpen ? "rotate-90 scale-110" : "rotate-0 scale-100"
                            }`}
                            aria-label="Toggle menu"
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
    
            <div
                className={`md:hidden fixed inset-x-0 top-16 bg-white shadow-lg transition-transform duration-300 ease-in-out ${
                    isOpen
                        ? "translate-y-0 opacity-100"
                        : "-translate-y-full opacity-0 pointer-events-none"
                }`}
            >
                <div className="px-4 pt-4 pb-6 space-y-2"> 
                    {navItems.map((item, index) => (
                        <a
                            key={item.label}
                            href={item.href}
                            onClick={(e) => handleNavigation(e, item.href)}
                            className={`block px-3 py-3 text-base font-medium rounded-md transition-colors duration-200 ${
                                isActive(item)
                                    ? "text-indigo-600 bg-indigo-50 font-semibold"
                                    : "text-gray-700 hover:text-indigo-600 hover:bg-gray-100"
                            }`}
                            style={{
                                transitionDelay: `${index * 50}ms`,
                                transform: isOpen ? "translateX(0)" : "translateX(20px)",
                                opacity: isOpen ? 1 : 0,
                            }}
                        >
                            {item.label}
                        </a>
                    ))}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;