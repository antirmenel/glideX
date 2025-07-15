import React, { useState, useEffect } from "react";
import { HiBars2 } from "react-icons/hi2";
import { RiCloseLargeFill } from "react-icons/ri";
import { useNavigate, Link } from "react-router-dom";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/products" },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact Us", href: "/contact" },
];

const Navbar = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
  }, [isOpen]);

  // Close mobile menu
  const closeMenu = () => setIsOpen(false);

  return (
    <>
      {/* Main navigation bar */}
      <nav className="fixed top-0 left-0 w-full z-[999] bg-white/10 backdrop-blur-xl text-white shadow-md">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center h-16">
          <Link to="/" onClick={closeMenu}>
            <img src="/logo.png" alt="Logo" className="w-32 object-contain" />
          </Link>

          {/* Desktop navigation links and pre-order button */}
          <div className="hidden sm:flex items-center space-x-8 font-medium text-sm">
            {navLinks.map(({ label, href }) => (
              <Link
                key={label}
                to={href}
                className="nav-link hover:text-blue-500 transition-colors duration-300"
                onClick={closeMenu}
              >
                {label}
              </Link>
            ))}
            <button
              onClick={() => {
                navigate("/preorder");
                closeMenu();
              }}
              className="px-5 py-2 bg-gradient-to-r from-[#cee1e9] to-[#7cacf9] shadow-md hover:shadow-lg hover:scale-105 transition-transform duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              Pre-order
            </button>
          </div>

          {/* Mobile menu open button */}
          <div className="sm:hidden">
            <button
              onClick={() => setIsOpen(true)}
              aria-label="Open Menu"
              className="p-2 hover:bg-white/20 transition"
            >
              <HiBars2 size={24} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile sidebar menu */}
      <aside
        className={`fixed top-0 right-0 h-full w-64 bg-white/30 backdrop-blur-xl shadow-lg z-[1001] transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile Menu"
      >
        <div className="flex justify-end px-6 py-4">
          <button
            onClick={closeMenu}
            aria-label="Close Menu"
            className="p-2 hover:bg-gray-200 transition focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <RiCloseLargeFill size={24} />
          </button>
        </div>

        {/* Mobile navigation links and pre-order button */}
        <nav className="flex flex-col space-y-6 text-lg px-10 mt-10">
          {navLinks.map(({ label, href }) => (
            <Link
              key={label}
              to={href}
              onClick={closeMenu}
              className="hover:text-blue-600 transition-colors duration-300"
              tabIndex={isOpen ? 0 : -1}
            >
              {label}
            </Link>
          ))}
          <button
            onClick={() => {
              navigate("/preorder");
              closeMenu();
            }}
            className="mt-6 px-6 py-3 bg-gradient-to-r from-[#cee1e9] to-[#7cacf9] shadow-md hover:shadow-lg hover:scale-105 transition-transform duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            tabIndex={isOpen ? 0 : -1}
          >
            Pre-order
          </button>
        </nav>
      </aside>

      {/* Backdrop behind mobile menu */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[1000]"
          onClick={closeMenu}
          aria-hidden="true"
        />
      )}
    </>
  );
};

export default Navbar;
