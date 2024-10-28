import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Divider, Button } from '@nextui-org/react';
import { motion } from 'framer-motion';

const Navbar = () => {
  // State for mobile menu
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Toggle sidebar for small screens
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  // Navigation functions
  const handleDashboard = () => {
    navigate('/home');
  };

  const handleBillingTransaction = () => {
    navigate('*');
  };

  const handleHost = () => {
    navigate('/hosting');
  };
  const handleEvents = () => {
    navigate('/events');
  };
  const handleContact = () => {
    navigate('/contact');
  };

  // Helper function to check if the current path matches the button's path
  const isActive = (path) => {
    console.log(path, location.pathname);
    return location.pathname == path;
  };

  return (
    <div className="relative block z-30 lg:w-1/5">
      {/* Toggle button for mobile */}
      <div className="md:hidden bg-background h-full">
        <button
          onClick={toggleSidebar}
          className={`p-2 bg-primary text-white z-50 fixed top-2 transition-transform duration-300 ease-in-out transform ${
            isOpen ? 'translate-x-[calc(75vw)]' : 'translate-x-0'
          } md:hidden`}
        >
          {isOpen ? 'X' : '='}
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`bg-background h-screen fixed top-0 left-0 transform  ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300 ease-in-out w-3/4 md:w-1/5  md:translate-x-0`}
      >
        <div className="max-w-md p-4">
          <div className="space-y-1 ">
            <motion.h2
              whileHover={{ color: 'white' }}
              transition={{ duration: 0.5 }}
              className="text-large font-medium text-secondary"
            >
              Event{' '}
              <span className="text-text bg-secondary px-1 hover:text-secondary hover:bg-white duration-500">
                Hub
              </span>
            </motion.h2>
            <p className="text-small text-default-400">
              Attend. Collect. Unlock.
            </p>
          </div>
          <Divider className="my-4 bg-gray-500" />
          <div className="flex flex-col align-center my-2">
            <p className="text-xs pb-2 text-center w-full text-default-500 ">
              Menu
            </p>
            {/* Navigation buttons with active state */}
            <div className="flex flex-col gap-2">
              <Button
                className={`w-full  ${
                  isActive('/home')
                    ? 'bg-secondary text-white'
                    : 'text-primary bg-background'
                } hover:text-lg duration-500 hover:text-white`}
                variant={isActive('/home') ? 'solid' : 'light'}
                onClick={handleDashboard}
              >
                Dashboard
              </Button>
              <Button
                className={`w-full ${
                  isActive('/hosting')
                    ? 'bg-secondary text-white'
                    : 'text-primary bg-background'
                } hover:text-lg duration-500 hover:text-white`}
                variant={isActive('/hosting') ? 'solid' : 'light'}
                onClick={handleHost}
              >
                Host
              </Button>
              <Button
                className={`w-full ${
                  isActive('/events')
                    ? 'bg-secondary text-white'
                    : 'text-primary bg-background'
                } hover:text-lg duration-500 hover:text-white`}
                variant={isActive('/events') ? 'solid' : 'light'}
                onClick={handleEvents}
              >
                Events
              </Button>

              <Button
                className={`w-full ${
                  isActive('*')
                    ? 'bg-secondary text-white'
                    : 'text-primary bg-background'
                } hover:text-lg duration-500 hover:text-white`}
                variant={isActive('*') ? 'solid' : 'light'}
                onClick={handleBillingTransaction}
              >
                Billing / Transaction
              </Button>
            </div>
          </div>
          <Divider className="my-4 bg-gray-500" />
          {/* <p className="text-xs pb-2 text-center w-full text-default-500">Menu</p> */}
          {/* Navigation buttons with active state */}
          <div className="flex flex-col gap-2">
            <Button
              className={`w-full  ${
                isActive('*')
                  ? 'bg-secondary text-white'
                  : 'text-primary bg-background'
              } hover:text-lg duration-500 hover:text-white`}
              variant={isActive('*') ? 'solid' : 'light'}
              onClick={handleBillingTransaction}
            >
              <div>Support</div>
            </Button>
            <Button
              className={`w-full ${
                isActive('*')
                  ? 'bg-secondary text-white'
                  : 'text-primary bg-background'
              } hover:text-lg duration-500 hover:text-white`}
              variant={isActive('/contact') ? 'solid' : 'light'}
              onClick={handleContact}
            >
              Contact Us
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
