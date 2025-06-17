import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="fixed w-full top-0 z-50">
      <div className="h-[2px] w-full bg-[#2c2c2c]/5"></div>
      <div className="bg-[#fdfbf7]">
        <div className="max-w-7xl mx-auto px-6 py-3">
          <div className="flex justify-between items-center">
            <Link 
              to="/" 
              className="text-2xl font-serif text-[#2c2c2c] tracking-wide"
              style={{ fontFamily: 'EB Garamond' }}
            >
              Unheard Voices
            </Link>
            
            <div className="flex items-center divide-x divide-[#2c2c2c]/10">
              <Link 
                to="/explore" 
                className="px-6 text-[#2c2c2c]/80 text-[15px] font-medium tracking-wide"
                style={{ fontFamily: 'EB Garamond' }}
              >
                Explore
              </Link>
              <Link 
                to="/write" 
                className="px-6 text-[#2c2c2c]/80 text-[15px] font-medium tracking-wide"
                style={{ fontFamily: 'EB Garamond' }}
              >
                Write
              </Link>
              <Link 
                to="/about" 
                className="px-6 text-[#2c2c2c]/80 text-[15px] font-medium tracking-wide"
                style={{ fontFamily: 'EB Garamond' }}
              >
                About
              </Link>
              <Link 
                to="/admin-portal" 
                className="pl-6 text-[#2c2c2c]/50 text-[15px] font-medium tracking-wide hover:text-[#2c2c2c]/80 transition-colors"
                style={{ fontFamily: 'EB Garamond' }}
              >
                For Admins
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="h-[2px] w-full bg-[#2c2c2c]/5"></div>
    </nav>
  );
};

export default Navbar;
