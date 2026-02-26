import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import { styles } from "../styles";
import { navLinks } from "../constants";
import { logo, menu, close } from "../assets";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const location = useLocation();

  const user = localStorage.getItem("token");
  const isAuthenticated = !!user;

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (location.pathname !== "/") return;

    const handleScrollSpy = () => {
      const sections = navLinks.map((link) => document.getElementById(link.id));
      const scrollPosition = window.scrollY + 100;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(navLinks[i].title);
          return;
        }
      }
      setActiveSection("");
    };

    handleScrollSpy();
    window.addEventListener("scroll", handleScrollSpy);
    return () => window.removeEventListener("scroll", handleScrollSpy);
  }, [location.pathname]);

  const handleLinkClick = (title) => {
    setActiveSection(title);
    setMobileMenuOpen(false);
  };

  return (
    <nav
      className={`${styles.paddingX} fixed top-0 z-50 w-full py-5 transition-all duration-300 ${
        scrolled ? "bg-white/90 shadow-lg backdrop-blur-sm" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2"
          onClick={() => {
            setActiveSection("");
            window.scrollTo(0, 0);
          }}
        >
          <img src={logo} alt="SpectoV" className="h-9 w-9 object-contain" />
          <span className="text-2xl font-bold text-gray-900">SpectoV</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-8 sm:flex">
          <NavLinks
            activeSection={activeSection}
            onLinkClick={handleLinkClick}
            isAuthenticated={isAuthenticated}
          />
        </div>

        {/* Mobile Menu Button */}
        <button
          className="sm:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
          aria-expanded={mobileMenuOpen}
        >
          <img
            src={mobileMenuOpen ? close : menu}
            alt=""
            className="h-6 w-6"
          />
        </button>

        {/* Mobile Menu */}
        <MobileMenu
          isOpen={mobileMenuOpen}
          activeSection={activeSection}
          onLinkClick={handleLinkClick}
          isAuthenticated={isAuthenticated}
        />
      </div>
    </nav>
  );
};

// Desktop navigation links with increased font size
const NavLinks = ({ activeSection, onLinkClick, isAuthenticated }) => {
  const location = useLocation();

  return (
    <ul className="flex gap-8">
      {location.pathname === "/" &&
        navLinks.map((link) => (
          <li key={link.id}>
            <a
              href={`#${link.id}`}
              onClick={() => onLinkClick(link.title)}
              className={`text-base font-medium transition-colors hover:text-red-500 ${
                activeSection === link.title ? "text-red-500" : "text-gray-700"
              }`}
            >
              {link.title}
            </a>
          </li>
        ))}

      <li>
        <Link
          to="/products"
          onClick={() => onLinkClick("Product")}
          className={`text-base font-medium transition-colors hover:text-red-500 ${
            activeSection === "Product" ? "text-red-500" : "text-gray-700"
          }`}
        >
          Product
        </Link>
      </li>

      <li>
        <Link
          to={isAuthenticated ? "/dashboard" : "/careers"}
          onClick={() => onLinkClick("Careers")}
          className={`text-base font-medium transition-colors hover:text-red-500 ${
            activeSection === "Careers" ? "text-red-500" : "text-gray-700"
          }`}
        >
          Careers
        </Link>
      </li>

      {!isAuthenticated ? (
        <li>
          <Link
            to="/login"
            onClick={() => onLinkClick("Login")}
            className="text-base font-medium text-gray-700 transition-colors hover:text-red-500"
          >
            Login
          </Link>
        </li>
      ) : (
        <li>
          <Link
            to="/profile"
            onClick={() => onLinkClick("Profile")}
            className="flex items-center gap-2 text-base font-medium text-gray-700 transition-colors hover:text-red-500"
          >
            <span>Profile</span>
          </Link>
        </li>
      )}
    </ul>
  );
};

// Mobile menu with increased font size
const MobileMenu = ({ isOpen, activeSection, onLinkClick, isAuthenticated }) => {
  const location = useLocation();

  if (!isOpen) return null;

  return (
    <div className="absolute right-4 top-20 z-50 w-64 rounded-xl bg-white p-6 shadow-xl sm:hidden">
      <ul className="flex flex-col gap-4">
        {location.pathname === "/" &&
          navLinks.map((link) => (
            <li key={link.id}>
              <a
                href={`#${link.id}`}
                onClick={() => onLinkClick(link.title)}
                className={`block w-full text-base font-medium transition-colors hover:text-red-500 ${
                  activeSection === link.title ? "text-red-500" : "text-gray-700"
                }`}
              >
                {link.title}
              </a>
            </li>
          ))}

        <li>
          <Link
            to="/products"
            onClick={() => onLinkClick("Product")}
            className={`block w-full text-base font-medium transition-colors hover:text-red-500 ${
              activeSection === "Product" ? "text-red-500" : "text-gray-700"
            }`}
          >
            Product
          </Link>
        </li>

        <li>
          <Link
            to={isAuthenticated ? "/dashboard" : "/careers"}
            onClick={() => onLinkClick("Careers")}
            className={`block w-full text-base font-medium transition-colors hover:text-red-500 ${
              activeSection === "Careers" ? "text-red-500" : "text-gray-700"
            }`}
          >
            Careers
          </Link>
        </li>

        {!isAuthenticated ? (
          <li>
            <Link
              to="/login"
              onClick={() => onLinkClick("Login")}
              className="block w-full text-base font-medium text-gray-700 transition-colors hover:text-red-500"
            >
              Login
            </Link>
          </li>
        ) : (
          <li>
            <Link
              to="/profile"
              onClick={() => onLinkClick("Profile")}
              className="block w-full text-base font-medium text-gray-700 transition-colors hover:text-red-500"
            >
              Profile
            </Link>
          </li>
        )}
      </ul>
    </div>
  );
};

export default Navbar;