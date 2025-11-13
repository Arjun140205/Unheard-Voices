import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="w-full bg-white/95 backdrop-blur-md border-t border-gray-200 shadow-lg z-10">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="text-xl font-serif font-bold text-gray-900">
              Unheard Voices
            </Link>
            <p className="mt-4 text-sm text-gray-600">
              A space for authentic stories and genuine connections.
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-span-1">
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Navigate</h3>
            <ul className="space-y-3">
              <li><Link to="/explore" className="text-sm text-gray-600 hover:text-gray-900">Explore</Link></li>
              <li><Link to="/write" className="text-sm text-gray-600 hover:text-gray-900">Write</Link></li>
              <li><Link to="/about" className="text-sm text-gray-600 hover:text-gray-900">About</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div className="col-span-1">
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Resources</h3>
            <ul className="space-y-3">
              <li><Link to="/help" className="text-sm text-gray-600 hover:text-gray-900">Help Center</Link></li>
              <li><Link to="/tips" className="text-sm text-gray-600 hover:text-gray-900">Writing Tips</Link></li>
              <li><Link to="/guidelines" className="text-sm text-gray-600 hover:text-gray-900">Community Guidelines</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div className="col-span-1">
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Legal</h3>
            <ul className="space-y-3">
              <li><Link to="/privacy" className="text-sm text-gray-600 hover:text-gray-900">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-sm text-gray-600 hover:text-gray-900">Terms of Service</Link></li>
              <li><Link to="/cookies" className="text-sm text-gray-600 hover:text-gray-900">Cookie Policy</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-600">
              © {year} Unheard Voices. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a
                href="https://www.instagram.com/un.heardvoices?igsh=MXN4Y2F3dHByMXBvMQ=="
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-gray-900"
              >
                <i className="fab fa-instagram"></i>
                <span className="sr-only">Instagram</span>
              </a>
              <a
                href="https://www.linkedin.com/in/arjunbir-singh/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-gray-900"
              >
                <i className="fab fa-linkedin"></i>
                <span className="sr-only">LinkedIn</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;