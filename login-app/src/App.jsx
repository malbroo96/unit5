import React, { useState, useEffect } from "react";

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuItems = [
    { 
      name: "Appam & Chicken Curry", 
      image: "/images/appam.jpg",
      description: "Soft rice pancakes with aromatic chicken curry",
      price: "₹180"
    },
    { 
      name: "Kappa & Beef Curry", 
      image: "/images/kappa-beef.jpg",
      description: "Traditional tapioca with spicy beef fry",
      price: "₹220"
    },
    { 
      name: "Paal Kappa", 
      image: "/images/paal-kappa.avif",
      description: "Creamy tapioca in coconut milk",
      price: "₹150"
    },
    { 
      name: "Botty Curry", 
      image: "/images/botty.jpg",
      description: "Authentic Kerala style meat preparation",
      price: "₹200"
    },
  ];

  const features = [
    { icon: "🌿", title: "Fresh Ingredients", desc: "Sourced daily from local farms" },
    { icon: "👨‍🍳", title: "Expert Chefs", desc: "Traditional Kerala recipes" },
    { icon: "⚡", title: "Quick Service", desc: "Hot meals in 15 minutes" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-green-50">
      {/* Navbar */}
      <nav className={`w-full fixed top-0 left-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-white/95 backdrop-blur-lg shadow-lg" : "bg-transparent"
      }`}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg">
              C
            </div>
            <h1 className="text-2xl font-black bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              Casava Bites
            </h1>
          </div>

          {/* Desktop Menu */}
          <ul className="hidden md:flex space-x-8 text-gray-700 font-semibold">
            {["Home", "Menu", "About", "Contact"].map((item) => (
              <li 
                key={item}
                className="relative cursor-pointer group"
                onClick={() => setActiveSection(item.toLowerCase())}
              >
                <span className="hover:text-green-600 transition-colors duration-300">
                  {item}
                </span>
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-green-500 to-emerald-500 group-hover:w-full transition-all duration-300"></span>
              </li>
            ))}
          </ul>

          {/* CTA Button */}
          <button className="hidden md:block px-6 py-2.5 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold rounded-full hover:shadow-xl hover:scale-105 transition-all duration-300">
            Order Now
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-gray-700 focus:outline-none hover:text-green-600 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-7 w-7"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden overflow-hidden transition-all duration-500 ${
          isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}>
          <div className="bg-white/95 backdrop-blur-lg shadow-inner">
            <ul className="flex flex-col items-center py-6 space-y-4 text-gray-700 font-semibold">
              {["Home", "Menu", "About", "Contact"].map((item) => (
                <li 
                  key={item}
                  className="hover:text-green-600 transition-colors duration-300 cursor-pointer"
                  onClick={() => {
                    setActiveSection(item.toLowerCase());
                    setIsMenuOpen(false);
                  }}
                >
                  {item}
                </li>
              ))}
              <button className="mt-2 px-6 py-2.5 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold rounded-full hover:shadow-xl transition-all duration-300">
                Order Now
              </button>
            </ul>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 via-transparent to-emerald-500/10"></div>
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <div className="inline-block animate-bounce mb-6">
            <span className="px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
              🎉 Now Open in Malappuram
            </span>
          </div>
          <h2 className="text-5xl md:text-7xl font-black text-gray-900 mb-6 leading-tight">
            Authentic Kerala
            <span className="block bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              Delights
            </span>
          </h2>
          <p className="text-gray-600 text-xl md:text-2xl mb-10 max-w-2xl mx-auto leading-relaxed">
            Experience the rich flavors of traditional Kerala cuisine — from crispy appam to hearty kappa dishes
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-full hover:shadow-2xl hover:scale-105 transition-all duration-300 text-lg">
              Explore Menu
            </button>
            <button className="px-8 py-4 bg-white text-green-600 font-bold rounded-full border-2 border-green-500 hover:bg-green-50 hover:shadow-xl transition-all duration-300 text-lg">
              View Location
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 group"
              style={{
                animation: `fadeInUp 0.6s ease-out ${index * 0.2}s both`
              }}
            >
              <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Menu Section */}
      <section className="py-20 px-6 bg-gradient-to-b from-transparent to-green-50/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-green-600 font-semibold text-lg tracking-wider uppercase">
              Our Specialties
            </span>
            <h3 className="text-4xl md:text-5xl font-black text-gray-900 mt-2 mb-4">
              Signature Dishes
            </h3>
            <div className="w-24 h-1.5 bg-gradient-to-r from-green-500 to-emerald-500 mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {menuItems.map((item, index) => (
              <div
                key={index}
                className="group bg-white rounded-3xl shadow-lg overflow-hidden transition-all duration-500 transform hover:-translate-y-3 hover:shadow-2xl"
                style={{
                  animation: `fadeInScale 0.6s ease-out ${index * 0.15}s both`
                }}
              >
                <div className="relative overflow-hidden h-56 bg-gradient-to-br from-gray-100 to-gray-200">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:rotate-2"
                    onError={(e) => {
                      e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300'%3E%3Crect fill='%23f0f0f0' width='400' height='300'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='20' fill='%23999'%3E" + item.name + "%3C/text%3E%3C/svg%3E";
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full font-bold text-green-600 shadow-lg">
                    {item.price}
                  </div>
                </div>
                <div className="p-6">
                  <h4 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-green-600 transition-colors">
                    {item.name}
                  </h4>
                  <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                    {item.description}
                  </p>
                  <button className="w-full py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-105">
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto bg-gradient-to-r from-green-500 to-emerald-600 rounded-3xl p-12 text-center shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
          <div className="relative z-10">
            <h3 className="text-4xl md:text-5xl font-black text-white mb-4">
              Hungry? Order Now!
            </h3>
            <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
              Get your favorite Kerala dishes delivered hot and fresh to your doorstep in under 30 minutes
            </p>
            <button className="px-10 py-4 bg-white text-green-600 font-bold rounded-full hover:bg-gray-50 hover:shadow-2xl transition-all duration-300 text-lg hover:scale-105">
              Place Your Order
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          <div>
            <h4 className="text-2xl font-bold mb-4 bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
              Casava Bites
            </h4>
            <p className="text-gray-400">
              Bringing authentic Kerala flavors to Malappuram since 2025
            </p>
          </div>
          <div>
            <h5 className="font-bold mb-4 text-lg">Quick Links</h5>
            <ul className="space-y-2 text-gray-400">
              <li className="hover:text-green-400 transition-colors cursor-pointer">About Us</li>
              <li className="hover:text-green-400 transition-colors cursor-pointer">Menu</li>
              <li className="hover:text-green-400 transition-colors cursor-pointer">Catering</li>
              <li className="hover:text-green-400 transition-colors cursor-pointer">Contact</li>
            </ul>
          </div>
          <div>
            <h5 className="font-bold mb-4 text-lg">Connect With Us</h5>
            <p className="text-gray-400 mb-2">📞 +91 98765 43210</p>
            <p className="text-gray-400 mb-4">📍 Malappuram, Kerala</p>
            <div className="flex justify-center md:justify-start space-x-4">
              <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-green-500 transition-colors cursor-pointer">
                f
              </div>
              <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-green-500 transition-colors cursor-pointer">
                in
              </div>
              <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-green-500 transition-colors cursor-pointer">
                ig
              </div>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-gray-800 text-center text-gray-500">
          © 2025 Casava Bites | Kerala Cuisine • Made with ❤️ in Kerala
        </div>
      </footer>

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fadeInScale {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  );
};

export default App;