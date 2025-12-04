"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiMenu, FiX, FiShoppingCart } from "react-icons/fi";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "../context/CartContext";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const { cartItems } = useCart();

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Product", href: "/product" },
    { name: "Contact", href: "/contact" },
    { name: "About", href: "/about" },
    { name: "Login", href: "/login" },
  ];

  // Detect scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) setIsScrolled(true);
      else setIsScrolled(false);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Nav background + text color logic
  const isHomeTransparent = pathname === "/" && !isScrolled;

  const navbarBG = isHomeTransparent ? "bg-transparent" : "bg-white shadow-md";

  const textColor = isHomeTransparent ? "text-white" : "text-gray-700";

  const iconColor = isHomeTransparent ? "white" : "black";

  const getLinkClass = (href) =>
    `transition-colors ${
      pathname === href
        ? "text-blue-500 font-semibold"
        : isHomeTransparent
        ? "text-white hover:text-blue-300"
        : "text-gray-700 hover:text-blue-500"
    }`;

  return (
    <nav
      className={`${navbarBG} fixed top-0 left-0 w-full z-30 transition-all duration-300`}
    >
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link href="/">
          <h2
            className={`text-2xl font-extralight transition-colors duration-300 ${textColor}`}
          >
            SkinAura
          </h2>
        </Link>

        {/* Mobile Left Side — Cart Icon + Hamburger */}
        <div className="lg:hidden flex items-center gap-4">
          <Link href="/cart" className="relative">
            <FiShoppingCart size={24} color={iconColor} />
            <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs px-1 rounded-full">
              {cartItems.length}
            </span>
          </Link>

          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? (
              <FiX size={26} color={iconColor} />
            ) : (
              <FiMenu size={26} color={iconColor} />
            )}
          </button>
        </div>

        {/* Desktop Menu */}
        <div className="hidden lg:flex lg:items-center lg:space-x-6">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={getLinkClass(link.href)}
            >
              {link.name}
            </Link>
          ))}

          <Link href="/cart" className="relative">
            <FiShoppingCart size={22} color={iconColor} />
            <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs px-1 rounded-full">
              {cartItems.length}
            </span>
          </Link>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, x: "-100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "-100%" }}
            transition={{ duration: 0.3 }}
            className="lg:hidden absolute inset-x-0 z-20 bg-white px-6 py-4 shadow"
          >
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-gray-700 hover:text-blue-500 transition"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Header;
