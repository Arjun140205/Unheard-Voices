import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="fixed w-full top-0 z-50">
      <div className="h-[2px] w-full bg-[#2c2c2c]/5"></div>
      <div className="bg-[#fdfbf7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
          <div className="flex justify-between items-center">
            <Link 
              to="/" 
              className="text-2xl font-serif text-[#2c2c2c] tracking-wide"
              style={{ fontFamily: 'EB Garamond' }}
            >
              Unheard Voices
            </Link>
            <div className="flex-1 flex justify-end">
              <div className="flex flex-nowrap overflow-x-auto whitespace-nowrap gap-1 sm:gap-0 scrollbar-thin scrollbar-thumb-transparent scrollbar-track-transparent hide-scrollbar sm:overflow-x-visible sm:whitespace-normal sm:divide-x sm:divide-[#2c2c2c]/10">
                <Link 
                  to="/about" 
                  className="px-3 sm:px-6 py-1 text-[#2c2c2c]/80 text-sm sm:text-[15px] font-medium tracking-wide hover:text-[#2c2c2c] transition-colors"
                  style={{ fontFamily: 'EB Garamond' }}
                >
                  Our Story
                </Link>
              <Link 
                to="/explore" 
                  className="px-3 sm:px-6 py-1 text-[#2c2c2c]/80 text-sm sm:text-[15px] font-medium tracking-wide hover:text-[#2c2c2c] transition-colors"
                style={{ fontFamily: 'EB Garamond' }}
              >
                Explore
              </Link>
              <Link 
                to="/write" 
                  className="px-3 sm:px-6 py-1 text-[#2c2c2c]/80 text-sm sm:text-[15px] font-medium tracking-wide hover:text-[#2c2c2c] transition-colors"
                style={{ fontFamily: 'EB Garamond' }}
              >
                Write
              </Link>
              <Link 
                to="/admin-portal" 
                  className="pl-3 sm:pl-6 py-1 text-[#2c2c2c]/50 text-sm sm:text-[15px] font-medium tracking-wide hover:text-[#2c2c2c]/80 transition-colors"
                style={{ fontFamily: 'EB Garamond' }}
              >
                For Admins
              </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="h-[2px] w-full bg-[#2c2c2c]/5"></div>
      <style>{`
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </nav>
  );
};

export default Navbar;
