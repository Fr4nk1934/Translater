import { BrowserRouter as Router, Route, Routes, NavLink } from 'react-router-dom';
import { useState } from 'react';
import './App.css';
import TranslatorForm from './components/TranslatorForm';
import DictionaryManagement from './components/DictionaryManagement';

function App() {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <Router>
      <div className={`${darkMode ? 'dark' : ''} bg-background-light dark:bg-background-dark font-display text-[#333333] dark:text-gray-200`}>
        <div className="relative flex h-auto min-h-screen w-full flex-col group/design-root overflow-x-hidden">
          <div className="layout-container flex h-full grow flex-col">
            <div className="px-4 md:px-10 lg:px-20 xl:px-40 flex flex-1 justify-center py-5">
              <div className="layout-content-container flex flex-col w-full max-w-6xl flex-1">
                {/* TopNavBar */}
                <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-gray-200 dark:border-gray-700 px-4 md:px-10 py-3">
                  <div className="flex items-center gap-4 text-primary">
                    <div className="size-6">
                      <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                        <path d="M44 11.2727C44 14.0109 39.8386 16.3957 33.69 17.6364C39.8386 18.877 44 21.2618 44 24C44 26.7382 39.8386 29.123 33.69 30.3636C39.8386 31.6043 44 33.9891 44 36.7273C44 40.7439 35.0457 44 24 44C12.9543 44 4 40.7439 4 36.7273C4 33.9891 8.16144 31.6043 14.31 30.3636C8.16144 29.123 4 26.7382 4 24C4 21.2618 8.16144 18.877 14.31 17.6364C8.16144 16.3957 4 14.0109 4 11.2727C4 7.25611 12.9543 4 24 4C35.0457 4 44 7.25611 44 11.2727Z" fill="currentColor" />
                      </svg>
                    </div>
                    <h2 className="text-[#111618] dark:text-white text-lg font-bold leading-tight tracking-[-0.015em]">Translatr</h2>
                  </div>
                  <div className="hidden md:flex flex-1 justify-end items-center gap-8">
                    <div className="flex items-center gap-9">
                      <NavLink 
                        to="/" 
                        className={({ isActive }) => 
                          isActive 
                            ? "text-primary text-sm font-bold leading-normal border-b-2 border-primary pb-1" 
                            : "text-[#111618] dark:text-gray-300 text-sm font-medium leading-normal hover:text-primary dark:hover:text-primary"
                        }
                      >
                        Translator
                      </NavLink>
                      <NavLink 
                        to="/dictionary" 
                        className={({ isActive }) => 
                          isActive 
                            ? "text-primary text-sm font-bold leading-normal border-b-2 border-primary pb-1" 
                            : "text-[#111618] dark:text-gray-300 text-sm font-medium leading-normal hover:text-primary dark:hover:text-primary"
                        }
                      >
                        My Dictionary
                      </NavLink>
                    </div>
                    <div className="flex gap-2">
                      <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-primary text-white text-sm font-bold leading-normal tracking-[0.015em] hover:opacity-90">
                        <span className="truncate">Sign Up</span>
                      </button>
                      <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-gray-200 dark:bg-gray-700 text-[#111618] dark:text-white text-sm font-bold leading-normal tracking-[0.015em] hover:bg-gray-300 dark:hover:bg-gray-600">
                        <span className="truncate">Log In</span>
                      </button>
                      <button
                        onClick={toggleDarkMode}
                        className="flex items-center justify-center size-10 rounded-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        <span className="material-symbols-outlined">
                          {darkMode ? 'light_mode' : 'dark_mode'}
                        </span>
                      </button>
                    </div>
                  </div>
                  <button className="md:hidden p-2 text-[#111618] dark:text-white">
                    <span className="material-symbols-outlined">menu</span>
                  </button>
                </header>

                {/* Main Content */}
                <Routes>
                  <Route path="/" element={<TranslatorForm />} />
                  <Route path="/dictionary" element={<DictionaryManagement />} />
                </Routes>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App