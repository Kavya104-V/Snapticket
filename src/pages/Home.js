import React, { useState , useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { FaMoon, FaSun, FaUserCircle } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';

function Home() {
  const navigate = useNavigate();
  const { darkMode, setDarkMode } = useTheme(); // Using global theme
  const [profileOpen, setProfileOpen] = useState(false);
  const [title, setTitle] = useState("Skill Test-Homepage");
  useEffect(() => {
    document.title = title;
  }, [title]);
  const changeTitle = () => {
    const newTitle = "Skill Test-Register";
    setTitle(newTitle);
    document.title = newTitle; // Updating the webpage title
  };

  const handleClick = () => {
    changeTitle(); // Change title
    navigate('/register'); // Navigate to register page
  };
  return (
    <div className={`${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'} min-h-screen transition-all`}>
      
      {/* Navbar */}
      <nav className="flex justify-between items-center p-6 bg-gradient-to-r from-green-400 to-blue-500 shadow-lg">
        <h1 className="text-3xl font-bold cursor-pointer" onClick={() => navigate('/')}>SkillTest</h1>
        
        <div className="flex items-center space-x-4">
          {/* Theme Toggle Button */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="flex items-center gap-2 text-lg font-medium hover:text-yellow-400 transition"
          >
            {darkMode ? <FaSun /> : <FaMoon />} 
          </button>

          {/* Profile Icon */}
          <div className="relative">
            <button 
              onClick={() => setProfileOpen(!profileOpen)} 
              className="text-3xl hover:text-green-200 transition"
            >
              <FaUserCircle />
            </button>
            {profileOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg z-10">
                <button 
                  onClick={() => navigate('/profile')}
                  className="block w-full text-left px-4 py-2 text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  View Profile
                </button>
                <button 
                  onClick={() => navigate('/edit-profile')}
                  className="block w-full text-left px-4 py-2 text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  Edit Profile
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="flex flex-col items-center justify-center h-[calc(100vh-72px)] text-center px-4">
        <h2 className="text-5xl md:text-6xl font-extrabold leading-tight">
          <span className="text-green-400">IMAGINATION</span> IS MORE IMPORTANT THAN <br className="hidden md:block"/> KNOWLEDGE
        </h2>
        <p className="mt-6 text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-2xl">
          Together we achieve more than any single person could ever do alone.
        </p>
        <button 
          onClick={handleClick} 
          className="mt-10 px-8 py-4 bg-gradient-to-r from-green-400 to-blue-500 text-white font-semibold rounded-full hover:from-green-500 hover:to-blue-600 transition-transform transform hover:scale-105 shadow-lg"
        >
          Get Started
        </button>
      </header>
    </div>
  );
}

export default Home;
