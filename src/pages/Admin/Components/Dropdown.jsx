import React, { useState , useRef , useEffect} from 'react';

const Dropdown = ({ children ,  options }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  const closeDropdown = () => {
    setIsOpen(false);
  };
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        closeDropdown();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef]);


  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        type="button"
        className="inline-flex justify-center w-full  text-sm font-medium  rounded-md focus:outline-none focus-visible:ring focus-visible:ring-gray-500 focus-visible:ring-opacity-75"
      >
        <i className="ti-more font-md "></i>
      </button>
      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div className="py-1">
            {children}
          </div>
        </div>
      )}
    </div>
  );
};

const DropdownItem = ({ children, href }) => {
    const handleItemClick = () => {
      console.log(`Selected option: ${children}`);
    };
  
    if (href) {
      return (
        <a
          href={href}
          onClick={handleItemClick}
          className="block px-4 py-1 text-sm text-gray-700 hover:bg-gray-100 text-center"
        >
          {children}
        </a>
      );
    } else {
      return (
        <button
          onClick={handleItemClick}
          className="block px-4 py-1 text-sm text-gray-700 hover:bg-gray-100 text-center"
        >
          {children}
        </button>
      );
    }
  };


export { Dropdown, DropdownItem };