import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-white border-b border-gray-200 fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-3">
        <div className="flex justify-between items-center">
          <Link 
            to="/" 
            className="text-2xl font-serif font-bold text-[#292929] hover:text-[#292929]"
          >
            Unheard Voices
          </Link>
          
          <div className="flex items-center space-x-6">
            <Link 
              to="/explore" 
              className="text-[#292929] hover:text-gray-700"
            >
              Explore
            </Link>
            <Link 
              to="/write" 
              className="text-[#292929] hover:text-gray-700"
            >
              Write
            </Link>
            <Link 
              to="/about" 
              className="text-[#292929] hover:text-gray-700"
            >
              About
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
